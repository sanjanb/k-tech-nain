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
          padding: "clamp(72px, 10vw, 120px) 20px",
          textAlign: "center",
          background: "var(--color-white)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 12px 0",
            maxWidth: 720,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          Buy fresh, pay farmers directly
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 2.2vw, 18px)",
            color: "var(--color-text-secondary)",
            maxWidth: 640,
            margin: "0 0 28px 0",
            lineHeight: 1.7,
          }}
        >
          A minimal marketplace connecting buyers with verified farmers. No
          fees, no middlemen.
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

      {/* Trust Strip */}
      <section
        style={{
          padding: "0 20px",
          margin: "0 auto",
          maxWidth: 1100,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            margin: "clamp(16px, 3vw, 24px) 0",
          }}
        >
          <span style={chipStyle}>Verified Farmers</span>
          <span style={chipStyle}>No Platform Fees</span>
          <span style={chipStyle}>Direct Payments</span>
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
            marginBottom: "clamp(32px, 6vw, 48px)",
            letterSpacing: "-0.02em",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 5vw, 40px)",
          }}
        >
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>Farmers list produce</h3>
            <p style={stepTextStyle}>
              Farmers share price, quantity, and payment details.
            </p>
          </div>
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>Buyers browse</h3>
            <p style={stepTextStyle}>
              Compare options and contact farmers directly.
            </p>
          </div>
          <div style={stepStyle}>
            <h3 style={stepTitleStyle}>Pay directly</h3>
            <p style={stepTextStyle}>No commission. No platform fees.</p>
          </div>
        </div>
      </section>

      {/* 3. How Verification Works */}
      <section
        id="verification"
        style={{
          padding: "clamp(60px, 10vw, 100px) 20px",
          maxWidth: 960,
          margin: "0 auto",
          background: "var(--color-white)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={chipStyle}>Trust & Verification</span>
        </div>
        <h2
          style={{
            fontSize: "clamp(26px, 4.5vw, 40px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            textAlign: "center",
            marginBottom: "clamp(20px, 4vw, 28px)",
            letterSpacing: "-0.02em",
          }}
        >
          How Verification Works
        </h2>
        <div
          style={{
            background: "#F9FAFB",
            padding: "clamp(24px, 4vw, 32px)",
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            borderLeft: "4px solid var(--color-primary)",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-primary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            <strong>What does the "Verified Farmer" badge mean?</strong>
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            The verification badge indicates that the farmer has submitted basic
            identity documentation (such as ID proof or land ownership records)
            which has been reviewed by the platform admin.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-primary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            <strong>What verification does NOT guarantee:</strong>
          </p>
          <ul
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              paddingLeft: 20,
              marginBottom: 16,
            }}
          >
            <li>Product quality or freshness</li>
            <li>Delivery timing or reliability</li>
            <li>Transaction success or payment security</li>
            <li>Resolution of disputes</li>
          </ul>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Verification is a basic trust signal, not a comprehensive guarantee.
            Buyers should communicate directly with farmers and assess listings
            carefully before making any commitments.
          </p>
        </div>
      </section>

      {/* 4. Disclaimer */}
      <section
        id="disclaimer"
        style={{
          padding: "clamp(60px, 10vw, 100px) 20px",
          maxWidth: 960,
          margin: "0 auto",
          background: "var(--color-bg)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={chipStyle}>Important</span>
        </div>
        <h2
          style={{
            fontSize: "clamp(26px, 4.5vw, 40px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            textAlign: "center",
            marginBottom: "clamp(20px, 4vw, 28px)",
            letterSpacing: "-0.02em",
          }}
        >
          Platform Disclaimer
        </h2>
        <div
          style={{
            background: "var(--color-white)",
            padding: "clamp(24px, 4vw, 32px)",
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-primary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            <strong>Farm To Table is a connection platform only.</strong>
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            We provide a space where farmers can list their produce and buyers
            can browse listings. All transactions, payments, and deliveries
            happen directly between buyers and farmers.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "var(--color-text-primary)",
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            <strong>What we do NOT do:</strong>
          </p>
          <ul
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              paddingLeft: 20,
              marginBottom: 16,
            }}
          >
            <li>Process payments or handle money</li>
            <li>Arrange or manage deliveries</li>
            <li>Store or handle produce</li>
            <li>Mediate disputes between buyers and farmers</li>
            <li>Guarantee product quality or delivery</li>
          </ul>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            By using this platform, you acknowledge that all agreements,
            transactions, and communications are your own responsibility. We
            encourage clear communication and careful verification before any
            transaction.
          </p>
        </div>
      </section>

      {/* 5. Light CTA */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 100px) 20px clamp(80px, 12vw, 120px)",
          textAlign: "center",
          background: "var(--color-white)",
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
  padding: "16px",
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

const chipStyle = {
  display: "inline-block",
  padding: "8px 12px",
  background: "#F3F4F6",
  color: "var(--color-text-primary)",
  borderRadius: 9999,
  fontSize: 13,
};
