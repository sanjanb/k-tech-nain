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

          {/* Column 2: Placeholder for Phase 3 */}
          <div>{/* Navigation section will be added in Phase 3 */}</div>

          {/* Column 3: Placeholder for Phase 4 */}
          <div>
            {/* Transparency & Contact section will be added in Phase 4 */}
          </div>
        </div>
      </div>
    </footer>
  );
}
