import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: 48,
          maxWidth: 600,
          lineHeight: 1.3,
        }}
      >
        Buy directly from farmers. No middlemen.
      </h1>

      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/browse" style={buttonStyle}>
          Browse Produce
        </Link>
        <Link href="/auth" style={secondaryButtonStyle}>
          I am a Farmer
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: "inline-block",
  padding: "14px 32px",
  background: "var(--color-primary)",
  color: "var(--color-white)",
  textDecoration: "none",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 500,
};

const secondaryButtonStyle = {
  display: "inline-block",
  padding: "14px 32px",
  background: "transparent",
  color: "var(--color-primary)",
  textDecoration: "none",
  border: "2px solid var(--color-primary)",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 500,
};
