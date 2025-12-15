import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug: Log what env vars are actually loaded
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("Firebase env check:", {
    hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    hasAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firestore with settings to handle offline scenarios better
export const db =
  getApps().length > 0
    ? getFirestore(app)
    : initializeFirestore(app, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      });

export const storage = getStorage(app);

// Enable offline persistence (caching) - only in browser
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db, {
    forceOwnership: false, // Allow multiple tabs
  }).catch((err) => {
    if (err.code === "failed-precondition") {
      // eslint-disable-next-line no-console
      console.warn(
        "Multiple tabs open, persistence enabled in first tab only."
      );
    } else if (err.code === "unimplemented") {
      // eslint-disable-next-line no-console
      console.warn("Browser doesn't support offline persistence.");
    } else {
      // eslint-disable-next-line no-console
      console.warn("Offline persistence could not be enabled:", err.message);
    }
  });
}

export default app;
