import { Check } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const plans = [
  {
    name: "Team Pass",
    description: "For coaches & teams",
    price: "£100",
    period: "",
    features: ["Access for entire team", "Coach dashboard & overview", "Team progress tracking", "Custom training plans"],
    cta: "View Team Options",
    featured: false,
    route: null,
    accentColor: "#238ad5",
  },
  {
    name: "Player Pass",
    description: "For individual players aged 8–18",
    price: "£29",
    period: "/ season",
    features: ["Full access to training video library", "Personalised progress tracking", "Works on any device", "3× 20-minute sessions per week", "Age-appropriate exercises"],
    cta: "Get My Player Pass",
    featured: true,
    route: "/activate",
    accentColor: "#238ad5",
  },
  {
    name: "Club Pass",
    description: "For clubs & large groups",
    price: "£800",
    period: "",
    features: ["Multi-team access", "Club-wide analytics", "Priority support line", "Custom integrations"],
    cta: "View Club Options",
    featured: false,
    route: null,
    accentColor: "#238ad5",
  },
];

export function PricingSection() {
  const navigate = useNavigate();

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.route) { navigate(plan.route); }
    else { toast.info("Get in touch!", { description: `Contact us at hello@forcefield.com to enquire about the ${plan.name}.` }); }
  };

  return (
    <section id="pricing" style={{ padding: "100px 24px 160px", background: "#238ad5", position: "relative", overflow: "hidden" }}>
      {/* Subtle dot-grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Section header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: 64 }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", marginBottom: 14 }}>
            Pricing
          </span>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#ffffff", marginBottom: 16, lineHeight: 1.1 }}>
            Simple, Clear Pricing
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.80)", maxWidth: 420, margin: "0 auto" }}>
            No hidden costs, no complicated tiers. Choose what works for you.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "#ffffff",
                boxShadow: plan.featured
                  ? "0 32px 80px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(255,255,255,0.30)"
                  : "0 12px 40px rgba(0,0,0,0.18)",
                transform: plan.featured ? "scale(1.05)" : "scale(1)",
                position: "relative",
              }}
            >
              {/* Most Popular badge */}
              {plan.featured && (
                <div style={{
                  background: "#0d1f3c",
                  textAlign: "center",
                  padding: "9px 0",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                }}>
                  ⚡ Most Popular
                </div>
              )}

              {/* Card header */}
              <div style={{
                background: plan.featured ? "#0d1f3c" : "#238ad5",
                padding: "28px 28px 24px",
              }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 20, color: "#ffffff", marginBottom: 4 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", marginBottom: 18 }}>
                  {plan.description}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 46, color: "#ffffff", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 6, fontFamily: "var(--font-body)" }}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "24px 28px 28px", background: "#ffffff" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      {/* Check icon */}
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: plan.featured ? "#238ad5" : "#238ad5",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 1,
                      }}>
                        <Check size={11} color="#fff" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 14, color: "#374151", fontFamily: "var(--font-body)", lineHeight: 1.55 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <button
                  onClick={() => handlePlanClick(plan)}
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    ...(plan.featured
                      ? { background: "#238ad5", border: "none", color: "#ffffff", boxShadow: "0 6px 20px rgba(35,138,213,0.40)" }
                      : { background: "#f1f6f0", border: "1.5px solid #e5e7eb", color: "#238ad5" }
                    ),
                  }}
                  onMouseEnter={(e) => {
                    if (plan.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#1a78c2";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.background = "#e3f2fd";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#238ad5";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.featured) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#238ad5";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.background = "#f1f6f0";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#e5e7eb";
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 48, fontSize: 13, color: "rgba(255,255,255,0.62)", fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
        >
          🔒 Secure checkout · Instant access · Cancel anytime
        </motion.p>
      </div>

      {/* Wave: blue → blue (Footer is also blue, no wave needed) */}
    </section>
  );
}