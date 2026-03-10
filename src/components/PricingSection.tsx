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
          style={{ textAlign: "center", marginBottom: 72 }}
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
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 28, alignItems: "stretch" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                background: plan.featured ? "linear-gradient(180deg, #10274c 0%, #0d1f3c 100%)" : "#ffffff",
                boxShadow: plan.featured
                  ? "0 32px 80px rgba(13,31,60,0.5), 0 0 0 1px rgba(255,255,255,0.15)"
                  : "0 12px 40px rgba(0,0,0,0.15)",
                transform: plan.featured ? "scale(1.03) translateY(-12px)" : "scale(1)",
                position: "relative",
              }}
            >
              {/* Most Popular badge */}
              {plan.featured && (
                <div style={{
                  background: "linear-gradient(90deg, #42a5f5, #238ad5)",
                  textAlign: "center",
                  padding: "8px 0",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "var(--font-body)",
                }}>
                  ★ Most Popular
                </div>
              )}

              {/* Card header */}
              <div style={{
                padding: plan.featured ? "36px 32px 24px" : "44px 32px 24px",
                borderBottom: plan.featured ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.04)",
              }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 24, color: plan.featured ? "#ffffff" : "#111827", marginBottom: 6 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.65)" : "#6b7280", fontFamily: "var(--font-body)", marginBottom: 24 }}>
                  {plan.description}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 48, color: plan.featured ? "#ffffff" : "#111827", lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: plan.featured ? "rgba(255,255,255,0.60)" : "#6b7280", fontSize: 15, fontWeight: 500, fontFamily: "var(--font-body)" }}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 16 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      {/* Check icon */}
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: plan.featured ? "rgba(35,138,213,0.15)" : "#e0ecf7",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 1,
                      }}>
                        <Check size={12} color={plan.featured ? "#42a5f5" : "#238ad5"} strokeWidth={3.5} />
                      </div>
                      <span style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.85)" : "#4b5563", fontFamily: "var(--font-body)", lineHeight: 1.6, fontWeight: 500 }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button pushes to bottom */}
                <div style={{ marginTop: "auto" }}>
                  <button
                    onClick={() => handlePlanClick(plan)}
                    style={{
                      width: "100%",
                      padding: "16px 0",
                      borderRadius: 14,
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      ...(plan.featured
                        ? { background: "linear-gradient(135deg, #238ad5, #1d73b2)", border: "none", color: "#ffffff", boxShadow: "0 8px 24px rgba(35,138,213,0.30)" }
                        : { background: "#f8fafc", border: "1.5px solid #e2e8f0", color: "#0f172a" }
                      ),
                    }}
                    onMouseEnter={(e) => {
                      if (plan.featured) {
                        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 28px rgba(35,138,213,0.40)";
                      } else {
                        (e.currentTarget as HTMLButtonElement).style.background = "#eef2f6";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#cbd5e1";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.featured) {
                        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(35,138,213,0.30)";
                      } else {
                        (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                      }
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
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