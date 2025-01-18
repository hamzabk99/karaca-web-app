// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqHNZ0xf0K8K_TNmfSvBdJ-shmRf3gff4",
  authDomain: "kacara-97fe9.firebaseapp.com",
  projectId: "kacara-97fe9",
  storageBucket: "kacara-97fe9.firebasestorage.app",
  messagingSenderId: "369822689187",
  appId: "1:369822689187:web:311ac523ec23ac3cdf9c16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export the services
export { auth, firestore, googleProvider, signInWithPopup };