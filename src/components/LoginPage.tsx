import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Login successful!", { description: "Welcome back to ForceField!" });
    setTimeout(() => navigate("/"), 1500);
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1f3c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 50%, rgba(35,138,213,0.12) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(57,195,23,0.07) 0%, transparent 45%)", /* Brand Blue and Brand Green */
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
        {/* Back link */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(180,210,240,0.6)",
            textDecoration: "none",
            fontSize: 14,
            fontFamily: "var(--font-body)",
            marginBottom: 28,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,210,240,0.6)")}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </Link>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            borderRadius: 28,
            boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          {/* Card header gradient strip */}
          <div
            style={{
              background: "#238ad5",
              padding: "32px 36px 28px",
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <div style={{ marginBottom: 16 }}>
              <img
                src="/brand/logo/FF_Logo_White.png"
                alt="ForceField"
                style={{ height: 76, width: "auto", objectFit: "contain" }}
              />
            </div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: 26,
                color: "#ffffff",
                marginBottom: 6,
              }}
            >
              Welcome Back
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              Log in to access your training
            </p>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} style={{ padding: "32px 36px 36px" }}>
            {/* Username */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  fontFamily: "var(--font-body)",
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  height: 48,
                  padding: "0 14px",
                  borderRadius: 12,
                  border: "1.5px solid #e5e7eb",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  color: "#1f2933",
                  background: "#f9fafb",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#238ad5")}
                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 8,
                  fontFamily: "var(--font-body)",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    height: 48,
                    padding: "0 44px 0 14px",
                    borderRadius: 12,
                    border: "1.5px solid #e5e7eb",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    color: "#1f2933",
                    background: "#f9fafb",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#238ad5")}
                  onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#e5e7eb")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me / forgot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#6b7280",
                  fontFamily: "var(--font-body)",
                }}
              >
                <input type="checkbox" style={{ accentColor: "#238ad5" }} />
                Remember me
              </label>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: "#238ad5",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 14,
                background: isSubmitting ? "#9ca3af" : "#d64d21",
                border: "none",
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: isSubmitting ? "none" : "0 6px 20px rgba(214,77,33,0.4)",
                transition: "all 0.3s ease",
                marginBottom: 20,
              }}
            >
              {isSubmitting ? "Logging in…" : "Log In"}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#6b7280",
                fontFamily: "var(--font-body)",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/activate"
                style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}
              >
                Get your Player Pass
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}