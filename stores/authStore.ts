// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

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
    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = { email: userCredential.user.email!, uid: userCredential.user.uid };
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = { email: userCredential.user.email!, uid: userCredential.user.uid };
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
      }
    },
  },
});