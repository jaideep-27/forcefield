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
    toast.success("Success! Check your email", {
      description: "We've sent you the free concussion guide.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #0d1f3c 0%, #0d2545 55%, #1a5fa0 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 10% 50%, rgba(57,195,23,0.08), transparent 45%), radial-gradient(ellipse at 90% 50%, rgba(214,77,33,0.07), transparent 45%)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(135deg, #d64d21, #f06838)",
              boxShadow: "0 8px 24px rgba(214,77,33,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#39c317",
              fontFamily: "var(--font-body)",
              marginBottom: 12,
            }}
          >
            Free Resource
          </span>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.5vw, 38px)",
              color: "#ffffff",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            Download Our Free{" "}
            <span style={{ color: "#f06838" }}>Concussion Guide</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(180,210,240,0.65)",
              marginBottom: 32,
              lineHeight: 1.65,
              maxWidth: 480,
              margin: "0 auto 32px",
            }}
          >
            Essential concussion avoidance tips and safety practices for young rugby players —
            compiled by our sports science team.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto 16px", flexWrap: "wrap" }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              style={{
                flex: 1,
                minWidth: 200,
                height: 48,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 12,
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: 48,
                padding: "0 24px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #d64d21, #f06838)",
                border: "none",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: "0 6px 20px rgba(214,77,33,0.45)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {isSubmitting ? "Sending…" : "Get Free Guide"}
            </button>
          </form>

          <p
            style={{
              fontSize: 12,
              color: "rgba(180,210,240,0.35)",
              fontFamily: "var(--font-body)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}