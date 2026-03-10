import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { motion } from "motion/react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter your username and password");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Welcome back!", { description: "Redirecting to your training…" });
    setTimeout(() => navigate("/game"), 1200);
    setIsSubmitting(false);
  };

  return (
    <div className="resp-panel-stack" style={{ minHeight: "100vh", display: "flex", fontFamily: "var(--font-body)" }}>

      {/* ── Left panel — brand ── */}
      <div className="resp-panel" style={{
        width: "45%", minWidth: 340, background: "#238ad5",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "48px 52px", position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 380, height: 380, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

        {/* Top spacer where logo was */}
        <div />

        {/* Middle tagline */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: 16 }}>
            Train Smarter.<br />
            <span style={{ fontStyle: "italic", opacity: 0.85 }}>Play Safer.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 320 }}>
            Access your personalised ForceField training dashboard — evidence-based sessions built for players aged 8–18.
          </p>

          {/* trust pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
            {["🎓 University of Bath", "🏉 RFU Backed", "✅ WCAG AA"].map((label) => (
              <span key={label} style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 999, padding: "5px 14px" }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom attribution */}
        <p style={{ position: "relative", zIndex: 2, fontSize: 12, color: "rgba(255,255,255,0.42)" }}>
          © {new Date().getFullYear()} ForceField Rugby Training
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="resp-panel" style={{
        flex: 1, background: "#f1f6f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px 40px",
      }}>
        <motion.div
          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", textDecoration: "none", marginBottom: 36, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#238ad5")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to home
          </Link>

          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 30, fontWeight: 800, color: "#1f2933", marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 36 }}>Log in to access your training programme.</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Username */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 7 }}>Username</label>
              <input
                type="text" placeholder="your_username" value={username}
                onChange={(e) => setUsername(e.target.value)} disabled={isSubmitting}
                style={{ width: "100%", height: 48, padding: "0 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#ffffff", fontSize: 14, color: "#1f2933", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#238ad5"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(35,138,213,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
                <a href="#" style={{ fontSize: 12, color: "#238ad5", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting}
                  style={{ width: "100%", height: 48, padding: "0 44px 0 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", background: "#ffffff", fontSize: 14, color: "#1f2933", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#238ad5"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(35,138,213,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex", alignItems: "center" }}>
                  {showPassword
                    ? <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    : <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  }
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#6b7280" }}>
              <input type="checkbox" style={{ accentColor: "#238ad5", width: 15, height: 15 }} />
              Keep me logged in
            </label>

            {/* Submit */}
            <button
              type="submit" disabled={isSubmitting}
              style={{ height: 50, borderRadius: 12, background: isSubmitting ? "#93c5e8" : "#238ad5", border: "none", color: "#ffffff", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-body)", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 6px 20px rgba(35,138,213,0.35)", transition: "all 0.25s", marginTop: 4 }}
              onMouseEnter={(e) => { if (!isSubmitting) { (e.currentTarget as HTMLButtonElement).style.background = "#1a78c2"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#238ad5"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {isSubmitting ? "Logging in…" : "Log In"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 28 }}>
            Don't have an account?{" "}
            <Link to="/activate" style={{ color: "#238ad5", fontWeight: 600, textDecoration: "none" }}>Get your Player Pass →</Link>
          </p>

          {/* Test mode notice */}
          <div style={{ marginTop: 24, padding: "10px 14px", background: "rgba(35,138,213,0.08)", border: "1px solid rgba(35,138,213,0.20)", borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 14 }}>🧪</span>
            <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.5, margin: 0 }}>
              <strong>Test mode:</strong> any username & password will work for now.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}