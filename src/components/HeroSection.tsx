import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function HeroSection() {
  const navigate = useNavigate();

  const handleGetPlayerPass = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const offset = 80;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleLogin = () => navigate("/login");

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#238ad5",
      }}
    >
      {/* Background blobs */}
      <div style={{ position: "absolute", top: "-200px", right: "-200px", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: 400, height: 400, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.12)", pointerEvents: "none" }} />
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
      {/* Diagonal stripe */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(60deg, transparent 65%, rgba(35,138,213,0.05) 100%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 24px 80px", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ gap: 60, alignItems: "center" }} className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left content */}
          <div>
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.30)", background: "rgba(255,255,255,0.15)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#39c317", animation: "pulse 2s infinite", flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(241,246,240,0.9)", fontFamily: "var(--font-body)" }}>
                  Evidence-Based Rugby Training
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(42px, 5.5vw, 68px)", lineHeight: 1.05, color: "#ffffff", marginBottom: 24 }}
            >
              Train Smarter.
              <br />
              <span style={{ color: "#ffffff", fontStyle: "italic" }}>Play Safer.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: "var(--font-body)", fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.88)", marginBottom: 36, maxWidth: 480 }}
            >
              Unlock your personalised ForceField training — 20-minute sessions
              designed to reduce injury risk and build strength for players aged 8–18.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}
            >
              <button
                onClick={handleGetPlayerPass}
                style={{ background: "#f1f6f0", border: "none", padding: "14px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700, color: "#238ad5", cursor: "pointer", fontFamily: "var(--font-body)", boxShadow: "0 8px 28px rgba(0,0,0,0.25)", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#e0ecf7";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#f1f6f0";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.25)";
                }}
              >
                Get My Player Pass
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={handleLogin}
                style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.22)", padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)";
                }}
              >
                Login — Existing Player
              </button>
            </motion.div>

            {/* Trust badge */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.65 }}
              style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.72)", display: "flex", alignItems: "center", gap: 8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Backed by research from University of Bath &amp; RFU data
            </motion.p>
          </div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} style={{ position: "relative" }}
          >
            <div style={{ position: "absolute", inset: "-20px", borderRadius: 28, background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.20) 0%, transparent 70%)", filter: "blur(24px)", zIndex: 0 }} />
            <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", zIndex: 1, boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613330591335-a3298c40008b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydWdieSUyMHBsYXllciUyMGZpZWxkJTIwYWN0aW9ufGVufDF8fHx8MTc3MTMyMDc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Rugby player in action on field"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "4/3", display: "block" } as React.CSSProperties}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 45%)" }} />
            </div>

            {/* Badge: Active players */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              style={{ position: "absolute", bottom: -20, left: -20, background: "#ffffff", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 12, zIndex: 10 }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #238ad5, #0d1f3c)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 20, color: "#1f2933", fontFamily: "var(--font-heading)", lineHeight: 1 }}>500+</p>
                <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "var(--font-body)", marginTop: 2 }}>Active Players</p>
              </div>
            </motion.div>

            {/* Badge: Rating */}
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
              style={{ position: "absolute", top: -18, right: -18, background: "#ffffff", borderRadius: 16, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 8, zIndex: 10 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#238ad5" stroke="#238ad5" strokeWidth={1}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#1f2933", fontFamily: "var(--font-heading)" }}>4.9</span>
              <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "var(--font-body)" }}>rating</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)", gap: 24 }}
        >
          {[
            { value: "500+", label: "Young Players" },
            { value: "3×", label: "Weekly Sessions" },
            { value: "20min", label: "Per Session" },
            { value: "8–18", label: "Age Range" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08 }} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: "#ffffff", marginBottom: 6, lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(180,210,240,0.55)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 5 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 80 }}>
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#f1f6f0" />
        </svg>
      </div>
    </section>
  );
}