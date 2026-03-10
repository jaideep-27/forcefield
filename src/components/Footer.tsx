export function Footer() {
  const currentYear = new Date().getFullYear();

  const cols = [
    { heading: "Quick Links", links: [{ label: "About Us", href: "#" }, { label: "How It Works", href: "#how-it-works" }, { label: "Pricing", href: "#pricing" }, { label: "Testimonials", href: "#testimonials" }] },
    { heading: "Support", links: [{ label: "Help Centre", href: "#" }, { label: "Contact Us", href: "#" }, { label: "FAQ", href: "#" }, { label: "Safeguarding", href: "#" }] },
    { heading: "Legal", links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Cookie Policy", href: "#" }, { label: "GDPR", href: "#" }] },
  ];

  return (
    <footer style={{ background: "#238ad5", position: "relative", overflow: "hidden" }}>
      {/* Blue top border */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #f1f6f0 0%, #e3f2fd 33%, #42a5f5 66%, rgba(255,255,255,0.3) 100%)" }} />

      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img src="/brand/logo/FF_Logo_White.png" alt="ForceField" style={{ height: 76, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, maxWidth: 240, marginBottom: 24 }}>
              Evidence-based rugby training for young players aged 8–18, backed by University of Bath research &amp; RFU data.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["X", "FB", "IG"].map((s) => (
                <a
                  key={s} href="#"
                  style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(241,246,240,0.50)", textDecoration: "none", transition: "all 0.3s", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(35,138,213,0.22)"; el.style.borderColor = "rgba(35,138,213,0.45)"; el.style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "rgba(241,246,240,0.50)"; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h4 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.70)", marginBottom: 18 }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.25s", display: "block" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.52)" }}>
            © {currentYear} ForceField Rugby Training. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffffff", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.52)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}