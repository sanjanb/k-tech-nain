export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-white)',
      borderTop: '1px solid #E5E7EB',
      padding: '32px 20px',
      marginTop: 64,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.6,
        }}>
          Farm To Table only connects buyers and farmers. Payments and transactions happen directly between them.
        </p>
        <p style={{
          fontSize: 12,
          color: '#9CA3AF',
          margin: '16px 0 0 0',
        }}>
          © {new Date().getFullYear()} Farm To Table. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
