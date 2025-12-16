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
          padding: "clamp(48px, 8vw, 80px) 20px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            textAlign: "center",
            marginBottom: "clamp(40px, 6vw, 60px)",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(32px, 5vw, 48px)",
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

      {/* 3. Trust & Transparency */}
      <section
        style={{
          padding: "clamp(48px, 8vw, 80px) 20px",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: 32,
            }}
          >
            Transparent by design
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              textAlign: "left",
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            <div style={bulletStyle}>
              <span style={bulletDotStyle}>•</span>
              <span>No platform commission</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletDotStyle}>•</span>
              <span>No in-app payments</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletDotStyle}>•</span>
              <span>Farmers control pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Light CTA */}
      <section
        style={{
          padding: "clamp(48px, 8vw, 80px) 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 18px)",
            color: "var(--color-text-secondary)",
            maxWidth: 600,
            margin: "0 auto 32px",
            lineHeight: 1.6,
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
};

const stepNumberStyle = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "var(--color-white)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 600,
  margin: "0 auto 16px",
};

const stepTitleStyle = {
  fontSize: "clamp(16px, 2.5vw, 18px)",
  fontWeight: 600,
  color: "var(--color-text-primary)",
  marginBottom: 12,
};

const stepTextStyle = {
  fontSize: 14,
  color: "var(--color-text-secondary)",
  lineHeight: 1.6,
};

const bulletStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  fontSize: "clamp(15px, 2.5vw, 16px)",
  color: "var(--color-text-primary)",
};

const bulletDotStyle = {
  color: "var(--color-primary)",
  fontSize: 24,
  lineHeight: 1,
};
