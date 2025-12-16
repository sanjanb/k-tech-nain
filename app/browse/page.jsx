"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function BrowsePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        // Check if error is due to offline/connectivity
        if (err?.message?.includes("offline")) {
          setError(
            "Cannot connect to Firebase. Make sure Firestore is enabled in Firebase Console and you're connected to the internet."
          );
        } else {
          setError(err?.message || "Failed to fetch products");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 20px",
        maxWidth: 1200,
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
        Browse Produce
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          marginBottom: 32,
        }}
      >
        {products.length} {products.length === 1 ? "product" : "products"}{" "}
        available
      </p>

      {error && (
        <div style={{ color: "#B91C1C", marginBottom: 20 }}>{error}</div>
      )}

      {products.length === 0 ? (
        <p
          style={{ color: "var(--color-text-secondary)", textAlign: "center" }}
        >
          No products available yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div style={cardStyle}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.cropName}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 200,
                      background: "var(--color-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px 8px 0 0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 48,
                        color: "var(--color-primary)",
                      }}
                    >
                      🌾
                    </span>
                  </div>
                )}
                <div style={{ padding: 16 }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: 8,
                      marginTop: 0,
                    }}
                  >
                    {product.cropName}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--color-primary)",
                      marginBottom: 8,
                      margin: 0,
                    }}
                  >
                    ₹{parseFloat(product.price).toFixed(2)} per kg
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Available: {product.quantity}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "var(--color-white)",
  borderRadius: 8,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  overflow: "hidden",
  cursor: "pointer",
  transition: "box-shadow 0.2s ease",
};
