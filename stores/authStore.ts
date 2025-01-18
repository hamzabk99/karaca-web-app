// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase'; // Import the auth service from Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<typeof auth.currentUser | null>(null); // Define the type for user
  const error = ref<string | null>(null); // Define the type for error

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err: any) {
      error.value = err.message;
    }
  };

  return {
    user,
    error,
    login,
    register,
  };
});