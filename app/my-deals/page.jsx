"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

// Helper function to determine if a deal is fully completed
// A deal is completed ONLY when both buyer and farmer have confirmed
// This derived status will be used for future feedback eligibility
const isDealCompleted = (deal) => {
  return deal.buyerConfirmed === true && deal.farmerConfirmed === true;
};

export default function MyDealsPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchDeals();
    }
  }, [currentUser]);

  const fetchDeals = async () => {
    try {
      const dealsQuery = query(
        collection(db, "deals"),
        where("buyerId", "==", currentUser.uid)
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

          // Fetch farmer details
          let farmerData = null;
          if (dealData.farmerId) {
            const farmerDoc = await getDoc(doc(db, "users", dealData.farmerId));
            farmerData = farmerDoc.exists() ? farmerDoc.data() : null;
          }

          return {
            ...dealData,
            product: productData,
            farmer: farmerData,
          };
        })
      );

      setDeals(dealsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching deals:", error);
      setLoading(false);
    }
  };

  const confirmDeal = async (dealId, alreadyConfirmed) => {
    if (alreadyConfirmed) {
      alert("You have already confirmed this deal");
      return;
    }

    setConfirming(dealId);
    try {
      const dealRef = doc(db, "deals", dealId);
      await updateDoc(dealRef, {
        buyerConfirmed: true,
      });

      // Update local state
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId ? { ...deal, buyerConfirmed: true } : deal
        )
      );

      alert("Deal confirmed successfully!");
    } catch (error) {
      console.error("Error confirming deal:", error);
      alert("Failed to confirm deal. Please try again.");
    } finally {
      setConfirming(null);
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

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "40px 20px",
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
        My Deals
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--color-text-secondary)",
          marginBottom: 32,
        }}
      >
        Products you've expressed interest in. Confirm deals after completing
        the transaction with the farmer.
      </p>

      {deals.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "#F9FAFB",
            borderRadius: 8,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-secondary)",
              marginBottom: 20,
            }}
          >
            You haven't expressed interest in any products yet.
          </p>
          <Link
            href="/browse"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-white)",
              background: "var(--color-primary)",
              border: "none",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {deals.map((deal) => {
            // Derived completion status - no database field needed
            const isCompleted = isDealCompleted(deal);

            return (
              <div
                key={deal.id}
                style={{
                  border: isCompleted ? "2px solid #10B981" : "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: 20,
                  background: isCompleted ? "#F0FDF4" : "var(--color-white)",
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
                            fontSize: 20,
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
                            fontSize: 16,
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

                    {deal.farmer && (
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--color-text-secondary)",
                          marginTop: 8,
                        }}
                      >
                        Farmer:{" "}
                        <Link
                          href={`/farmer-profile/${deal.farmerId}`}
                          style={{
                            color: "var(--color-primary)",
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                        >
                          {deal.farmer.name}
                        </Link>
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
                          ? "✓ You confirmed"
                          : "⏳ Awaiting your confirmation"}
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
                          ? "✓ Farmer confirmed"
                          : "⏳ Farmer not confirmed"}
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
                    {deal.buyerConfirmed ? (
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
                          confirmDeal(deal.id, deal.buyerConfirmed)
                        }
                        disabled={confirming === deal.id}
                        style={{
                          padding: "10px 20px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--color-white)",
                          background:
                            confirming === deal.id
                              ? "#9CA3AF"
                              : "var(--color-primary)",
                          border: "none",
                          borderRadius: 6,
                          cursor:
                            confirming === deal.id ? "not-allowed" : "pointer",
                        }}
                      >
                        {confirming === deal.id
                          ? "Confirming..."
                          : "Confirm Deal"}
                      </button>
                    )}
                  </div>
                </div>

                {!deal.buyerConfirmed && (
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
                      successfully completed the transaction with the farmer
                      (payment received and product delivered).
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 16,
                      background: "#D1FAE5",
                      border: "2px solid #10B981",
                      borderRadius: 6,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "#065F46",
                        margin: 0,
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      ✓ Deal Completed Successfully
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#065F46",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Both parties have confirmed this transaction. This
                      completed deal may enable feedback features in the
                      future.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
