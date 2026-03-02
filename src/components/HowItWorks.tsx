import { motion } from "motion/react";

const steps = [
  {
    num: "1",
    title: "Sign Up / Log In",
    description:
      "Create your player account in minutes. All you need is a name, age group, and email. Your personalised programme unlocks instantly.",
    gradient: "linear-gradient(135deg, #238ad5, #0d1f3c)",
    shadow: "0 8px 24px rgba(35,138,213,0.5)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Access Your Training Library",
    description:
      "Get age-appropriate video sessions curated by sports scientists and rugby coaches, tailored specifically to your stage of development.",
    gradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
    shadow: "0 8px 24px rgba(13,31,60,0.45)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Train 20 min, 3×/week",
    description:
      "Follow along with guided sessions designed to fit around school and club commitments. No gym required — just space to move.",
    gradient: "linear-gradient(135deg, #d64d21, #f06838)",
    shadow: "0 8px 24px rgba(214,77,33,0.5)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 12h11M6.5 17.5h11" />
        <circle cx="3.5" cy="6.5" r="1" fill="#fff" />
        <circle cx="3.5" cy="12" r="1" fill="#fff" />
        <circle cx="3.5" cy="17.5" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Track & Improve",
    description:
      "Monitor your progress across flexibility, strength, and agility. Watch your risk scores drop and your performance scores climb.",
    gradient: "linear-gradient(135deg, #2e8540, #39c317)",
    shadow: "0 8px 24px rgba(57,195,23,0.4)",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 24px",
        background: "#f1f6f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: 72 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#238ad5",
              fontFamily: "var(--font-body)",
              marginBottom: 16,
            }}
          >
            Simple Process
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "#1f2933",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            How Player Training Works
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              color: "#4b5563",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Four simple steps to a stronger, safer you.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 24 }}>
            <div style={{ height: 3, width: 40, background: "#238ad5", borderRadius: 4 }} />
            <div style={{ height: 3, width: 16, background: "#39c317", borderRadius: 4 }} />
            <div style={{ height: 3, width: 8, background: "#d64d21", borderRadius: 4 }} />
          </div>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.13 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            >
              {/* Number circle */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: step.gradient,
                  boxShadow: step.shadow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  marginBottom: 24,
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {step.num}
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "28px 24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  width: "100%",
                }}
              >
                {/* Icon in card */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: step.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  {step.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#1f2933",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "#4b5563",
                    lineHeight: 1.75,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}