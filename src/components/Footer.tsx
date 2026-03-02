export function Footer() {
  const currentYear = new Date().getFullYear();

  const cols = [
    {
      heading: "Quick Links",
      links: [
        { label: "About Us", href: "#" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "Help Centre", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Safeguarding", href: "#" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "GDPR", href: "#" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(160deg, #0d1f3c 0%, #0a1628 100%)", /* Brand Dark */
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Multi-colour top border */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #d64d21 0%, #39c317 33%, #238ad5 66%, #0d1f3c 100%)",
        }}
      />

      {/* Decoative blob */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(35,138,213,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 32px", position: "relative", zIndex: 2 }}>
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img
                src="/brand/logo/FF_Logo_White.png"
                alt="ForceField"
                style={{ height: 76, width: "auto", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "rgba(180,210,240,0.45)",
                lineHeight: 1.75,
                maxWidth: 240,
                marginBottom: 24,
              }}
            >
              Evidence-based rugby training for young players aged 8–18, backed by University of Bath research &amp; RFU data.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 10 }}>
              {["X", "FB", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(180,210,240,0.4)",
                    textDecoration: "none",
                    transition: "all 0.3s",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(35,138,213,0.25)";
                    el.style.borderColor = "rgba(35,138,213,0.4)";
                    el.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "rgba(180,210,240,0.4)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 18,
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "rgba(180,210,240,0.45)",
                        textDecoration: "none",
                        transition: "color 0.25s",
                        display: "block",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,210,240,0.45)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(180,210,240,0.25)" }}>
            © {currentYear} ForceField Rugby Training. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#39c317",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(180,210,240,0.25)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}