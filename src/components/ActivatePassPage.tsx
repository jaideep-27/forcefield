import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type FormData = {
  playerFirstName: string;
  playerLastName: string;
  dateOfBirth: string;
  teamName: string;
  passCode: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 46,
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
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  marginBottom: 7,
  fontFamily: "var(--font-body)",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>
        {label}{" "}
        {required && <span style={{ color: "#d64d21" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeader({ number, title }: { number: number; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1.5px solid #f3f4f6",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#238ad5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "var(--font-heading)",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          fontSize: 16,
          color: "#1f2933",
        }}
      >
        {title}
      </h3>
    </div>
  );
}

export function ActivatePassPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    playerFirstName: "",
    playerLastName: "",
    dateOfBirth: "",
    teamName: "",
    passCode: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#238ad5";
    e.currentTarget.style.background = "#ffffff";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.background = "#f9fafb";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof FormData)[] = [
      "playerFirstName",
      "playerLastName",
      "dateOfBirth",
      "passCode",
      "parentEmail",
    ];
    if (required.some((f) => !formData[f])) {
      toast.error("Please fill in all required fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.parentEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Player Pass Activated!", {
      description: `${formData.playerFirstName}'s training access is now active.`,
    });
    setIsSubmitting(false);
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1f3c",
        padding: "40px 24px 80px",
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
            "radial-gradient(circle at 10% 40%, rgba(35,138,213,0.1), transparent 50%), radial-gradient(circle at 90% 60%, rgba(214,77,33,0.07), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 2 }}>
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
            background: "#ffffff",
            borderRadius: 28,
            boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#238ad5",
              padding: "36px 40px 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 20,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
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
                fontSize: 28,
                color: "#ffffff",
                marginBottom: 8,
              }}
            >
              Activate Your Player Pass
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              Fill in the details below to start your ForceField training journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "36px 40px 40px" }}>
            {/* Section 1 – Player Info */}
            <div style={{ marginBottom: 36 }}>
              <SectionHeader number={1} title="Player Information" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <Field label="First Name" required>
                  <input
                    name="playerFirstName"
                    type="text"
                    placeholder="Player's first name"
                    value={formData.playerFirstName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    name="playerLastName"
                    type="text"
                    placeholder="Player's last name"
                    value={formData.playerLastName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Date of Birth" required>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Team / Club Name">
                  <input
                    name="teamName"
                    type="text"
                    placeholder="Optional"
                    value={formData.teamName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
              </div>
            </div>

            {/* Section 2 – Pass Code */}
            <div style={{ marginBottom: 36 }}>
              <SectionHeader number={2} title="Pass Code" />
              <Field label="Player Pass Code" required>
                <input
                  name="passCode"
                  type="text"
                  placeholder="Enter your pass code"
                  value={formData.passCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  style={{
                    ...inputStyle,
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                />
              </Field>
              <p
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginTop: 8,
                  fontFamily: "var(--font-body)",
                }}
              >
                You received this code via email after purchase
              </p>
            </div>

            {/* Section 3 – Parent/Guardian */}
            <div style={{ marginBottom: 36 }}>
              <SectionHeader number={3} title="Parent / Guardian Information" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <Field label="First Name">
                  <input
                    name="parentFirstName"
                    type="text"
                    placeholder="Parent's first name"
                    value={formData.parentFirstName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Last Name">
                  <input
                    name="parentLastName"
                    type="text"
                    placeholder="Parent's last name"
                    value={formData.parentLastName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Email Address" required>
                  <input
                    name="parentEmail"
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    name="parentPhone"
                    type="tel"
                    placeholder="Optional"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    style={inputStyle}
                  />
                </Field>
              </div>
            </div>

            {/* Terms */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 28,
                border: "1px solid #e5e7eb",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  required
                  style={{ marginTop: 2, accentColor: "#238ad5", flexShrink: 0 }}
                />
                <span style={{ fontSize: 13, color: "#4b5563", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                  I agree to the{" "}
                  <a href="#" style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}>
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}>
                    Privacy Policy
                  </a>
                  . I confirm that I am the parent or legal guardian of the player named above.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                height: 52,
                borderRadius: 14,
                background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #d64d21, #f06838)",
                border: "none",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: isSubmitting ? "none" : "0 8px 24px rgba(214,77,33,0.4)",
                transition: "all 0.3s ease",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Activating Pass…
                </>
              ) : (
                <>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Activate Player Pass
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "#6b7280",
                fontFamily: "var(--font-body)",
              }}
            >
              Already activated?{" "}
              <Link
                to="/login"
                style={{ color: "#238ad5", textDecoration: "none", fontWeight: 600 }}
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}