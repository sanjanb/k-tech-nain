"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProductPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [cropName, setCropName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [upiId, setUpiId] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data?.role !== "farmer") {
            router.replace("/");
            return;
          }
          setRole(data.role);
        }
        setUser(currentUser);
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // eslint-disable-next-line no-console
      console.log("Starting product submission...");

      // Skip image upload - use placeholder or null
      const imageUrl = null;

      // eslint-disable-next-line no-console
      console.log("Saving product to Firestore...");
      const productData = {
        cropName,
        price: parseFloat(price),
        quantity,
        upiId,
        imageUrl,
        farmerId: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), productData);
      // eslint-disable-next-line no-console
      console.log("Product added successfully!");

      router.push("/farmer");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error adding product:", err);
      
      // Better error messages
      let errorMessage = "Failed to add product";
      if (err?.message?.includes("offline")) {
        errorMessage =
          "Cannot connect to Firebase. Please check your internet connection.";
      } else if (err?.message?.includes("permission")) {
        errorMessage =
          "Permission denied. Make sure Firestore rules allow write access.";

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

  if (!user || role !== "farmer") return null;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 20px",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: 8,
        }}
      >
        Add Product
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: 32,
        }}
      >
        List your produce for buyers to discover
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--color-white)",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div style={fieldStyle}>
          <label style={labelStyle}>Crop Name</label>
          <input
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            required
            style={inputStyle}
            placeholder="e.g., Organic Tomatoes"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Price (₹ per kg)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={inputStyle}
            placeholder="e.g., 50"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            style={inputStyle}
            placeholder="e.g., 100 kg"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>UPI ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
            style={inputStyle}
            placeholder="e.g., farmer@upi"
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Image (Not available on free plan)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={inputStyle}
            disabled
            title="Image upload requires Firebase Storage (paid plan)"
          />
          <p
            style={{
              fontSize: 12,
              color: "var(--color-text-secondary)",
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Image upload disabled - Firebase Storage requires payment setup
          </p>
        </div>

        {error && (
          <div style={{ color: "#B91C1C", fontSize: 14, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "12px",
            background: "var(--color-primary)",
            color: "var(--color-white)",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 500,
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

const fieldStyle = {
  marginBottom: 20,
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text-primary)",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  fontSize: 14,
};
