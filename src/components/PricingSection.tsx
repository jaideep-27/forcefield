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
    features: [
      "Access for entire team",
      "Coach dashboard & overview",
      "Team progress tracking",
      "Custom training plans",
    ],
    cta: "View Team Options",
    featured: false,
    headerGradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
    checkGradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
    route: null,
  },
  {
    name: "Player Pass",
    description: "For individual players aged 8–18",
    price: "£29",
    period: "/ season",
    features: [
      "Full access to training video library",
      "Personalised progress tracking",
      "Works on any device",
      "3× 20-minute sessions per week",
      "Age-appropriate exercises",
    ],
    cta: "Get My Player Pass",
    featured: true,
    headerGradient: "linear-gradient(135deg, #0d1f3c, #238ad5)",
    checkGradient: "linear-gradient(135deg, #238ad5, #42a5f5)",
    route: "/activate",
  },
  {
    name: "Club Pass",
    description: "For clubs & large groups",
    price: "£800",
    period: "",
    features: [
      "Multi-team access",
      "Club-wide analytics",
      "Priority support line",
      "Custom integrations",
    ],
    cta: "View Club Options",
    featured: false,
    headerGradient: "linear-gradient(135deg, #d64d21, #f06838)",
    checkGradient: "linear-gradient(135deg, #d64d21, #f06838)",
    route: null,
  },
];

export function PricingSection() {
  const navigate = useNavigate();

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.route) {
      navigate(plan.route);
    } else {
      toast.info("Get in touch!", {
        description: `Contact us at hello@forcefield.com to enquire about the ${plan.name}.`,
      });
    }
  };

  return (
    <section
      id="pricing"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #0d1f3c 0%, #051028 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background deco */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(35,138,213,0.07), transparent 50%), radial-gradient(circle at 80% 50%, rgba(212,77,34,0.05), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: 64 }}
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
              color: "#d64d21",
              fontFamily: "var(--font-body)",
              marginBottom: 16,
            }}
          >
            Pricing
          </span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "#ffffff",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Simple, Clear Pricing
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              color: "rgba(180,210,240,0.6)",
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            No hidden costs, no complicated tiers. Choose what works for you.
          </p>
        </motion.div>

        {/* Cards grid – Player Pass in centre/featured */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "end",
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: plan.featured
                  ? "0 24px 72px rgba(35,138,213,0.4)"
                  : "0 8px 32px rgba(0,0,0,0.25)",
                transform: plan.featured ? "scale(1.06)" : "scale(1)",
                background: plan.featured ? "#ffffff" : "rgba(255,255,255,0.06)",
                border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.08)",
                position: "relative",
              }}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div
                  style={{
                    background: "linear-gradient(90deg, #d64d21, #f06838)",
                    textAlign: "center",
                    padding: "8px 0",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ⚡ Most Popular
                </div>
              )}

              {/* Card header */}
              <div style={{ background: plan.headerGradient, padding: "28px 28px 24px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#ffffff",
                    marginBottom: 4,
                  }}
                >
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", marginBottom: 16 }}>
                  {plan.description}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: 44,
                      color: "#ffffff",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginBottom: 4, fontFamily: "var(--font-body)" }}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div
                style={{
                  padding: "24px 28px 28px",
                  background: plan.featured ? "#ffffff" : "transparent",
                }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: plan.checkGradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <Check size={11} color="#fff" strokeWidth={3} />
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          color: plan.featured ? "#374151" : "rgba(180,210,240,0.7)",
                          fontFamily: "var(--font-body)",
                          lineHeight: 1.5,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan)}
                  style={{
                    width: "100%",
                    padding: "13px 0",
                    borderRadius: 14,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    ...(plan.featured
                      ? {
                        background: "linear-gradient(135deg, #d64d21, #f06838)",
                        border: "none",
                        color: "#ffffff",
                        boxShadow: "0 6px 20px rgba(214,77,33,0.45)",
                      }
                      : {
                        background: "transparent",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.85)",
                      }),
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 13,
            color: "rgba(180,210,240,0.3)",
            fontFamily: "var(--font-body)",
          }}
        >
          Secure checkout · Instant access · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}