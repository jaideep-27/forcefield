import { useState } from "react";
import { useNavigate } from "react-router";

const BLUE = "#238ad5";
const BLUE_HOVER = "#1a78c2";

export function Navigation() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const offsetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Benefits", id: "benefits" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Pricing", id: "pricing" },
    { label: "Reviews", id: "testimonials" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        padding: "3px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo — always black version on white navbar */}
          <button
            onClick={() => {
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}
          >
            <img
              src="/brand/logo/FF_Logo_Black.png"
              alt="ForceField"
              style={{ height: 72, width: "auto", objectFit: "contain", margin: "-8px 0", position: "relative" }}
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)",
                  color: "#374151",
                  transition: "color 0.2s", padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
            <button
              onClick={handleLogin}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)",
                color: "#374151", padding: "8px 16px", borderRadius: 10,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/activate")}
              style={{
                background: BLUE, border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 700, fontFamily: "var(--font-body)",
                color: "#ffffff", padding: "10px 22px", borderRadius: 12,
                boxShadow: "0 4px 14px rgba(35,138,213,0.35)",
                transition: "all 0.22s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = BLUE_HOVER;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(35,138,213,0.50)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = BLUE;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(35,138,213,0.35)";
              }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#374151", padding: 4, lineHeight: 0,
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 8, paddingTop: 12, paddingBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    padding: "10px 8px", fontSize: 14, fontWeight: 500,
                    fontFamily: "var(--font-body)", color: "#374151", borderRadius: 8,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = BLUE; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#374151"; }}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 8, paddingTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={handleLogin}
                  style={{ background: "#f1f6f0", border: "1px solid #e5e7eb", cursor: "pointer", padding: "10px 0", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-body)", color: "#374151", borderRadius: 10 }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/activate")}
                  style={{ background: BLUE, border: "none", cursor: "pointer", padding: "10px 0", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-body)", color: "#ffffff", borderRadius: 10 }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}