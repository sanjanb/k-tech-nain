import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ minHeight: "calc(100vh - 70px)" }}>
      {/* 1. Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(60px, 10vw, 100px) 20px",
          textAlign: "center",
          background: "var(--color-bg)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 16,
            maxWidth: 600,
            lineHeight: 1.3,
          }}
        >
          Buy directly from farmers. No middlemen.
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 18px)",
            color: "var(--color-text-secondary)",
            maxWidth: 500,
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Fresh produce listed by farmers. Pay them directly.
        </p>
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
      </section>

      {/* 2. How It Works */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 100px) 20px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            textAlign: "center",
            marginBottom: "clamp(48px, 8vw, 72px)",
            letterSpacing: "-0.02em",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(40px, 6vw, 64px)",
          }}
        >
          <div style={stepStyle}>
            <div style={stepNumberStyle}>1</div>
            <h3 style={stepTitleStyle}>Farmers list their produce</h3>
            <p style={stepTextStyle}>
              Price, quantity, and contact details shared directly by farmers.
            </p>
          </div>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>2</div>
            <h3 style={stepTitleStyle}>Buyers browse and choose</h3>
            <p style={stepTextStyle}>
              Compare produce from different farmers in one place.
            </p>
          </div>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>3</div>
            <h3 style={stepTitleStyle}>Pay farmers directly</h3>
            <p style={stepTextStyle}>No commission. No platform fees.</p>
          </div>
        </div>
      </section>

      {/* 3. Light CTA */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 100px) 20px clamp(80px, 12vw, 120px)",
          textAlign: "center",
          background: "var(--color-bg)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(17px, 2.8vw, 20px)",
            color: "var(--color-text-secondary)",
            maxWidth: 640,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Start by browsing available produce or list your crops in minutes.
        </p>
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
      </section>
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

const stepStyle = {
  textAlign: "center",
  padding: "20px",
};

const stepNumberStyle = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "var(--color-white)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  fontWeight: 600,
  margin: "0 auto 20px",
  boxShadow: "0 2px 8px rgba(46, 125, 50, 0.15)",
};

const stepTitleStyle = {
  fontSize: "clamp(17px, 2.8vw, 20px)",
  fontWeight: 600,
  color: "var(--color-text-primary)",
  marginBottom: 14,
  letterSpacing: "-0.01em",
};

const stepTextStyle = {
  fontSize: "clamp(14px, 2.2vw, 15px)",
  color: "var(--color-text-secondary)",
  lineHeight: 1.7,
  maxWidth: 320,
  margin: "0 auto",
};
