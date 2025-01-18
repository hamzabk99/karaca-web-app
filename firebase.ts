// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

const firebaseConfig = {
    apiKey: "AIzaSyAg_8THuDhoBL4STCzJODWS0RNhny5NItc",
    authDomain: "karaca-eeb3c.firebaseapp.com",
    projectId: "karaca-eeb3c",
    storageBucket: "karaca-eeb3c.firebasestorage.app",
    messagingSenderId: "354070514770",
    appId: "1:354070514770:web:1d36f0e81d01600491e38b",
    measurementId: "G-LK000WEWVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

// Export the services
export { firestore, auth };