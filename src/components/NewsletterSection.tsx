import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Success! Check your email", { description: "We've sent you the free concussion guide." });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section style={{ padding: "90px 24px 160px", background: "#f1f6f0", position: "relative", overflow: "hidden" }}>
      {/* Light decorative blobs */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(35,138,213,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(35,138,213,0.05), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

          {/* Icon box */}
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#238ad5", boxShadow: "0 8px 24px rgba(35,138,213,0.30)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          {/* Eyebrow */}
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#238ad5", fontFamily: "var(--font-body)", marginBottom: 14 }}>
            Free Resource
          </span>

          {/* Heading */}
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 40px)", color: "#1f2933", marginBottom: 14, lineHeight: 1.15 }}>
            Download Our Free{" "}
            <span style={{ color: "#238ad5" }}>Concussion Guide</span>
          </h2>

          {/* Body */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4b5563", marginBottom: 36, lineHeight: 1.7, maxWidth: 460, margin: "0 auto 36px" }}>
            Essential concussion avoidance tips and safety practices for young rugby players — compiled by our sports science team.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row" style={{ gap: 10, maxWidth: 460, margin: "0 auto 14px" }}>
            <input
              type="email" required placeholder="Enter your email address" value={email}
              onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting}
              style={{ flex: 1, minWidth: 200, height: 50, paddingLeft: 16, paddingRight: 16, borderRadius: 12, background: "#ffffff", border: "1.5px solid #e5e7eb", color: "#1f2933", fontSize: 14, fontFamily: "var(--font-body)", outline: "none", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#238ad5")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            />
            <button
              type="submit" disabled={isSubmitting}
              style={{ height: 50, padding: "0 28px", borderRadius: 12, background: "#238ad5", border: "none", color: "#ffffff", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-body)", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1, boxShadow: "0 6px 20px rgba(35,138,213,0.35)", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.25s, transform 0.2s" }}
              onMouseEnter={(e) => { if (!isSubmitting) { (e.currentTarget as HTMLButtonElement).style.background = "#1a78c2"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#238ad5"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {isSubmitting ? "Sending…" : "Get Free Guide"}
            </button>
          </form>

          {/* Privacy */}
          <p style={{ fontSize: 12, color: "#9ca3af", fontFamily: "var(--font-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            We respect your privacy. Unsubscribe at any time.
          </p>

        </motion.div>
      </div>

      {/* Wave: white → blue */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 5 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 90 }}>
          <path d="M0,45 C320,90 560,0 720,45 C880,90 1120,0 1440,45 L1440,90 L0,90 Z" fill="#238ad5" />
        </svg>
      </div>
    </section>
  );
}