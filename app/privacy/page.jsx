import Link from "next/link";

export default function PrivacyPage() {
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
        Privacy Policy
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
            1. Information We Collect
          </h2>
          <p>
            <strong>Account Information:</strong>
          </p>
          <ul style={{ marginLeft: 20, marginBottom: 12 }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>Role (Farmer or Buyer)</li>
            <li>Phone number (optional)</li>
          </ul>
          <p>
            <strong>Farmer Listings:</strong>
          </p>
          <ul style={{ marginLeft: 20, marginBottom: 12 }}>
            <li>Product names and descriptions</li>
            <li>Prices and quantities</li>
            <li>Product images</li>
            <li>UPI payment details</li>
            <li>Product categories</li>
          </ul>
          <p>
            <strong>Transaction Records:</strong>
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Deal creation timestamps</li>
            <li>Confirmation statuses</li>
            <li>Feedback and ratings</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul style={{ marginLeft: 20 }}>
            <li>Create and manage user accounts</li>
            <li>Display product listings to buyers</li>
            <li>Enable direct communication between farmers and buyers</li>
            <li>Track deals and confirmations</li>
            <li>Display farmer verification status</li>
            <li>Show feedback and ratings</li>
            <li>Improve platform functionality</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            3. Information Sharing
          </h2>
          <p>
            <strong>Public Information:</strong>
          </p>
          <ul style={{ marginLeft: 20, marginBottom: 12 }}>
            <li>Farmer names are visible on product listings and profiles</li>
            <li>Product details are publicly accessible</li>
            <li>UPI IDs are visible to interested buyers on product pages</li>
            <li>Phone numbers (if provided) are visible on farmer profiles</li>
            <li>Verification badges are publicly displayed</li>
            <li>Feedback and ratings are public</li>
          </ul>
          <p>
            <strong>Private Information:</strong>
          </p>
          <ul style={{ marginLeft: 20, marginBottom: 12 }}>
            <li>Email addresses are NOT publicly visible</li>
            <li>Passwords are encrypted and never shared</li>
            <li>Buyer identities are visible only in deal records</li>
          </ul>
          <p>
            <strong>Third-Party Sharing:</strong>
          </p>
          <p>
            We do NOT sell, rent, or share your personal information with third
            parties for advertising or marketing purposes. The only third-party
            service we use is Firebase (Google) for backend infrastructure.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            4. Firebase and Data Storage
          </h2>
          <p>
            Farm To Table uses Firebase (provided by Google) as our backend
            service. This includes:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Firebase Authentication for user login</li>
            <li>Cloud Firestore for data storage</li>
            <li>Firebase hosting infrastructure</li>
          </ul>
          <p>
            Your data is stored on Firebase servers and is subject to Google's
            privacy policies. Firebase employs industry-standard security
            measures to protect your data.
          </p>
          <p>
            Learn more:{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              Firebase Privacy Policy
            </a>
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            5. Data Security
          </h2>
          <p>
            We implement security measures to protect your information:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Passwords are encrypted using Firebase Authentication</li>
            <li>Data transmission is secured via HTTPS</li>
            <li>Access controls limit who can view certain information</li>
            <li>Firebase security rules protect database access</li>
          </ul>
          <p>
            However, no system is completely secure. We cannot guarantee
            absolute security of your data.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            6. Cookies and Tracking
          </h2>
          <p>
            Farm To Table does NOT use cookies for advertising or tracking
            purposes. The platform uses minimal session management provided by
            Firebase Authentication to keep you logged in.
          </p>
          <p>
            We do NOT use:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Analytics tracking (Google Analytics, etc.)</li>
            <li>Advertising cookies</li>
            <li>Third-party tracking scripts</li>
            <li>Behavioral profiling</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            7. Your Rights and Choices
          </h2>
          <p>
            <strong>Access and Update:</strong> You can view and edit your
            profile information, including phone number, from your profile page.
          </p>
          <p>
            <strong>Delete Listings:</strong> Farmers can delete their product
            listings at any time.
          </p>
          <p>
            <strong>Account Deletion:</strong> To delete your account, contact
            us at admin@farmtotable.com. Note that some information may be
            retained for legitimate business purposes or legal compliance.
          </p>
          <p>
            <strong>Opt-Out:</strong> Since we don't send marketing emails or
            track you for advertising, there's nothing to opt out of beyond
            deleting your account.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            8. Children's Privacy
          </h2>
          <p>
            Farm To Table is not intended for users under the age of 18. We do
            not knowingly collect information from children. If you are a parent
            or guardian and believe your child has provided us with information,
            please contact us immediately.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            9. Data Retention
          </h2>
          <p>
            We retain your information for as long as your account is active or
            as needed to provide services. If you delete your account, we may
            retain certain information for:
          </p>
          <ul style={{ marginLeft: 20 }}>
            <li>Legal compliance</li>
            <li>Dispute resolution</li>
            <li>Fraud prevention</li>
            <li>Platform analytics (anonymized)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            10. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. The "Last
            updated" date at the top will reflect the most recent changes.
            Continued use of the platform after changes indicates acceptance of
            the updated policy.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            11. Contact Us
          </h2>
          <p>
            If you have questions about this privacy policy or how we handle
            your data, contact us at:
          </p>
          <p style={{ fontWeight: 500 }}>admin@farmtotable.com</p>
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
            Our Commitment
          </h3>
          <p style={{ margin: 0 }}>
            Farm To Table is built on transparency. We collect only the data
            necessary for platform functionality. We do not sell your
            information, track you for advertising, or use your data beyond
            connecting farmers and buyers. Your privacy matters to us.
          </p>
        </section>
      </div>
    </div>
  );
}
