"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default function FarmerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [deals, setDeals] = useState([]);
  const [confirmingDeal, setConfirmingDeal] = useState(null);

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

        try {
          const q = query(
            collection(db, "products"),
            where("farmerId", "==", currentUser.uid)
          );
          const snapshot = await getDocs(q);
          const productsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList);

          // Fetch deals for farmer's products
          const dealsQuery = query(
            collection(db, "deals"),
            where("farmerId", "==", currentUser.uid)
          );
          const dealsSnapshot = await getDocs(dealsQuery);
          const dealsData = await Promise.all(
            dealsSnapshot.docs.map(async (dealDoc) => {
              const dealData = { id: dealDoc.id, ...dealDoc.data() };

              // Fetch product details
              const productDoc = await getDoc(
                doc(db, "products", dealData.productId)
              );
              const productData = productDoc.exists()
                ? { id: productDoc.id, ...productDoc.data() }
                : null;

              // Fetch buyer details
              let buyerData = null;
              if (dealData.buyerId) {
                const buyerDoc = await getDoc(
                  doc(db, "users", dealData.buyerId)
                );
                buyerData = buyerDoc.exists() ? buyerDoc.data() : null;
              }

              return {
                ...dealData,
                product: productData,
                buyer: buyerData,
              };
            })
          );
          setDeals(dealsData);
        } catch (err) {
          // Check if error is due to offline/connectivity
          if (err?.message?.includes("offline")) {
            setError(
              "Cannot connect to Firebase. Make sure Firestore is enabled in Firebase Console and you're connected to the internet."
            );
          } else {
            setError(err?.message || "Failed to fetch products");
          }
        }
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const confirmDeal = async (dealId, alreadyConfirmed) => {
    if (alreadyConfirmed) {
      alert("You have already confirmed this deal");
      return;
    }

    setConfirmingDeal(dealId);
    try {
      const dealRef = doc(db, "deals", dealId);
      await updateDoc(dealRef, {
        farmerConfirmed: true,
      });

      // Update local state
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId ? { ...deal, farmerConfirmed: true } : deal
        )
      );

      alert("Deal confirmed successfully!");
    } catch (err) {
      console.error("Error confirming deal:", err);
      alert("Failed to confirm deal. Please try again.");
    } finally {
      setConfirmingDeal(null);
    }
  };

  const toggleStatus = async (productId, currentStatus) => {
    if (!user) return;

    setUpdatingStatus((prev) => ({ ...prev, [productId]: true }));

    try {
      const newStatus = currentStatus === "available" ? "sold" : "available";
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { status: newStatus });

      // Update local state
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      setError(err?.message || "Failed to update product status");
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [productId]: false }));
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

  if (!user || role !== "farmer") return null;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        padding: "40px 20px",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {/* Pending Deals Section */}
      {deals.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "var(--color-text-primary)",
              marginBottom: 16,
            }}
          >
            Pending Deals
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              marginBottom: 20,
            }}
          >
            Buyers who expressed interest in your products. Confirm deals after
            completing the transaction.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {deals.map((deal) => {
              const isCompleted = deal.buyerConfirmed && deal.farmerConfirmed;

              return (
                <div
                  key={deal.id}
                  style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    padding: 20,
                    background: "var(--color-white)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 20,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 250 }}>
                      {deal.product ? (
                        <>
                          <Link
                            href={`/product/${deal.productId}`}
                            style={{
                              fontSize: 18,
                              fontWeight: 600,
                              color: "var(--color-primary)",
                              textDecoration: "none",
                              marginBottom: 8,
                              display: "block",
                            }}
                          >
                            {deal.product.cropName}
                          </Link>
                          <p
                            style={{
                              fontSize: 15,
                              color: "var(--color-text-primary)",
                              marginBottom: 8,
                            }}
                          >
                            ₹{parseFloat(deal.product.price).toFixed(2)} per kg
                          </p>
                        </>
                      ) : (
                        <p
                          style={{
                            fontSize: 16,
                            color: "#9CA3AF",
                          }}
                        >
                          Product no longer available
                        </p>
                      )}

                      {deal.buyer && (
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--color-text-secondary)",
                            marginTop: 8,
                          }}
                        >
                          Buyer: <strong>{deal.buyer.name}</strong> (
                          {deal.buyer.email})
                        </p>
                      )}

                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          marginTop: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: 12,
                            background: deal.buyerConfirmed
                              ? "#D1FAE5"
                              : "#F3F4F6",
                            color: deal.buyerConfirmed ? "#065F46" : "#6B7280",
                          }}
                        >
                          {deal.buyerConfirmed
                            ? "✓ Buyer confirmed"
                            : "⏳ Buyer not confirmed"}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            padding: "4px 10px",
                            borderRadius: 12,
                            background: deal.farmerConfirmed
                              ? "#D1FAE5"
                              : "#F3F4F6",
                            color: deal.farmerConfirmed ? "#065F46" : "#6B7280",
                          }}
                        >
                          {deal.farmerConfirmed
                            ? "✓ You confirmed"
                            : "⏳ Awaiting your confirmation"}
                        </span>
                        {isCompleted && (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: 12,
                              background: "#10B981",
                              color: "var(--color-white)",
                            }}
                          >
                            ✓ Deal Completed
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {deal.farmerConfirmed ? (
                        <div
                          style={{
                            padding: "10px 20px",
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#065F46",
                            background: "#D1FAE5",
                            border: "2px solid #10B981",
                            borderRadius: 6,
                          }}
                        >
                          Confirmed
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            confirmDeal(deal.id, deal.farmerConfirmed)
                          }
                          disabled={confirmingDeal === deal.id}
                          style={{
                            padding: "10px 20px",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--color-white)",
                            background:
                              confirmingDeal === deal.id
                                ? "#9CA3AF"
                                : "var(--color-primary)",
                            border: "none",
                            borderRadius: 6,
                            cursor:
                              confirmingDeal === deal.id
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {confirmingDeal === deal.id
                            ? "Confirming..."
                            : "Confirm Deal"}
                        </button>
                      )}
                    </div>
                  </div>

                  {!deal.farmerConfirmed && (
                    <div
                      style={{
                        marginTop: 16,
                        padding: 12,
                        background: "#FFFBEB",
                        border: "1px solid #FDE68A",
                        borderRadius: 6,
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
                        <strong>Note:</strong> Only confirm after you've
                        successfully completed the transaction with the buyer
                        (payment received and product delivered).
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: 8,
            margin: 0,
          }}
        >
          My Listings
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            margin: "8px 0 0 0",
          }}
        >
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          listed
        </p>
      </div>

      {error && (
        <div style={{ color: "#B91C1C", marginBottom: 20 }}>{error}</div>
      )}

      {products.length === 0 ? (
        <div
          style={{
            background: "var(--color-white)",
            padding: 40,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: 20,
              margin: 0,
              marginBottom: 20,
            }}
          >
            You haven't listed any products yet.
          </p>
          <Link
            href="/add-product"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              background: "var(--color-primary)",
              color: "var(--color-white)",
              textDecoration: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ position: "relative" }}>
              <Link
                href={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <div style={cardStyle}>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.cropName}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  )}
                  <div style={{ padding: 16 }}>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: 8,
                        marginTop: 0,
                        margin: 0,
                        marginBottom: 8,
                      }}
                    >
                      {product.cropName}
                    </h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--color-text-secondary)",
                            margin: "0 0 4px 0",
                            fontWeight: 500,
                          }}
                        >
                          Price
                        </p>
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--color-primary)",
                            margin: 0,
                          }}
                        >
                          ₹{parseFloat(product.price).toFixed(2)}/kg
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--color-text-secondary)",
                            margin: "0 0 4px 0",
                            fontWeight: 500,
                          }}
                        >
                          Available
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--color-text-primary)",
                            margin: 0,
                          }}
                        >
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        margin: 0,
                      }}
                    >
                      UPI: {product.upiId}
                    </p>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: 4,
                          background:
                            (product.status || "available") === "available"
                              ? "#D1FAE5"
                              : "#FEE2E2",
                          color:
                            (product.status || "available") === "available"
                              ? "#065F46"
                              : "#991B1B",
                        }}
                      >
                        {(product.status || "available") === "available"
                          ? "Available"
                          : "Sold"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <Link
                  href={`/edit-product/${product.id}`}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleStatus(product.id, product.status || "available");
                  }}
                  disabled={updatingStatus[product.id]}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid #E5E7EB",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: updatingStatus[product.id]
                      ? "not-allowed"
                      : "pointer",
                    color: "var(--color-text-primary)",
                    opacity: updatingStatus[product.id] ? 0.6 : 1,
                  }}
                >
                  {updatingStatus[product.id]
                    ? "Updating..."
                    : `Mark as ${
                        (product.status || "available") === "available"
                          ? "Sold"
                          : "Available"
                      }`}
                </button>
              </div>
            </div>
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
};
