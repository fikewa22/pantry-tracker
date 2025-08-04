// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId && 
  firebaseConfig.storageBucket && 
  firebaseConfig.messagingSenderId && 
  firebaseConfig.appId;

if (!isFirebaseConfigured) {
  console.warn("Firebase configuration incomplete. Some features may not work properly.");
  console.warn("Required environment variables:");
  console.warn("- NEXT_PUBLIC_FIREBASE_API_KEY");
  console.warn("- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  console.warn("- NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  console.warn("- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  console.warn("- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  console.warn("- NEXT_PUBLIC_FIREBASE_APP_ID");
}

// Initialize Firebase only if configuration is available
let app, firestore, storage;

try {
  if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    storage = getStorage(app);
  } else {
    // Create mock objects for development/deployment without Firebase
    firestore = null;
    storage = null;
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  firestore = null;
  storage = null;
}

export { firestore, storage };
