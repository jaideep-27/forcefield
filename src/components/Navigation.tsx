import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Brand colours
const BLUE = "#238ad5";
const RED = "#d64d21";

export function Navigation() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 60
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const linkColor = isScrolled ? "#1f2933" : "rgba(255,255,255,0.88)";
  const linkHover = isScrolled ? BLUE : "#ffffff";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        overflow: "visible",
        transition: "all 0.4s ease",
        background: isScrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isScrolled ? "0 2px 24px rgba(0,0,0,0.1)" : "none",
        padding: "3px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* ─── Logo ─────────────────────────────── */}
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
            {/* Show white logo on dark bg, black logo when scrolled */}
            <img
              key={isScrolled ? "black" : "white"}
              src={isScrolled ? "/brand/logo/FF_Logo_Black.png" : "/brand/logo/FF_Logo_White.png"}
              alt="ForceField"
              style={{ height: 76, width: "auto", objectFit: "contain", margin: "-8px 0", position: "relative", transition: "opacity 0.3s ease" }}
            />
          </button>

          {/* ─── Desktop Nav Links ────────────────── */}
          <div
            className="hidden md:flex"
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  color: linkColor,
                  transition: "color 0.25s",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ─── Desktop CTAs ─────────────────────── */}
          <div
            className="hidden md:flex"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <button
              onClick={handleLogin}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                color: linkColor,
                padding: "8px 16px",
                borderRadius: 10,
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/activate")}
              style={{
                background: RED,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                color: "#ffffff",
                padding: "10px 22px",
                borderRadius: 12,
                boxShadow: `0 4px 16px ${RED}55`,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.filter = "none";
                (e.currentTarget as HTMLButtonElement).style.background = RED;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Get Started
            </button>
          </div>

          {/* ─── Mobile Hamburger ─────────────────── */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isScrolled ? "#1f2933" : "#ffffff",
              padding: 4,
              lineHeight: 0,
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

        {/* ─── Mobile Menu ──────────────────────── */}
        {isMobileMenuOpen && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.12)",
              marginTop: 12,
              paddingTop: 12,
              paddingBottom: 8,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "10px 8px",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    color: isScrolled ? "#374151" : "rgba(255,255,255,0.9)",
                    borderRadius: 8,
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  marginTop: 8,
                  paddingTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <button
                  onClick={handleLogin}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    padding: "10px 0",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    color: isScrolled ? "#374151" : "#ffffff",
                    borderRadius: 10,
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/activate")}
                  style={{
                    background: RED,
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 0",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    color: "#ffffff",
                    borderRadius: 10,
                  }}
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