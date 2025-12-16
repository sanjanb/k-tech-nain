"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";

export default function FarmerProfilePage() {
  const params = useParams();
  const farmerId = params.id;

  const [farmer, setFarmer] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        // Fetch farmer details
        const farmerDoc = await getDoc(doc(db, "users", farmerId));
        if (!farmerDoc.exists()) {
          setError("Farmer not found");
          setLoading(false);
          return;
        }

        const farmerData = farmerDoc.data();

        // Verify this is actually a farmer
        if (farmerData.role !== "farmer") {
          setError("User is not a farmer");
          setLoading(false);
          return;
        }

        setFarmer(farmerData);

        // Count active product listings
        const productsQuery = query(
          collection(db, "products"),
          where("farmerId", "==", farmerId)
        );
        const productsSnapshot = await getDocs(productsQuery);
        setProductsCount(productsSnapshot.size);
      } catch (err) {
        setError(err?.message || "Failed to load farmer profile");
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchFarmerData();
    }
  }, [farmerId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Recently joined";

    // Handle Firestore Timestamp
    let date;
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "grid",
          placeItems: "center",
          padding: "0 20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#B91C1C", marginBottom: 16 }}>
            {error || "Farmer profile not found"}
          </p>
          <Link
            href="/browse"
            style={{
              color: "var(--color-primary)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ← Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 20px",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link
          href="/browse"
          style={{
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontSize: 14,
            marginBottom: 16,
            display: "inline-block",
          }}
        >
          ← Back to Browse
        </Link>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          {farmer.name}
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: 14,
            margin: 0,
          }}
        >
          Farmer Profile
        </p>
      </div>

      {/* Profile Card */}
      <div
        style={{
          background: "var(--color-white)",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: 24,
        }}
      >
        {/* Location */}
        {farmer.location && (
          <div style={infoRowStyle}>
            <span style={labelStyle}>Location</span>
            <span style={valueStyle}>{farmer.location}</span>
          </div>
        )}

        {/* Active Listings */}
        <div style={infoRowStyle}>
          <span style={labelStyle}>Active Listings</span>
          <span style={valueStyle}>
            {productsCount} {productsCount === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Active Since */}
        <div style={infoRowStyle}>
          <span style={labelStyle}>Active Since</span>
          <span style={valueStyle}>{formatDate(farmer.createdAt)}</span>
        </div>

        {/* Contact Details - UPI if available */}
        {farmer.upiId && (
          <div style={infoRowStyle}>
            <span style={labelStyle}>UPI ID</span>
            <span style={valueStyle}>{farmer.upiId}</span>
          </div>
        )}

        {/* Phone if available */}
        {farmer.phone && (
          <div style={infoRowStyle}>
            <span style={labelStyle}>Phone</span>
            <span style={valueStyle}>{farmer.phone}</span>
          </div>
        )}

        {/* Email */}
        <div
          style={{ ...infoRowStyle, borderBottom: "none", paddingBottom: 0 }}
        >
          <span style={labelStyle}>Email</span>
          <span style={valueStyle}>{farmer.email}</span>
        </div>
      </div>

      {/* View Listings Button */}
      {productsCount > 0 && (
        <Link
          href="/browse"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "var(--color-primary)",
            color: "var(--color-white)",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          View All Products
        </Link>
      )}
    </div>
  );
}

const infoRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingBottom: 16,
  marginBottom: 16,
  borderBottom: "1px solid #E5E7EB",
  gap: 16,
  flexWrap: "wrap",
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text-secondary)",
};

const valueStyle = {
  fontSize: 14,
  color: "var(--color-text-primary)",
  textAlign: "right",
  wordBreak: "break-word",
};
