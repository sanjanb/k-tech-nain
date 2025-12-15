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
} from "firebase/firestore";

export default function FarmerPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        } catch (err) {
          setError(err?.message || "Failed to fetch products");
        }
      } else {
        router.replace("/auth");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

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
            <Link
              key={product.id}
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
};
