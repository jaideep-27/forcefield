import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { motion } from "motion/react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
  padding: "0 14px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  background: "#ffffff",
  fontSize: 14,
  color: "#1f2933",
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 6,
  fontFamily: "var(--font-body)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#e53e3e", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function ActivatePassPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    playerFirst: "", playerLast: "", dob: "", position: "",
    parentFirst: "", parentLast: "", email: "", phone: "",
    username: "", password: "", confirmPassword: "",
    passCode: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#238ad5";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(35,138,213,0.12)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please accept the Terms & Conditions to continue"); return; }
    if (form.password !== form.confirmPassword) { toast.error("Passwords don't match"); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Pass activated!", { description: "Welcome to ForceField! Redirecting…" });
    setTimeout(() => navigate("/"), 1500);
    setIsSubmitting(false);
  };

  const inputProps = {
    onFocus: handleFocus,
    onBlur: handleBlur,
    disabled: isSubmitting,
    style: inputStyle,
  };

  const sectionHeader = (n: number, title: string, subtitle: string) => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #f3f4f6" }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#238ad5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-body)" }}>
        {n}
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 17, fontWeight: 700, color: "#1f2933", marginBottom: 2 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "var(--font-body)" }}>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#238ad5", paddingTop: 100, paddingBottom: 80, position: "relative", overflow: "hidden", fontFamily: "var(--font-body)" }}>
      {/* Background texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -140, right: -140, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

        {/* Top back link */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.75)", textDecoration: "none", marginBottom: 32, transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to home
        </Link>

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, color: "#ffffff", marginBottom: 10 }}>
            Activate Your Player Pass
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: 440, margin: "0 auto" }}>
            Set up your account once — then train anywhere, any time.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ background: "#ffffff", borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.30)", overflow: "hidden" }}
        >
          <form onSubmit={handleSubmit}>

            {/* ── Section 1: Player details ── */}
            <div style={{ padding: "36px 40px", borderBottom: "1px solid #f3f4f6" }}>
              {sectionHeader(1, "Player Details", "Information about the young player")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="First name" required>
                  <input placeholder="e.g. Jamie" value={form.playerFirst} onChange={set("playerFirst")} {...inputProps} />
                </Field>
                <Field label="Last name" required>
                  <input placeholder="e.g. Carter" value={form.playerLast} onChange={set("playerLast")} {...inputProps} />
                </Field>
                <Field label="Date of birth" required>
                  <input type="date" value={form.dob} onChange={set("dob")} {...inputProps} />
                </Field>
                <Field label="Position">
                  <select value={form.position} onChange={set("position")} onFocus={handleFocus} onBlur={handleBlur} disabled={isSubmitting}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select position…</option>
                    {["Prop", "Hooker", "Lock", "Flanker", "Number 8", "Scrum-half", "Fly-half", "Centre", "Winger", "Fullback"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* ── Section 2: Parent / Guardian ── */}
            <div style={{ padding: "36px 40px", borderBottom: "1px solid #f3f4f6" }}>
              {sectionHeader(2, "Parent / Guardian", "Required for players under 18")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="First name" required>
                  <input placeholder="e.g. Sarah" value={form.parentFirst} onChange={set("parentFirst")} {...inputProps} />
                </Field>
                <Field label="Last name" required>
                  <input placeholder="e.g. Carter" value={form.parentLast} onChange={set("parentLast")} {...inputProps} />
                </Field>
                <Field label="Email address" required>
                  <input type="email" placeholder="sarah@example.com" value={form.email} onChange={set("email")} {...inputProps} />
                </Field>
                <Field label="Phone number">
                  <input type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={set("phone")} {...inputProps} />
                </Field>
              </div>
            </div>

            {/* ── Section 3: Pass Code ── */}
            <div style={{ padding: "36px 40px", borderBottom: "1px solid #f3f4f6" }}>
              {sectionHeader(3, "Pass Code", "Enter the unique code from your purchase confirmation")}
              <div style={{ maxWidth: 340 }}>
                <Field label="Pass code" required>
                  <input placeholder="e.g. FF-2025-XXXX" value={form.passCode} onChange={set("passCode")} {...inputProps}
                    style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.08em", fontSize: 15 }} />
                </Field>
              </div>
            </div>

            {/* ── Section 4: Create Account ── */}
            <div style={{ padding: "36px 40px", borderBottom: "1px solid #f3f4f6" }}>
              {sectionHeader(4, "Create Your Login", "You'll use these to access your training")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Username" required>
                  <input placeholder="choose_a_username" value={form.username} onChange={set("username")} {...inputProps} />
                </Field>
                <div /> {/* spacer */}
                <Field label="Password" required>
                  <input type="password" placeholder="Min. 8 characters" value={form.password} onChange={set("password")} {...inputProps} />
                </Field>
                <Field label="Confirm password" required>
                  <input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={set("confirmPassword")} {...inputProps} />
                </Field>
              </div>
            </div>

            {/* ── Footer: agree + submit ── */}
            <div style={{ padding: "30px 40px", background: "#f9fafb" }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 24 }}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: 2, accentColor: "#238ad5", width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6 }}>
                  I agree to the{" "}
                  <a href="#" style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}>Terms & Conditions</a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a>.{" "}
                  I confirm that I am the parent or legal guardian of the player named above.
                </span>
              </label>

              <button
                type="submit" disabled={isSubmitting}
                style={{ width: "100%", height: 52, borderRadius: 14, background: isSubmitting ? "#93c5e8" : "#238ad5", border: "none", color: "#ffffff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-body)", cursor: isSubmitting ? "not-allowed" : "pointer", boxShadow: "0 8px 24px rgba(35,138,213,0.35)", transition: "all 0.25s" }}
                onMouseEnter={(e) => { if (!isSubmitting) { (e.currentTarget as HTMLButtonElement).style.background = "#1a78c2"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#238ad5"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
              >
                {isSubmitting ? "Activating your pass…" : "Activate My Player Pass →"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
                Already activated?{" "}
                <Link to="/login" style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}>Log in here</Link>
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}