"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-white)",
        borderTop: "1px solid #E5E7EB",
        padding: "clamp(40px, 6vw, 64px) 20px clamp(24px, 4vw, 32px) 20px",
        marginTop: "clamp(48px, 8vw, 80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Three-column layout - stacks on mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 6vw, 48px)",
            marginBottom: "clamp(32px, 6vw, 48px)",
          }}
        >
          {/* Column 1: Identity */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: "0 0 12px 0",
              }}
            >
              Farm To Table
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Connecting farmers and buyers directly. No middlemen. No platform
              fees.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: "0 0 12px 0",
              }}
            >
              Quick Links
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/browse"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Browse Produce
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/auth"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Farmer Login
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/profile"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Contact */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: "0 0 12px 0",
              }}
            >
              Legal
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 16px 0",
              }}
            >
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/terms"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Terms of Service
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/privacy"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link
                  href="/#verification"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  How verification works
                </Link>
              </li>
              <li>
                <Link
                  href="/#disclaimer"
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px 0",
                  }}
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
            <div style={{ marginTop: 16 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  margin: "0 0 6px 0",
                }}
              >
                Contact
              </p>
              <a
                href="mailto:anupamashetter@gmail.com"
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-primary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-secondary)")
                }
              >
                anupamashetter@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            paddingTop: "clamp(24px, 4vw, 32px)",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "#6B7280",
              margin: 0,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Farm To Table only connects buyers and farmers. All transactions and
            deliveries happen directly between them.
          </p>
        </div>

        {/* Creator Credit & Copyright */}
        <div
          style={{
            paddingTop: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              margin: "0 0 8px 0",
            }}
          >
            Created by{" "}
            <a
              href="https://sanjanb.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#9CA3AF",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.borderBottomColor = "#9CA3AF")
              }
              onMouseLeave={(e) =>
                (e.target.style.borderBottomColor = "transparent")
              }
            >
              Sanjan B M
            </a>
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              margin: 0,
            }}
          >
            © 2025 Farm To Table. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
