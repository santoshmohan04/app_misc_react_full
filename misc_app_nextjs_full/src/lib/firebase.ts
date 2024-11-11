import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBYCyK5h9tFRHN3M2gSnSc6nYLPtdOYkC0",
    authDomain: "e-store-23dd9.firebaseapp.com",
    databaseURL: "https://e-store-23dd9.firebaseio.com",
    projectId: "e-store-23dd9",
    storageBucket: "e-store-23dd9.appspot.com",
    messagingSenderId: "987636102275",
    appId: "1:987636102275:web:c203302ccfc1c8279897b6",
    measurementId: "G-L0QV7EX418"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);