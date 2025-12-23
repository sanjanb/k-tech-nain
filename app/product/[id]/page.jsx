"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [creatingDeal, setCreatingDeal] = useState(false);
  const [existingDeal, setExistingDeal] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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

        // Check if deal already exists for current user
        if (currentUser) {
          const dealsQuery = query(
            collection(db, "deals"),
            where("buyerId", "==", currentUser.uid),
            where("productId", "==", productId)
          );
          const dealsSnapshot = await getDocs(dealsQuery);
          if (!dealsSnapshot.empty) {
            setExistingDeal(dealsSnapshot.docs[0].data());
          }
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
  }, [productId, currentUser]);

  const createDeal = async () => {
    if (!currentUser) {
      alert("Please log in to express interest");
      return;
    }

    if (currentUser.uid === product.farmerId) {
      alert("You cannot create a deal for your own product");
      return;
    }

    setCreatingDeal(true);
    try {
      const dealData = {
        buyerId: currentUser.uid,
        farmerId: product.farmerId,
        productId: product.id,
        buyerConfirmed: false,
        farmerConfirmed: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "deals"), dealData);
      setExistingDeal(dealData);
      alert("Interest expressed successfully! A deal record has been created.");
    } catch (err) {
      console.error("Error creating deal:", err);
      alert("Failed to create deal. Please try again.");
    } finally {
      setCreatingDeal(false);
    }
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {product.cropName}
          </h1>
          {(product.status || "available") === "sold" && (
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: 6,
                background: "#FEE2E2",
                color: "#991B1B",
                whiteSpace: "nowrap",
              }}
            >
              SOLD
            </span>
          )}
        </div>

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
              marginBottom: 8,
            }}
          >
            Sold by:{" "}
            {farmer ? (
              <>
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
                {farmer.isVerified && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: "#D1FAE5",
                      color: "#065F46",
                    }}
                  >
                    ✓ Verified
                  </span>
                )}
              </>
            ) : (
              <span style={{ fontWeight: 600, fontSize: 16 }}>Unknown</span>
            )}
          </p>
        </div>

        {/* Express Interest Section (Buyers Only) */}
        {currentUser && currentUser.uid !== product.farmerId && (
          <div
            style={{
              border: "2px solid var(--color-primary)",
              borderRadius: 8,
              padding: "clamp(20px, 4vw, 24px)",
              marginBottom: "clamp(24px, 4vw, 32px)",
              background: "#F0F9FF",
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: 0,
                marginBottom: 12,
              }}
            >
              Interested in this product?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              Express your interest to start a deal record. Both you and the
              farmer can confirm the transaction later.
            </p>

            {existingDeal ? (
              <div
                style={{
                  background: "#D1FAE5",
                  border: "1px solid #10B981",
                  borderRadius: 6,
                  padding: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#065F46",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  ✓ You've already expressed interest in this product
                </p>
              </div>
            ) : (
              <button
                onClick={createDeal}
                disabled={creatingDeal}
                style={{
                  padding: "14px 28px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-white)",
                  background: creatingDeal ? "#9CA3AF" : "var(--color-primary)",
                  border: "none",
                  borderRadius: 6,
                  cursor: creatingDeal ? "not-allowed" : "pointer",
                  minHeight: 48,
                }}
              >
                {creatingDeal ? "Creating Deal..." : "Express Interest"}
              </button>
            )}
          </div>
        )}

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

          {/* Show QR payment option if farmer has provided it */}
          {farmer && (farmer.upiId || farmer.qrCodeUrl) && (
            <div
              style={{
                background: "#F0F9FF",
                border: "2px solid var(--color-primary)",
                borderRadius: 8,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  margin: 0,
                  marginBottom: 12,
                }}
              >
                Pay via UPI
              </h3>

              {farmer.qrCodeUrl && (
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <img
                    src={farmer.qrCodeUrl}
                    alt="Payment QR Code"
                    style={{
                      maxWidth: 250,
                      height: "auto",
                      border: "2px solid #E5E7EB",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Scan QR code to pay <strong>{farmer.name}</strong>
                  </p>
                </div>
              )}

              {farmer.upiId && (
                <div style={{ marginBottom: 8 }}>
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--color-white)",
                      padding: "10px 12px",
                      borderRadius: 6,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "var(--color-text-primary)",
                        margin: 0,
                        flex: 1,
                        fontFamily: "monospace",
                      }}
                    >
                      {farmer.upiId}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(farmer.upiId);
                        alert("UPI ID copied to clipboard!");
                      }}
                      style={{
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 500,
                        background: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              <div
                style={{
                  background: "#DBEAFE",
                  border: "1px solid #93C5FD",
                  borderRadius: 6,
                  padding: 10,
                  marginTop: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: "#1E40AF",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  <strong>Direct payment to farmer</strong> - Payment goes directly to the farmer using the UPI details above.
                </p>
              </div>
            </div>
          )}

          {/* Contact information */}
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

          {/* Fallback message if no QR payment */}
          {farmer && !farmer.upiId && !farmer.qrCodeUrl && (
            <div
              style={{
                background: "#FEF3C7",
                border: "1px solid #FCD34D",
                borderRadius: 6,
                padding: 12,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "#92400E",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                <strong>Note:</strong> The farmer has not provided QR payment details. Please contact them via email to arrange payment.
              </p>
            </div>
          )}
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
