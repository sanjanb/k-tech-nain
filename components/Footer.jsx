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
          {/* Column 1: Placeholder for Phase 2 */}
          <div>
            {/* Identity section will be added in Phase 2 */}
          </div>

          {/* Column 2: Placeholder for Phase 3 */}
          <div>
            {/* Navigation section will be added in Phase 3 */}
          </div>

          {/* Column 3: Placeholder for Phase 4 */}
          <div>
            {/* Transparency & Contact section will be added in Phase 4 */}
          </div>
        </div>
      </div>
    </footer>
  );
}
