// src/stores/authStore.ts
import { defineStore } from 'pinia';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface User {
  email: string;
  uid: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    error: null as string | null,
  }),
  actions: {
    // تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = { email: userCredential.user.email!, uid: userCredential.user.uid };
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },

    // تسجيل الدخول باستخدام Google
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.user = { email: userCredential.user.email!, uid: userCredential.user.uid };
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },

    // تسجيل مستخدم جديد
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = { email: userCredential.user.email!, uid: userCredential.user.uid };
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },

    // تسجيل الخروج
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },

    // إرسال بيانات النموذج إلى Firestore
    async submitForm(formData: any) {
      try {
        if (!this.user) {
          throw new Error('Lütfen önce giriş yapın.');
        }
        const userDocRef = doc(firestore, 'users', this.user.uid);
        await setDoc(userDocRef, formData, { merge: true });
        console.log('Form data submitted successfully!');
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});