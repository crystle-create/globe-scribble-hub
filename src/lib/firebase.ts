
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyReplaceMeWithYourActualKey",
  authDomain: "cloudiblog.firebaseapp.com",
  projectId: "cloudiblog",
  storageBucket: "cloudiblog.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// This is used to verify if a user is an admin
export const ADMIN_EMAIL = "cloudiblogg@gmail.com";
export const isAdminEmail = (email: string | null) => email === ADMIN_EMAIL;
