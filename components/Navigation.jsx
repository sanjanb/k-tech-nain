"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data?.role);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
      setMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (pathname === "/auth") return null;

  return (
    <nav
      style={{
        background: "var(--color-white)",
        borderBottom: "1px solid #E5E7EB",
        padding: "16px 20px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          Farm To Table
        </Link>

        {/* Desktop Navigation */}
        <div style={desktopNavStyle}>
          <Link href="/" style={linkStyle}>
            Home
          </Link>
          <Link href="/browse" style={linkStyle}>
            Browse Produce
          </Link>
          {role === "farmer" && (
            <Link href="/add-product" style={linkStyle}>
              Add Product
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          ) : (
            <Link href="/auth" style={linkStyle}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={burgerButtonStyle}
          aria-label="Toggle menu"
        >
          <div style={burgerLineStyle}></div>
          <div style={burgerLineStyle}></div>
          <div style={burgerLineStyle}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={mobileMenuStyle}>
          <Link
            href="/"
            style={mobileLinkStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/browse"
            style={mobileLinkStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Produce
          </Link>
          {role === "farmer" && (
            <Link
              href="/add-product"
              style={mobileLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Product
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} style={mobileLogoutButtonStyle}>
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              style={mobileLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

const desktopNavStyle = {
  display: "flex",
  gap: 20,
  alignItems: "center",
};

const linkStyle = {
  color: "var(--color-text-primary)",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
};

const logoutButtonStyle = {
  background: "transparent",
  border: "1px solid var(--color-primary)",
  color: "var(--color-primary)",
  padding: "6px 16px",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
};

const burgerButtonStyle = {
  display: "none",
  flexDirection: "column",
  gap: 5,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 8,
};

const burgerLineStyle = {
  width: 24,
  height: 2,
  background: "var(--color-text-primary)",
  borderRadius: 2,
};

const mobileMenuStyle = {
  display: "none",
  flexDirection: "column",
  gap: 12,
  padding: "16px 0",
  borderTop: "1px solid #E5E7EB",
  marginTop: 16,
};

const mobileLinkStyle = {
  color: "var(--color-text-primary)",
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 500,
  padding: "8px 0",
  display: "block",
};

const mobileLogoutButtonStyle = {
  background: "transparent",
  border: "1px solid var(--color-primary)",
  color: "var(--color-primary)",
  padding: "10px 16px",
  borderRadius: 6,
  fontSize: 16,
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
};
