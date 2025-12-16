"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (!productDoc.exists()) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        const productData = { id: productDoc.id, ...productDoc.data() };
        setProduct(productData);

        const farmerDoc = await getDoc(doc(db, "users", productData.farmerId));
        if (farmerDoc.exists()) {
          setFarmer(farmerDoc.data());
        }
      } catch (err) {
        // Check if error is due to offline/connectivity
        if (err?.message?.includes("offline")) {
          setError(
            "Cannot connect to Firebase. Make sure Firestore is enabled in Firebase Console and you're connected to the internet."
          );
        } else {
          setError(err?.message || "Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

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

  if (error || !product) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 70px)",
          padding: "40px 20px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div style={{ color: "#B91C1C", marginBottom: 20 }}>
          {error || "Product not found"}
        </div>
        <Link
          href="/browse"
          style={{
            color: "var(--color-primary)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          ← Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "clamp(24px, 5vw, 40px) 20px",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <Link
        href="/browse"
        style={{
          color: "var(--color-primary)",
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: "clamp(24px, 4vw, 32px)",
          display: "inline-block",
        }}
      >
        ← Back to Browse
      </Link>

      <div
        style={{
          background: "var(--color-white)",
          borderRadius: 8,
          padding: "clamp(20px, 4vw, 32px)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.cropName}
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 32,
            }}
          />
        )}

        <h1
          style={{
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 8,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {product.cropName}
        </h1>

        <p
          style={{
            fontSize: "clamp(20px, 4vw, 24px)",
            fontWeight: 600,
            color: "var(--color-primary)",
            marginBottom: "clamp(20px, 4vw, 24px)",
            margin: 0,
            marginTop: 8,
          }}
        >
          ₹{parseFloat(product.price).toFixed(2)} per kg
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "clamp(16px, 3vw, 24px)",
            marginBottom: "clamp(24px, 4vw, 32px)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                margin: "0 0 4px 0",
                fontWeight: 600,
              }}
            >
              Available Quantity
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {product.quantity}
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                margin: "0 0 4px 0",
                fontWeight: 600,
              }}
            >
              Posted
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {product.createdAt
                ? new Date(product.createdAt.toDate()).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E5E7EB",
            margin: "32px 0",
          }}
        />

        {/* Sold By Section */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Sold by:{" "}
            {farmer ? (
              <Link
                href={`/farmer-profile/${product.farmerId}`}
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {farmer.name}
              </Link>
            ) : (
              <span style={{ fontWeight: 600, fontSize: 16 }}>Unknown</span>
            )}
          </p>
        </div>

        {/* Payment/Contact Section */}
        <div
          style={{
            border: "2px solid #E5E7EB",
            borderRadius: 8,
            padding: "clamp(20px, 4vw, 24px)",
            marginBottom: "clamp(24px, 4vw, 32px)",
            background: "var(--color-white)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Payment & Contact Details
          </h2>

          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                margin: "0 0 4px 0",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              UPI ID
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {product.upiId || "Not provided"}
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                margin: "0 0 4px 0",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Email
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              {farmer?.email || "N/A"}
            </p>
          </div>

          <div
            style={{
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: 6,
              padding: 12,
              marginTop: 20,
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#1E40AF",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              💳 <strong>Direct payment to farmer</strong> - Complete payment
              directly using the UPI ID provided above.
            </p>
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E5E7EB",
            margin: "32px 0",
          }}
        />

        <div
          style={{
            background: "#FEF3C7",
            border: "1px solid #FCD34D",
            borderRadius: 8,
            padding: "clamp(16px, 3vw, 20px)",
            marginTop: "clamp(24px, 4vw, 32px)",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "#92400E",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <strong>Disclaimer:</strong> Farm To Table only connects buyers and
            farmers. Payments and transactions happen directly between them.
          </p>
        </div>
      </div>
    </div>
  );
}
