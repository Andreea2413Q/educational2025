import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFKB-pygPKB4p_hTdoUwHKwFfJ-Nuq6GY",
  authDomain: "educational2025-3c9c2.firebaseapp.com",
  projectId: "educational2025-3c9c2",
  storageBucket: "educational2025-3c9c2.firebasestorage.app",
  messagingSenderId: "297604145135",
  appId: "1:297604145135:web:c3a4a14a37074bdb05e01a",
  measurementId: "G-TDWVHCYR4W"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app
