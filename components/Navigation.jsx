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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest("button")) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

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
            <>
              <Link href="/farmer" style={linkStyle}>
                Dashboard
              </Link>
              <Link href="/add-product" style={linkStyle}>
                Add Product
              </Link>
            </>
          )}
          {role === "buyer" && user && (
            <Link href="/my-deals" style={linkStyle}>
              My Deals
            </Link>
          )}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={profileIconStyle}
                aria-label="Profile menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
                </svg>
              </button>
              {profileDropdownOpen && (
                <div style={profileDropdownStyle}>
                  <Link
                    href="/profile"
                    style={dropdownLinkStyle}
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    style={dropdownButtonStyle}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
            <>
              <Link
                href="/farmer"
                style={mobileLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/add-product"
                style={mobileLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Product
              </Link>
            </>
          )}
          {role === "buyer" && user && (
            <Link
              href="/my-deals"
              style={mobileLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Deals
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

const profileIconStyle = {
  background: "transparent",
  border: "none",
  color: "var(--color-text-primary)",
  cursor: "pointer",
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "background 0.2s",
};

const profileDropdownStyle = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  background: "var(--color-white)",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  minWidth: 150,
  zIndex: 1000,
  overflow: "hidden",
};

const dropdownLinkStyle = {
  display: "block",
  padding: "12px 20px",
  color: "var(--color-text-primary)",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  borderBottom: "1px solid #F3F4F6",
  transition: "background 0.2s",
};

const dropdownButtonStyle = {
  width: "100%",
  padding: "12px 20px",
  background: "transparent",
  border: "none",
  color: "var(--color-text-primary)",
  fontSize: 14,
  fontWeight: 500,
  cursor: "pointer",
  textAlign: "left",
  transition: "background 0.2s",
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
