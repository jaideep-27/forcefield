import { motion } from "motion/react";

const benefits = [
  {
    title: "Improved Flexibility",
    description: "Build the dynamic range of motion needed to absorb contact safely. Targeted stretching routines reduce how hard collisions impact your joints and muscles.",
    gradient: "linear-gradient(135deg, #238ad5, #42a5f5)",
    shadow: "0 8px 24px rgba(35,138,213,0.35)",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Stronger Neck & Core",
    description: "A powerful neck and stable core are the best defences against concussion and spine injury. Our progressive exercises develop these critical muscle groups systematically.",
    gradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
    shadow: "0 8px 24px rgba(13,31,60,0.3)",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Better Balance & Agility",
    description: "Proprioception training helps players land safely, change direction confidently, and avoid the awkward falls that cause the most common youth rugby injuries.",
    gradient: "linear-gradient(135deg, #238ad5, #1a78c2)",
    shadow: "0 8px 24px rgba(35,138,213,0.30)",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Injury Prevention Science",
    description: "Every exercise is underpinned by research from the University of Bath and aligned with RFU safety guidelines, giving parents and coaches total confidence.",
    gradient: "linear-gradient(135deg, #2e8540, #42a5f5)",
    shadow: "0 8px 24px rgba(46,133,64,0.28)",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function ValuePropositions() {
  return (
    <section id="benefits" style={{ padding: "100px 24px", background: "#f1f6f0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(227,242,253,0.8) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: 64 }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#238ad5", fontFamily: "var(--font-body)", marginBottom: 16 }}>
            Why ForceField?
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(32px, 4vw, 48px)", color: "#1f2933", marginBottom: 20, lineHeight: 1.1 }}>
            Built for Young Performers
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "#4b5563", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Our training programme is designed by sports scientists to help young rugby players grow stronger, move safer, and stay on the field longer.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 24 }}>
            <div style={{ height: 3, width: 40, background: "#238ad5", borderRadius: 4 }} />
            <div style={{ height: 3, width: 16, background: "#1a78c2", borderRadius: 4 }} />
            <div style={{ height: 3, width: 8, background: "#42a5f5", borderRadius: 4 }} />
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -8, transition: { duration: 0.22 } }}
              style={{ background: "#ffffff", borderRadius: 16, padding: "36px 28px", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", cursor: "default", transition: "box-shadow 0.3s ease", position: "relative", overflow: "hidden", borderTop: "3px solid #238ad5" }}
              onHoverStart={(e) => { const el = (e as unknown as MouseEvent).currentTarget as HTMLElement; if (el) el.style.boxShadow = "0 16px 48px rgba(35,138,213,0.12)"; }}
              onHoverEnd={(e) => { const el = (e as unknown as MouseEvent).currentTarget as HTMLElement; if (el) el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ width: 60, height: 60, borderRadius: 16, background: b.gradient, boxShadow: b.shadow, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {b.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 19, color: "#1f2933", marginBottom: 12, lineHeight: 1.2 }}>{b.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4b5563", lineHeight: 1.75 }}>{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}