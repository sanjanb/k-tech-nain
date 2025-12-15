import { Inter } from 'next/font/google';
import "../styles/globals.css";
import Navigation from "../components/Navigation";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Farm To Table",
  description: "Buy directly from farmers. No middlemen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
