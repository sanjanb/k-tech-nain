import Link from "next/link";

export default function TermsPage() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "40px 20px",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Link
        href="/"
        style={{
          color: "var(--color-text-secondary)",
          textDecoration: "none",
          fontSize: 14,
          marginBottom: 16,
          display: "inline-block",
        }}
      >
        ← Back to Home
      </Link>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: 16,
        }}
      >
        Terms of Service
      </h1>

      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: 14,
          marginBottom: 32,
        }}
      >
        Last updated: December 19, 2025
      </p>

      <div
        style={{
          color: "var(--color-text-primary)",
          lineHeight: 1.8,
          fontSize: 15,
        }}
      >
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            1. Platform Purpose
          </h2>
          <p>
            Farm To Table is a connection platform that helps farmers and buyers
            find each other. The platform does not process payments, handle
            logistics, or manage transactions between users.
          </p>
          <p>
            Our role is limited to providing a space where farmers can list
            their produce and buyers can discover these listings.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            2. User Responsibilities
          </h2>
          <p>
            <strong>Farmers are responsible for:</strong>
          </p>
          <ul style={{ marginLeft: 20, marginBottom: 12 }}>
            <li>Providing accurate product information</li>
            <li>Ensuring product quality and availability</li>
            <li>Handling payment collection directly</li>
            <li>Managing delivery or pickup arrangements</li>
            <li>Keeping their contact information up to date</li>
          </ul>
          <p>
            <strong>Buyers are responsible for:</strong>
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Verifying product details before making deals</li>
            <li>Making payments directly to farmers</li>
            <li>Coordinating delivery or pickup with farmers</li>
            <li>Resolving any issues directly with farmers</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            3. Platform Limitations
          </h2>
          <p>
            Farm To Table explicitly does NOT provide:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Payment processing or escrow services</li>
            <li>Quality assurance or product verification</li>
            <li>Delivery, shipping, or logistics services</li>
            <li>Dispute resolution or mediation</li>
            <li>Insurance or liability coverage</li>
            <li>Legal advice or contract enforcement</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            4. No Platform Commission
          </h2>
          <p>
            Farm To Table does not charge any fees or commissions on
            transactions between farmers and buyers. All payments are handled
            directly between users outside of the platform.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            5. Liability Disclaimer
          </h2>
          <p>
            The platform is provided "as is" without any warranties. Farm To
            Table is not liable for:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Product quality, accuracy, or availability</li>
            <li>Failed payments or financial disputes</li>
            <li>Delivery issues or delays</li>
            <li>User misconduct or fraudulent activity</li>
            <li>Data loss or system downtime</li>
          </ul>
          <p>
            Users interact with each other at their own risk. We strongly
            recommend verifying information and conducting due diligence before
            completing transactions.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            6. User Conduct
          </h2>
          <p>Users agree to:</p>
          <ul style={{ marginLeft: 20 }}>
            <li>Provide accurate and truthful information</li>
            <li>Not post misleading or fraudulent listings</li>
            <li>Not engage in harassment or abuse</li>
            <li>Not violate any applicable laws or regulations</li>
            <li>Not attempt to hack or disrupt the platform</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            7. Content Removal
          </h2>
          <p>
            Farm To Table reserves the right to remove any listing or user
            account that:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Violates these terms of service</li>
            <li>Contains fraudulent or misleading information</li>
            <li>Receives multiple complaints from users</li>
            <li>Engages in illegal activities</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            8. Verification
          </h2>
          <p>
            The platform may offer a verification badge for farmers. This
            verification indicates basic account authenticity but does NOT
            guarantee:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Product quality or availability</li>
            <li>Reliable delivery or service</li>
            <li>Legal business status</li>
            <li>Financial stability</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            9. Changes to Terms
          </h2>
          <p>
            Farm To Table may update these terms at any time. Continued use of
            the platform after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            10. Contact
          </h2>
          <p>
            For questions about these terms, contact us at:
            admin@farmtotable.com
          </p>
        </section>

        <section
          style={{
            marginTop: 48,
            padding: 20,
            background: "#F9FAFB",
            borderRadius: 8,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
            Important Reminder
          </h3>
          <p style={{ margin: 0 }}>
            Farm To Table is a free connection platform. We do not handle money,
            products, or logistics. All transactions happen directly between
            farmers and buyers. Use the platform responsibly and at your own
            discretion.
          </p>
        </section>
      </div>
    </div>
  );
}
