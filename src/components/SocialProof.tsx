import { motion } from "motion/react";

const stats = [
  { value: "500+", label: "Active Players" },
  { value: "4.9★", label: "Average Rating" },
  { value: "3+", label: "Seasons Running" },
  { value: "98%", label: "Parent Satisfaction" },
];

const testimonials = [
  {
    name: "Coach Sarah", role: "U14s Team Coach", initials: "CS",
    quote: "They've become stronger, more agile and with fewer injuries. The 20-minute format fits perfectly into our weekly training schedule and the players genuinely enjoy it.",
    rating: 5, gradient: "linear-gradient(135deg, #238ad5, #0d1f3c)",
  },
  {
    name: "James M.", role: "Parent of U12 Player", initials: "JM",
    quote: "My son loves every session. He's more confident on the field and I feel better knowing he's building proper technique to stay safe during contact play.",
    rating: 5, gradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
  },
  {
    name: "Tom Wilson", role: "U16 Player", initials: "TW",
    quote: "The exercises are actually fun and I can feel the difference in my game. My balance and core strength have improved massively since starting ForceField.",
    rating: 5, gradient: "linear-gradient(135deg, #238ad5, #42a5f5)",
  },
];

export function SocialProof() {
  return (
    <section
      id="testimonials"
      style={{ padding: "100px 24px 160px", background: "#238ad5", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 75%, rgba(255,255,255,0.08) 0%, transparent 45%), radial-gradient(circle at 85% 25%, rgba(255,255,255,0.05) 0%, transparent 45%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: 56 }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.90)", fontFamily: "var(--font-body)", marginBottom: 16 }}>
            Real Results
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 48px)", color: "#ffffff", lineHeight: 1.15, marginBottom: 16 }}>
            Trusted by Players,<br />Parents &amp; Coaches
          </h2>
          <p style={{ fontSize: 17, color: "rgba(241,246,240,0.65)", fontFamily: "var(--font-body)" }}>
            See what the ForceField community is saying
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 16, marginBottom: 64, maxWidth: 800, margin: "0 auto 64px" }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.10)" }}>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 26, color: "#ffffff", marginBottom: 4, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.06em" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{ background: "#ffffff", borderRadius: 16, padding: "32px", boxShadow: "0 12px 48px rgba(0,0,0,0.30)", display: "flex", flexDirection: "column", gap: 20, position: "relative", overflow: "hidden", borderTop: "3px solid #238ad5" }}
            >
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: 80, lineHeight: 1, color: "#238ad5", opacity: 0.07, fontFamily: "Georgia, serif", fontWeight: 700, userSelect: "none" }}>"</div>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth={1}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#1f2933", lineHeight: 1.75, flex: 1 }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f3f4f6", paddingTop: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-body)", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: "#1f2933", fontFamily: "var(--font-body)" }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "var(--font-body)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave: blue → white */}
      <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 5 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 90 }}>
          <path d="M0,45 C320,90 560,0 720,45 C880,90 1120,0 1440,45 L1440,90 L0,90 Z" fill="#f1f6f0" />
        </svg>
      </div>
    </section>
  );
}