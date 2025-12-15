import "../styles/globals.css";

export const metadata = {
  title: "Farm To Table",
  description: "Minimal Next.js scaffold",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
