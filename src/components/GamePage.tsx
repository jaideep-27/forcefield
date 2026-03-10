import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { POSES, SKELETON_CONNECTIONS, extractAngles, computePoseAccuracy, type PoseDefinition } from "./game/poses";

// ─── Types ───────────────────────────────────────────────────────────────────
type GameState = "intro" | "loading" | "permission" | "countdown" | "playing" | "result";
type FeedbackLevel = "green" | "amber" | "red" | "idle";

declare global { interface Window { Pose: any; } }

// ─── Brand palette ────────────────────────────────────────────────────────────
const BLUE = "#238ad5";
const NAVY = "#0d1f3c";
const WHITE = "#f1f6f0";

const FB_COLOR: Record<FeedbackLevel, string> = {
    green: "#00e676", amber: "#ffab00", red: "#ff4444", idle: "#238ad5",
};
const FB_GLOW: Record<FeedbackLevel, string> = {
    green: "rgba(0,230,118,0.30)", amber: "rgba(255,171,0,0.25)", red: "rgba(255,68,68,0.25)", idle: "rgba(35,138,213,0.20)",
};

const SESSION_POSES_COUNT = 8;

// ─── Canvas: Ghost skeleton ───────────────────────────────────────────────────
function drawGhostSkeleton(ctx: CanvasRenderingContext2D, pose: PoseDefinition, cw: number, ch: number) {
    const pts: Record<string, [number, number]> = {};
    for (const [k, [nx, ny]] of Object.entries(pose.skeleton)) {
        pts[k] = [nx * cw, ny * ch];
    }
    ctx.save();
    ctx.globalAlpha = 0.20;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    const conns: [string, string][] = [
        ["leftShoulder", "rightShoulder"], ["leftShoulder", "leftHip"], ["rightShoulder", "rightHip"],
        ["leftHip", "rightHip"], ["leftShoulder", "leftElbow"], ["leftElbow", "leftWrist"],
        ["rightShoulder", "rightElbow"], ["rightElbow", "rightWrist"],
        ["leftHip", "leftKnee"], ["leftKnee", "leftAnkle"],
        ["rightHip", "rightKnee"], ["rightKnee", "rightAnkle"],
        ["nose", "leftShoulder"], ["nose", "rightShoulder"],
    ];
    for (const [a, b] of conns) {
        if (!pts[a] || !pts[b]) continue;
        ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke();
    }
    ctx.fillStyle = "#ffffff";
    for (const [nx, ny] of Object.values(pose.skeleton) as [number, number][]) {
        ctx.beginPath(); ctx.arc(nx * cw, ny * ch, 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

// ─── Canvas: Live skeleton ────────────────────────────────────────────────────
function drawLiveSkeleton(ctx: CanvasRenderingContext2D, lm: any[], fb: FeedbackLevel, cw: number, ch: number) {
    if (!lm || lm.length < 33) return;
    const color = FB_COLOR[fb];
    ctx.save();
    ctx.shadowColor = color; ctx.shadowBlur = 14;
    ctx.strokeStyle = color; ctx.lineWidth = 3.5; ctx.lineCap = "round";
    for (const [a, b] of SKELETON_CONNECTIONS) {
        const la = lm[a], lb = lm[b];
        if (!la || !lb || (la.visibility ?? 1) < 0.3 || (lb.visibility ?? 1) < 0.3) continue;
        ctx.beginPath();
        ctx.moveTo((1 - la.x) * cw, la.y * ch);
        ctx.lineTo((1 - lb.x) * cw, lb.y * ch);
        ctx.stroke();
    }
    ctx.shadowBlur = 8; ctx.fillStyle = color;
    for (const i of [0, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]) {
        const p = lm[i];
        if (!p || (p.visibility ?? 1) < 0.3) continue;
        ctx.beginPath(); ctx.arc((1 - p.x) * cw, p.y * ch, i === 0 ? 8 : 5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
}

// ─── Canvas: ForceField aura ──────────────────────────────────────────────────
function drawAura(ctx: CanvasRenderingContext2D, lm: any[], acc: number, fb: FeedbackLevel, tick: number, cw: number, ch: number) {
    const lh = lm[23], rh = lm[24];
    if (!lh || !rh) return;
    const cx = (1 - (lh.x + rh.x) / 2) * cw;
    const cy = ((lh.y + rh.y) / 2) * ch;
    const r = 85 + acc * 55 + Math.sin(tick * 0.08) * 10;
    const color = FB_COLOR[fb];
    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.5);
    grad.addColorStop(0, FB_GLOW[fb]);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5 + Math.sin(tick * 0.10) * 0.2;
    ctx.shadowColor = color; ctx.shadowBlur = 18;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
}

// ─── Canvas: Background ───────────────────────────────────────────────────────
function drawBackground(ctx: CanvasRenderingContext2D, cw: number, ch: number, tick: number) {
    ctx.fillStyle = "#0d1f3c";
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "rgba(35,138,213,0.06)";
    const sp = 32, off = (tick * 0.3) % sp;
    for (let x = off % sp; x < cw; x += sp)
        for (let y = off % sp; y < ch; y += sp) {
            ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill();
        }
    const vig = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.3, cw / 2, ch / 2, ch * 0.85);
    vig.addColorStop(0, "transparent"); vig.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, cw, ch);
}

// ─── Shared layout wrapper for non-game screens ───────────────────────────────
function Screen({ children, bg = BLUE }: { children: React.ReactNode; bg?: string }) {
    return (
        <div style={{ minHeight: "100vh", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "var(--font-body)", position: "relative", overflow: "hidden" }}>
            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
            {/* Decorative blobs */}
            <div style={{ position: "absolute", top: -120, right: -120, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2, width: "100%" }}>{children}</div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GamePage() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const poseRef = useRef<any>(null);
    const rafRef = useRef<number>(0);
    const tickRef = useRef(0);
    const landmarksRef = useRef<any[]>([]);
    const sendingRef = useRef(false);
    const streamRef = useRef<MediaStream | null>(null);

    const [gameState, setGameState] = useState<GameState>("intro");
    const [countdown, setCountdown] = useState(3);
    const [poseIndex, setPoseIndex] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [feedback, setFeedback] = useState<FeedbackLevel>("idle");
    const [score, setScore] = useState(0);
    const [holdProgress, setHoldProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [sessionPoses, setSessionPoses] = useState<PoseDefinition[]>([]);
    const [finalScore, setFinalScore] = useState(0);

    // Refs for RAF callbacks
    const gsRef = useRef<GameState>("intro");
    const piRef = useRef(0);
    const scRef = useRef(0);
    const spRef = useRef<PoseDefinition[]>([]);
    const izRef = useRef(0); // in-zone seconds
    const ltRef = useRef(0); // last frame time

    const updateState = useCallback((s: GameState) => { gsRef.current = s; setGameState(s); }, []);

    const buildSession = useCallback((diff: 1 | 2 | null) => {
        let pool = [...POSES];
        if (diff === 1) pool = POSES.filter(p => p.difficulty === 1);
        if (diff === 2) pool = POSES.filter(p => p.difficulty <= 2);
        const picks = pool.sort(() => Math.random() - 0.5).slice(0, SESSION_POSES_COUNT);
        spRef.current = picks; setSessionPoses(picks); return picks;
    }, []);

    const loadMediaPipe = useCallback((): Promise<void> => new Promise((res, rej) => {
        if (window.Pose) { res(); return; }
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js";
        s.crossOrigin = "anonymous";
        s.onload = () => res();
        s.onerror = () => rej(new Error("Failed to load AI model — check your connection"));
        document.head.appendChild(s);
    }), []);

    const setupCamera = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: "user" }, audio: false });
        streamRef.current = stream;
    }, []);

    const advancePose = useCallback(() => {
        const next = piRef.current + 1;
        if (next >= spRef.current.length) { setFinalScore(Math.round(scRef.current)); updateState("result"); return; }
        piRef.current = next; setPoseIndex(next);
        izRef.current = 0; setHoldProgress(0); setFeedback("idle");
        updateState("countdown");
        let c = 3; setCountdown(c);
        const iv = setInterval(() => { c--; if (c <= 0) { clearInterval(iv); updateState("playing"); } else setCountdown(c); }, 1000);
    }, [updateState]);

    const gameLoop = useCallback(() => {
        rafRef.current = requestAnimationFrame(gameLoop);
        tickRef.current++;
        const canvas = canvasRef.current, video = videoRef.current;
        if (!canvas || !video) return;
        const ctx = canvas.getContext("2d")!;
        const cw = canvas.width, ch = canvas.height;
        const lm = landmarksRef.current;

        drawBackground(ctx, cw, ch, tickRef.current);

        if (gsRef.current === "playing" || gsRef.current === "countdown") {
            const pose = spRef.current[piRef.current];
            if (pose) drawGhostSkeleton(ctx, pose, cw, ch);
        }

        if (lm.length > 0) {
            const pose = spRef.current[piRef.current];
            let fb: FeedbackLevel = "idle", acc = 0;
            if (pose && gsRef.current === "playing") {
                acc = computePoseAccuracy(extractAngles(lm), pose);
                setAccuracy(acc);
                fb = acc >= 0.78 ? "green" : acc >= 0.50 ? "amber" : "red";
                setFeedback(fb);
                const now = performance.now();
                const dt = ltRef.current ? (now - ltRef.current) / 1000 : 0;
                ltRef.current = now;
                if (fb === "green") {
                    izRef.current += dt;
                    scRef.current += dt * 10 * (1 + acc * 0.5);
                    setScore(Math.round(scRef.current));
                }
                const prog = Math.min(1, izRef.current / pose.holdTime);
                setHoldProgress(prog);
                if (izRef.current >= pose.holdTime) advancePose();
            } else { ltRef.current = 0; }
            drawAura(ctx, lm, acc, fb, tickRef.current, cw, ch);
            drawLiveSkeleton(ctx, lm, fb, cw, ch);
        }

        // Send frame to MediaPipe — only when previous result has returned
        if (video.readyState >= 2 && poseRef.current && !sendingRef.current && tickRef.current % 3 === 0) {
            sendingRef.current = true;
            poseRef.current.send({ image: video }).finally(() => { sendingRef.current = false; });
        }
    }, [advancePose]);

    const startGame = useCallback(async (diff: 1 | 2 | null) => {
        setError(null); updateState("loading"); buildSession(diff);
        try {
            await loadMediaPipe();
            const pose = new window.Pose({ locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${f}` });
            pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, enableSegmentation: false, smoothSegmentation: false, minDetectionConfidence: 0.55, minTrackingConfidence: 0.55 });
            pose.onResults((r: any) => {
                sendingRef.current = false;
                if (r.poseLandmarks) landmarksRef.current = r.poseLandmarks;
            });
            poseRef.current = pose;
            // Initialize the model before camera starts
            await pose.initialize();
            updateState("permission");
            await setupCamera();
            piRef.current = 0; setPoseIndex(0);
            scRef.current = 0; setScore(0);
            izRef.current = 0; setHoldProgress(0); setFeedback("idle");
            updateState("countdown");
            let c = 3; setCountdown(c);
            const iv = setInterval(() => { c--; if (c <= 0) { clearInterval(iv); updateState("playing"); } else setCountdown(c); }, 1000);
            gameLoop();
        } catch (e: any) { setError(e?.message ?? "Something went wrong"); updateState("intro"); }
    }, [buildSession, gameLoop, loadMediaPipe, setupCamera, updateState]);

    useEffect(() => () => {
        cancelAnimationFrame(rafRef.current);
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    }, []);

    const currentPose = sessionPoses[poseIndex];
    const fbColor = FB_COLOR[feedback];
    const diffStar = { 1: "★", 2: "★★", 3: "★★★" };
    const diffLabel = { 1: "#00e676", 2: "#ffab00", 3: "#ff4444" };

    // ─── INTRO ─────────────────────────────────────────────────────────────────
    if (gameState === "intro") return (
        <Screen bg={BLUE}>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
                <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                    <div style={{ width: 76, height: 76, borderRadius: 22, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 34, backdropFilter: "blur(8px)" }}>⚡</div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: "#ffffff", marginBottom: 10 }}>ForceField Game</h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 36px" }}>
                        Match and hold abstract body shapes on camera. Your AI tracks your joints in real-time — stay inside the ForceField to score!
                    </p>
                    {error && <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 12, padding: "12px 16px", marginBottom: 24, color: "#ffe0e0", fontSize: 14 }}>⚠️ {error}</div>}

                    {/* How it works */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 36 }}>
                        {[
                            { icon: "📷", label: "Camera tracks you", sub: "No video shown — just your skeleton" },
                            { icon: "🎯", label: "Match the shape", sub: "Ghost skeleton = target to reach" },
                            { icon: "⏱️", label: "Hold to score", sub: "Timer only runs when you're green" },
                        ].map(({ icon, label, sub }) => (
                            <div key={label} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 16, padding: "18px 12px", backdropFilter: "blur(6px)" }}>
                                <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", marginBottom: 4 }}>{label}</p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.60)" }}>{sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Difficulty */}
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.60)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Choose difficulty</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                        {([
                            { diff: 1 as const, label: "Beginner", sub: "Easy shapes", color: "#00e676" },
                            { diff: 2 as const, label: "Athlete", sub: "Easy + medium", color: "#ffab00" },
                            { diff: null, label: "All Out", sub: "All 25 shapes", color: "#ff4444" },
                        ]).map(({ diff, label, sub, color }) => (
                            <button key={label} onClick={() => startGame(diff)}
                                style={{ background: "rgba(255,255,255,0.08)", border: `1.5px solid rgba(255,255,255,0.22)`, borderRadius: 16, padding: "20px 12px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.50)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)"; }}
                            >
                                <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: "0.10em", marginBottom: 6 }}>● {label}</div>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{sub}</div>
                            </button>
                        ))}
                    </div>

                    <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.50)", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                        ← Back to home
                    </button>
                </motion.div>
            </div>
        </Screen>
    );

    // ─── LOADING / PERMISSION ──────────────────────────────────────────────────
    if (gameState === "loading" || gameState === "permission") return (
        <Screen bg={BLUE}>
            <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.25)", borderTopColor: "#ffffff", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, fontFamily: "var(--font-body)" }}>
                    {gameState === "loading" ? "Loading AI pose detector…" : "Allow camera access when prompted"}
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 8, fontFamily: "var(--font-body)" }}>Using MediaPipe Pose — one-time ~8MB download</p>
                <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
            </div>
        </Screen>
    );

    // ─── RESULT ────────────────────────────────────────────────────────────────
    if (gameState === "result") {
        const max = sessionPoses.reduce((a, p) => a + p.holdTime * 10 * 1.5, 0);
        const pct = Math.min(100, Math.round((finalScore / max) * 100));
        return (
            <Screen bg={WHITE}>
                <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "🎯" : "💪"}</div>
                    <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 36, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Session Complete!</h1>
                    <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 36 }}>{sessionPoses.length} poses · {pct >= 80 ? "Outstanding!" : pct >= 50 ? "Great effort!" : "Keep training!"}</p>

                    <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 20, padding: "32px", marginBottom: 28, boxShadow: "0 8px 32px rgba(35,138,213,0.12)" }}>
                        <p style={{ fontSize: 12, color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Final Score</p>
                        <p style={{ fontSize: 68, fontWeight: 800, fontFamily: "var(--font-heading)", color: BLUE, lineHeight: 1 }}>{finalScore}</p>
                        <p style={{ fontSize: 14, color: "#9ca3af", marginTop: 8 }}>Performance: {pct}%</p>
                        <div style={{ height: 8, borderRadius: 99, background: "#f3f4f6", marginTop: 20 }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }}
                                style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${BLUE}, #00e676)` }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                        <button onClick={() => { setGameState("intro"); setScore(0); setPoseIndex(0); landmarksRef.current = []; }}
                            style={{ padding: "13px 28px", borderRadius: 12, background: BLUE, border: "none", color: "#ffffff", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", boxShadow: "0 6px 20px rgba(35,138,213,0.30)" }}>
                            Play Again
                        </button>
                        <button onClick={() => navigate("/")}
                            style={{ padding: "13px 28px", borderRadius: 12, background: WHITE, border: "1.5px solid #e5e7eb", color: NAVY, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer" }}>
                            Back Home
                        </button>
                    </div>
                </motion.div>
            </Screen>
        );
    }

    // ─── GAME SCREEN ──────────────────────────────────────────────────────────
    return (
        <div className="resp-panel-stack" style={{ minHeight: "100vh", background: NAVY, display: "flex", fontFamily: "var(--font-body)", overflow: "hidden" }}>

            {/* Canvas area */}
            <div className="resp-panel" style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <canvas ref={canvasRef} width={640} height={480}
                    style={{ borderRadius: 20, boxShadow: `0 0 60px rgba(35,138,213,0.25), 0 0 0 1px rgba(255,255,255,0.07)`, maxWidth: "100%", maxHeight: "calc(100vh - 80px)" }} />

                {/* Camera PiP — bottom left */}
                <video ref={(el) => {
                    videoRef.current = el;
                    if (el && streamRef.current && el.srcObject !== streamRef.current) {
                        el.srcObject = streamRef.current;
                        el.play().catch(e => console.error("Video play error:", e));
                    }
                }}
                    style={{ position: "absolute", bottom: 48, left: 36, width: 160, height: 120, borderRadius: 12, objectFit: "cover", transform: "scaleX(-1)", border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.50)", background: "#0d1f3c" }}
                    playsInline muted autoPlay />

                {/* Countdown overlay */}
                <AnimatePresence>
                    {gameState === "countdown" && (
                        <motion.div key={countdown} initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                            style={{ position: "absolute", fontSize: 120, fontWeight: 900, fontFamily: "var(--font-heading)", color: "#ffffff", textShadow: `0 0 60px ${BLUE}`, pointerEvents: "none" }}>
                            {countdown}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Legend */}
                <div style={{ position: "absolute", bottom: 32, left: 36, display: "flex", gap: 16, alignItems: "center" }}>
                    {[["#00e676", "In Zone"], ["#ffab00", "Close"], ["#ff4444", "Off Target"]].map(([c, l]) => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>{l}</span>
                        </div>
                    ))}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>Ghost = target pose</span>
                </div>
            </div>

            {/* Right sidebar — WHITE panel */}
            <div className="resp-panel" style={{ width: 288, background: "#ffffff", borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }}>

                {/* Header strip */}
                <div style={{ background: BLUE, padding: "20px 20px 16px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.70)", marginBottom: 2 }}>Score</p>
                    <p style={{ fontSize: 42, fontWeight: 800, fontFamily: "var(--font-heading)", color: "#ffffff", lineHeight: 1 }}>{score}</p>
                </div>

                {/* Current pose card */}
                {currentPose && (
                    <div style={{ padding: "20px", borderBottom: "1px solid #f3f4f6", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 26 }}>{currentPose.emoji}</span>
                            <div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: diffLabel[currentPose.difficulty] }}>{diffStar[currentPose.difficulty]}</span>
                                <p style={{ fontSize: 16, fontWeight: 700, color: NAVY, lineHeight: 1.2 }}>{currentPose.name}</p>
                            </div>
                        </div>
                        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 18 }}>{currentPose.cue}</p>

                        {/* Accuracy */}
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 6 }}>Accuracy</p>
                        <div style={{ height: 8, borderRadius: 99, background: "#f3f4f6", marginBottom: 6, overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 99, background: fbColor, width: `${accuracy * 100}%`, transition: "width 0.15s" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                            <p style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-heading)", color: fbColor }}>{Math.round(accuracy * 100)}%</p>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${fbColor}18`, border: `1px solid ${fbColor}40`, borderRadius: 99, padding: "4px 10px" }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: fbColor }} />
                                <span style={{ fontSize: 11, fontWeight: 700, color: fbColor }}>
                                    {feedback === "green" ? "In The Zone!" : feedback === "amber" ? "Getting Close…" : feedback === "red" ? "Adjust" : "Waiting…"}
                                </span>
                            </div>
                        </div>

                        {/* Hold progress */}
                        <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 6 }}>Hold Progress</p>
                        <div style={{ height: 10, borderRadius: 99, background: "#f3f4f6", overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${BLUE}, ${fbColor})`, width: `${holdProgress * 100}%`, transition: "width 0.3s" }} />
                        </div>
                    </div>
                )}

                {/* Pose progress strip */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 10 }}>
                        Pose {poseIndex + 1} of {sessionPoses.length}
                    </p>
                    <div style={{ display: "flex", gap: 4 }}>
                        {sessionPoses.map((p, i) => (
                            <div key={p.id} style={{ flex: 1, height: 5, borderRadius: 99, background: i < poseIndex ? BLUE : i === poseIndex ? fbColor : "#e5e7eb" }} />
                        ))}
                    </div>
                </div>

                {/* Exit */}
                <div style={{ padding: "16px 20px" }}>
                    <button onClick={() => { cancelAnimationFrame(rafRef.current); updateState("intro"); }}
                        style={{ width: "100%", padding: "11px", borderRadius: 10, background: WHITE, border: "1.5px solid #e5e7eb", color: "#9ca3af", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db"; (e.currentTarget as HTMLButtonElement).style.color = NAVY; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; }}
                    >
                        ✕ Exit Session
                    </button>
                </div>
            </div>
        </div>
    );
}
