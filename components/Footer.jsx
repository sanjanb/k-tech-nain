import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-white)",
        borderTop: "1px solid #E5E7EB",
        padding: "48px 20px 32px 20px",
        marginTop: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 32,
            marginBottom: 32,
          }}
        >
          {/* About Section */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 12,
                margin: 0,
                marginBottom: 12,
              }}
            >
              Farm To Table
            </h4>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Connecting farmers directly with buyers. No middlemen, no
              commissions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 12,
                margin: 0,
                marginBottom: 12,
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/browse"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  Browse Produce
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Section */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 12,
                margin: 0,
                marginBottom: 12,
              }}
            >
              Creator
            </h4>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: 0,
                marginBottom: 8,
              }}
            >
              Built by{" "}
              <a
                href="https://sanjanb.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Sanjan BM
              </a>
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#9CA3AF",
                margin: 0,
              }}
            >
              A minimal farm-to-buyer marketplace prototype
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E5E7EB",
            margin: "32px 0",
          }}
        />

        {/* Disclaimer & Copyright */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              margin: "0 0 16px 0",
              lineHeight: 1.6,
            }}
          >
            <strong>Disclaimer:</strong> Farm To Table only connects buyers and
            farmers. Payments and transactions happen directly between them.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Farm To Table. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
