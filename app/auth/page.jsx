"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("buyer"); // 'farmer' | 'buyer'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        if (!name.trim()) throw new Error("Name is required");
        const cred = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
        const { uid } = cred.user;
        await setDoc(doc(db, "users", uid), {
          uid,
          name: name.trim(),
          email: cred.user.email,
          phoneNumber: phoneNumber.trim() || null,
          role,
          createdAt: new Date(),
          isVerified: false,
        });
        // Redirect based on selected role
        router.replace(role === "farmer" ? "/farmer" : "/browse");
      } else {
        const cred = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
        const { uid } = cred.user;
        const snap = await getDoc(doc(db, "users", uid));
        if (!snap.exists()) {
          throw new Error("User profile not found");
        }
        const data = snap.data();
        const userRole = data?.role === "farmer" ? "farmer" : "buyer";
        router.replace(userRole === "farmer" ? "/farmer" : "/browse");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#F1F8F4",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#FFFFFF",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: 16,
            color: "#1F2933",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {mode === "login" ? "Login" : "Register"}
        </h1>

        {mo>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{ display: "block", marginBottom: 6, color: "#6B7280" }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 6,
                }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{ display: "block", marginBottom: 6, color: "#6B7280" }}
              >
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 9876543210"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 6,
                }}
              />
            </div>
          </
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label
            style={{ display: "block", marginBottom: 6, color: "#6B7280" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: 6,
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label
            style={{ display: "block", marginBottom: 6, color: "#6B7280" }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: 6,
            }}
          />
        </div>

        {mode === "register" && (
          <div style={{ marginBottom: 16 }}>
            <label
              style={{ display: "block", marginBottom: 6, color: "#6B7280" }}
            >
              Role
            </label>
            <div style={{ display: "flex", gap: 16 }}>
              <label
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  color: "#1F2933",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={role === "buyer"}
                  onChange={() => setRole("buyer")}
                />
                Buyer
              </label>
              <label
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  color: "#1F2933",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={role === "farmer"}
                  onChange={() => setRole("farmer")}
                />
                Farmer
              </label>
            </div>
          </div>
        )}

        {error && (
          <div style={{ color: "#B91C1C", fontSize: 14, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#2E7D32",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading
            ? "Please wait…"
            : mode === "login"
            ? "Login"
            : "Create account"}
        </button>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{
              background: "transparent",
              border: "none",
              color: "#2E7D32",
              cursor: "pointer",
            }}
          >
            {mode === "login"
              ? "Need an account? Register"
              : "Have an account? Login"}
          </button>
        </div>

        <p style={{ marginTop: 16, color: "#6B7280", fontSize: 12 }}>
          No password reset flow in MVP.
        </p>
      </form>
    </div>
  );
}
