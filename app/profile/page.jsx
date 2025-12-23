"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "../../lib/firebase";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import {
  validateUpiId,
  formatUpiId,
  getUpiValidationError,
} from "../../lib/upiValidation";

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

  // Payment details state
  const [paymentEnabled, setPaymentEnabled] = useState(false);
  const [editingPayment, setEditingPayment] = useState(false);
  const [editUpiId, setEditUpiId] = useState("");
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [uploadingQr, setUploadingQr] = useState(false);
  const [paymentError, setPaymentError] = useState("");

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
          const data = userDoc.data();
          setUserData(data);
          setEditPhone(data.phoneNumber || "");

          // Initialize payment data for farmers
          if (data.role === "farmer") {
            const hasPaymentInfo = !!(data.upiId || data.qrCodeUrl);
            setPaymentEnabled(hasPaymentInfo);
            setEditUpiId(data.upiId || "");
          }

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

  const handleSavePaymentDetails = async () => {
    if (!user) return;
    setPaymentError("");

    // If payment is disabled, clear all payment data
    if (!paymentEnabled) {
      setSaving(true);
      try {
        await updateDoc(doc(db, "users", user.uid), {
          upiId: null,
          qrCodeUrl: null,
        });
        setUserData({ ...userData, upiId: null, qrCodeUrl: null });
        setEditUpiId("");
        setQrCodeFile(null);
        setEditingPayment(false);
        alert("Payment details removed successfully!");
      } catch (error) {
        console.error("Error removing payment details:", error);
        setPaymentError("Failed to remove payment details");
      } finally {
        setSaving(false);
      }
      return;
    }

    // Validate UPI ID if provided
    if (editUpiId.trim() && !validateUpiId(editUpiId.trim())) {
      setPaymentError(getUpiValidationError(editUpiId.trim()));
      return;
    }

    setSaving(true);
    try {
      let qrCodeUrl = userData.qrCodeUrl || null;

      // Upload new QR code if provided
      if (qrCodeFile) {
        // Validate file type
        if (!qrCodeFile.type.match(/image\/(png|jpeg|jpg)/)) {
          setPaymentError("QR code must be PNG or JPEG format");
          setSaving(false);
          return;
        }

        // Validate file size (max 2MB)
        if (qrCodeFile.size > 2 * 1024 * 1024) {
          setPaymentError("QR code image must be less than 2MB");
          setSaving(false);
          return;
        }

        setUploadingQr(true);
        const qrRef = ref(
          storage,
          `qr-codes/${user.uid}/${Date.now()}-${qrCodeFile.name}`
        );
        await uploadBytes(qrRef, qrCodeFile);
        qrCodeUrl = await getDownloadURL(qrRef);
        setUploadingQr(false);
      }

      // Update Firestore
      const updateData = {
        upiId: editUpiId.trim() ? formatUpiId(editUpiId.trim()) : null,
        qrCodeUrl,
      };

      await updateDoc(doc(db, "users", user.uid), updateData);
      setUserData({ ...userData, ...updateData });
      setQrCodeFile(null);
      setEditingPayment(false);
      alert("Payment details updated successfully!");
    } catch (error) {
      console.error("Error updating payment details:", error);
      setPaymentError("Failed to update payment details");
    } finally {
      setSaving(false);
      setUploadingQr(false);
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

      {/* Payment Details Section (Farmers Only) */}
      {userData.role === "farmer" && (
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
              marginBottom: 8,
            }}
          >
            Payment Details (Optional)
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            Add UPI payment details to help buyers pay you directly. This is completely optional.
          </p>

          {/* Disclaimer */}
          <div
            style={{
              background: "#FEF3C7",
              border: "1px solid #FCD34D",
              borderRadius: 6,
              padding: 12,
              marginBottom: 20,
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
              <strong>Note:</strong> The platform does not process or verify payments. 
              All payments happen directly between you and the buyer.
            </p>
          </div>

          {/* Enable Payment Toggle */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              <input
                type="checkbox"
                checked={paymentEnabled}
                onChange={(e) => {
                  setPaymentEnabled(e.target.checked);
                  if (!e.target.checked && !editingPayment) {
                    // User is disabling - ask for confirmation
                    if (userData.upiId || userData.qrCodeUrl) {
                      const confirmed = confirm(
                        "This will remove your payment details. Continue?"
                      );
                      if (confirmed) {
                        setEditingPayment(true);
                      } else {
                        setPaymentEnabled(true);
                      }
                    }
                  } else if (e.target.checked) {
                    setEditingPayment(true);
                  }
                }}
                style={{
                  width: 18,
                  height: 18,
                  cursor: "pointer",
                }}
              />
              Enable QR Payment
            </label>
          </div>

          {/* Payment Fields (shown when enabled) */}
          {paymentEnabled && (
            <div>
              {!editingPayment ? (
                <div>
                  {/* Display current payment info */}
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: 4,
                      }}
                    >
                      UPI ID:
                    </p>
                    <p
                      style={{
                        fontSize: 15,
                        color: "var(--color-text-secondary)",
                        margin: 0,
                      }}
                    >
                      {userData.upiId || "Not provided"}
                    </p>
                  </div>

                  {userData.qrCodeUrl && (
                    <div style={{ marginBottom: 16 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          marginBottom: 8,
                        }}
                      >
                        QR Code:
                      </p>
                      <img
                        src={userData.qrCodeUrl}
                        alt="Payment QR Code"
                        style={{
                          maxWidth: 200,
                          height: "auto",
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                        }}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => setEditingPayment(true)}
                    style={{
                      padding: "10px 16px",
                      fontSize: 14,
                      background: "var(--color-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      minHeight: 44,
                    }}
                  >
                    Edit Payment Details
                  </button>
                </div>
              ) : (
                <div>
                  {/* Edit mode */}
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: 6,
                      }}
                    >
                      UPI ID (optional)
                    </label>
                    <input
                      type="text"
                      value={editUpiId}
                      onChange={(e) => setEditUpiId(e.target.value)}
                      placeholder="e.g., farmer@paytm"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #E5E7EB",
                        borderRadius: 6,
                        fontSize: 15,
                        minHeight: 44,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-secondary)",
                        marginTop: 4,
                        marginBottom: 0,
                      }}
                    >
                      Format: username@bankname (e.g., farmer123@paytm, 9876543210@ybl)
                    </p>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: 6,
                      }}
                    >
                      QR Code Image (optional, PNG/JPEG only, max 2MB)
                    </label>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => setQrCodeFile(e.target.files[0])}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid #E5E7EB",
                        borderRadius: 6,
                        fontSize: 14,
                        minHeight: 44,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-secondary)",
                        marginTop: 4,
                        marginBottom: 0,
                      }}
                    >
                      Upload a screenshot of your UPI payment QR code
                    </p>
                  </div>

                  {paymentError && (
                    <div
                      style={{
                        color: "#B91C1C",
                        fontSize: 14,
                        marginBottom: 12,
                        padding: 8,
                        background: "#FEE2E2",
                        borderRadius: 4,
                      }}
                    >
                      {paymentError}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={handleSavePaymentDetails}
                      disabled={saving || uploadingQr}
                      style={{
                        padding: "12px 20px",
                        fontSize: 14,
                        fontWeight: 500,
                        background: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: saving || uploadingQr ? "not-allowed" : "pointer",
                        opacity: saving || uploadingQr ? 0.6 : 1,
                        minHeight: 44,
                      }}
                    >
                      {saving
                        ? uploadingQr
                          ? "Uploading QR..."
                          : "Saving..."
                        : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingPayment(false);
                        setEditUpiId(userData.upiId || "");
                        setQrCodeFile(null);
                        setPaymentError("");
                        // If no existing payment data, disable payment
                        if (!userData.upiId && !userData.qrCodeUrl) {
                          setPaymentEnabled(false);
                        }
                      }}
                      disabled={saving || uploadingQr}
                      style={{
                        padding: "12px 20px",
                        fontSize: 14,
                        background: "#6B7280",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: saving || uploadingQr ? "not-allowed" : "pointer",
                        opacity: saving || uploadingQr ? 0.6 : 1,
                        minHeight: 44,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Account Info */}
      <div
        style={{
          padding: 20,
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
        }}
      >
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
          <div style={{ marginBottom: 8 }}>
            <strong>Phone Number:</strong>{" "}
            {!isEditing ? (
              <>
                <span>{userData.phoneNumber || "Not provided"}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    marginLeft: 12,
                    padding: "10px 16px",
                    fontSize: 14,
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    minHeight: 44,
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
                    padding: "12px 14px",
                    border: "1px solid #E5E7EB",
                    borderRadius: 4,
                    flex: 1,
                    fontSize: 16,
                    minHeight: 44,
                  }}
                />
                <button
                  onClick={handleSavePhone}
                  disabled={saving}
                  style={{
                    padding: "12px 20px",
                    fontSize: 14,
                    background: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    minHeight: 44,
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
                    padding: "12px 20px",
                    fontSize: 14,
                    background: "#6B7280",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    minHeight: 44,
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
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
