"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";

// Helper function to check if deal is completed
const isDealCompleted = (deal) => {
  return deal.buyerConfirmed === true && deal.farmerConfirmed === true;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
        return;
      }

      setUser(currentUser);

      try {
        // Fetch user profile data
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userD
          setEditPhone(data.phoneNumber || "");oc.data();
          setUserData(data);

          // Fetch deals based on role
          const dealsQuery =
            data.role === "farmer"
              ? query(
                  collection(db, "deals"),
                  where("farmerId", "==", currentUser.uid)
                )
              : query(
                  collection(db, "deals"),
                  where("buyerId", "==", currentUser.uid)
                );

          const dealsSnapshot = await getDocs(dealsQuery);
          const dealsData = dealsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDeals(dealsData);

          // Fetch farmer's products if farmer
          if (data.role === "farmer") {
            const productsQuery = query(
              collection(db, "products"),
              where("farmerId", "==", currentUser.uid)
            );
            const productsSnapshot = await getDocs(productsQuery);
            const productsData = productsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setProducts(productsData);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);
const handleSavePhone = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        phoneNumber: editPhone.trim() || null,
      });
      setUserData({ ...userData, phoneNumber: editPhone.trim() || null });
      setIsEditing(false);
      alert("Phone number updated successfully!");
    } catch (error) {
      console.error("Error updating phone:", error);
      alert("Failed to update phone number");
    } finally {
      setSaving(false);
    }
  };

  
  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
      </div>
    );
  }

  if (!user || !userData) {
    return null;
  }

  const completedDeals = deals.filter((deal) => isDealCompleted(deal));
  const pendingDeals = deals.filter((deal) => !isDealCompleted(deal));

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
          paddingBottom: 24,
          borderBottom: "2px solid #E5E7EB",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: 8,
          }}
        >
          {userData.name}
        </h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: 12,
              background: "#F3F4F6",
              color: "#6B7280",
            }}
          >
            {userData.role === "farmer" ? "Farmer" : "Buyer"}
          </span>
          {userData.role === "farmer" && userData.isVerified && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: 12,
                background: "#D1FAE5",
                color: "#065F46",
              }}
            >
              ✓ Verified
            </span>
          )}
          {userData.role === "farmer" && !userData.isVerified && (
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: 12,
                background: "#FEF3C7",
                color: "#92400E",
              }}
            >
              Not Verified
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-text-secondary)",
            marginTop: 12,
          }}
        >
          {userData.email}
        </p>
      </div>

      {/* Farmer-specific sections */}
      {userData.role === "farmer" && (
        <>
          {/* Listings Section */}
          <div
            style={{
              marginBottom: 32,
              padding: 20,
              background: "var(--color-white)",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 12,
              }}
            >
              My Listings
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--color-text-primary)",
                marginBottom: 12,
              }}
            >
              <strong>{products.length}</strong>{" "}
              {products.length === 1 ? "product" : "products"} listed
            </p>
            <Link
              href="/farmer"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-white)",
                background: "var(--color-primary)",
                border: "none",
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              View Dashboard
            </Link>
          </div>
        </>
      )}

      {/* Deals Summary (for both roles) */}
      <div
        style={{
          marginBottom: 32,
          padding: 20,
          background: "var(--color-white)",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 16,
          }}
        >
          Deals Summary
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Completed
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#10B981",
                margin: 0,
              }}
            >
              {completedDeals.length}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Pending
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#F59E0B",
                margin: 0,
              }}
            >
              {pendingDeals.length}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Total
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {deals.length}
            </p>
          </div>
        </div>
        <Link
          href={userData.role === "farmer" ? "/farmer" : "/my-deals"}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--color-primary)",
            background: "transparent",
            border: "2px solid var(--color-primary)",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          {userData.role === "farmer" ? "View All Deals" : "View My Deals"}
        </Link>
      </div>

      {/* Account Info */}
      <div
        style={{
          padding: 20,
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
        }}
      >div style={{ marginBottom: 8 }}>
            <strong>Phone Number:</strong>{" "}
            {!isEditing ? (
              <>
                <span>{userData.phoneNumber || "Not provided"}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    marginLeft: 12,
                    padding: "4px 12px",
                    fontSize: 12,
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </>
            ) : (
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #E5E7EB",
                    borderRadius: 4,
                    flex: 1,
                  }}
                />
                <button
                  onClick={handleSavePhone}
                  disabled={saving}
                  style={{
                    padding: "6px 16px",
                    fontSize: 12,
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditPhone(userData.phoneNumber || "");
                  }}
                  style={{
                    padding: "6px 16px",
                    fontSize: 12,
                    background: "#6B7280",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 12,
          }}
        >
          Account Information
        </h2>
        <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
          <p style={{ marginBottom: 8 }}>
            <strong>Email:</strong> {userData.email}
          </p>
          <p style={{ marginBottom: 8 }}>
            <strong>Role:</strong>{" "}
            {userData.role === "farmer" ? "Farmer" : "Buyer"}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Member since:</strong>{" "}
            {userData.createdAt
              ? new Date(userData.createdAt.toDate()).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
