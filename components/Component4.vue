<template>
  <div class="login-register-form">
    <!-- Tabs -->
    <div v-if="!isLoggedIn" class="tabs">
      <button
        :class="{ active: activeTab === 'login' }"
        @click="activeTab = 'login'"
      >
        Giriş Yap
      </button>
      <button
        :class="{ active: activeTab === 'register' }"
        @click="activeTab = 'register'"
      >
        Üye Ol
      </button>
    </div>

    <!-- Login Form -->
    <div v-if="activeTab === 'login' && !isLoggedIn" class="form login-form">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">E-Posta</label>
          <input type="email" id="email" v-model="loginForm.email" required />
        </div>
        <div class="form-group">
          <label for="password">Şifre</label>
          <input
            type="password"
            id="password"
            v-model="loginForm.password"
            required
          />
        </div>
        <div class="form-options">
          <div>
            <input type="checkbox" id="rememberMe" v-model="loginForm.remember" />
            <label for="rememberMe">Beni Hatırla</label>
          </div>
          <a href="#" class="forgot-password">Şifremi Unuttum</a>
        </div>
        <button type="submit" class="submit-button">Giriş Yap</button>
        <div class="divider">_________ VEYA _________</div>
        <p class="social-login-text">Sosyal hesap ile giriş yap</p>
        <div class="google-login">
          <button @click="handleGoogleLogin" class="google-button">
            <img
              src="https://www.karaca.com/catalog/view/assets/images/icons/google-login.png"
              alt="Google ile Giriş Yap"
              class="google-icon"
            />
          </button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- Register Form -->
    <div v-if="activeTab === 'register' && !isLoggedIn" class="form register-form">
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="firstName">Ad</label>
          <input type="text" id="firstName" v-model="registerForm.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Soyad</label>
          <input type="text" id="lastName" v-model="registerForm.lastName" required />
        </div>
        <div class="form-group">
          <label for="email">E-Posta</label>
          <input type="email" id="email" v-model="registerForm.email" required />
        </div>
        <div class="form-group">
          <label for="phone">GSM</label>
          <input type="tel" id="phone" v-model="registerForm.phone" required />
        </div>
        <div class="form-group">
          <label for="password">Şifre</label>
          <input
            type="password"
            id="password"
            v-model="registerForm.password"
            required
          />
        </div>
        <div class="form-requirements">
          <p class="requirements">
            <input type="checkbox" /> En az 8 karakter
            <input type="checkbox" /> En az 1 büyük harf
            <input type="checkbox" /> En az 1 küçük harf
          </p>
        </div>
        <div class="form-terms">
          <div>
            <input type="checkbox" id="terms" v-model="registerForm.agree" />
            <label for="terms">
              Üyelik sözleşmesi'ni okudum, kabul ediyorum.
            </label>
          </div>
          <a href="#" class="underline">Üye aydınlatma metnine buradan ulaşabilirsiniz.</a>
          <div>
            <input type="checkbox" id="privacy" />
            <label for="privacy">
              Karaca Love'a Üye Ol'a tıkladığın zaman
              <span class="underline">Bireysel Kullanıcı Sözleşmesi’ni</span> kabul etmiş olursunuz.
            </label>
            <p>Karaca Love’a üyelikle birlikte Dijital Cüzdan'da tanımlanmaktadır.</p>
          </div>
          <p>
            <a href="#" class="underline">Cüzdan aydınlatma metnine buradan ulaşabilirsiniz.</a>
          </p>
          <p>
            <a href="#" class="underline">Sipay aydınlatma metnine buradan ulaşabilirsiniz.</a>
          </p>
        </div>
        <button type="submit" class="submit-button register">Üye Ol</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- Success Messages -->
    <div v-if="isLoggedIn" class="success-message">
      <p v-if="loginSuccess">Giriş başarılı!</p>
      <p v-if="registerSuccess">Hesap oluşturma başarılı!</p>
      <button @click="handleLogout" class="logout-button">Çıkış Yap</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { auth, googleProvider, signInWithPopup } from '../firebase';

export default defineComponent({
  name: 'LoginRegisterForm',
  setup() {
    const activeTab = ref<'login' | 'register'>('login');
    const authStore = useAuthStore();

    const loginForm = ref({
      email: '',
      password: '',
      remember: false,
    });

    const registerForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      agree: false,
    });

    const error = ref<string | null>(null);
    const loginSuccess = ref<boolean>(false);
    const registerSuccess = ref<boolean>(false);
    const isLoggedIn = ref<boolean>(false);

    const handleLogin = async () => {
      error.value = null;
      loginSuccess.value = false;
      await authStore.login(loginForm.value.email, loginForm.value.password);
      if (authStore.error) {
        error.value = authStore.error;
      } else {
        console.log('Logged in successfully:', authStore.user);
        loginSuccess.value = true;
        isLoggedIn.value = true;
      }
    };

    const handleRegister = async () => {
      if (!registerForm.value.agree) {
        error.value = 'Lütfen üyelik sözleşmesini kabul edin.';
        return;
      }
      error.value = null;
      registerSuccess.value = false;
      await authStore.register(registerForm.value.email, registerForm.value.password);
      if (authStore.error) {
        error.value = authStore.error;
      } else {
        console.log('Registered successfully:', authStore.user);
        registerSuccess.value = true;
        isLoggedIn.value = true;
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('Google login successful:', user);
        loginSuccess.value = true;
        isLoggedIn.value = true;
      } catch (err) {
        console.error('Google login error:', err);
        error.value = 'Google ile giriş yapılırken bir hata oluştu.';
      }
    };

    const handleLogout = () => {
      authStore.logout();
      isLoggedIn.value = false;
      loginSuccess.value = false;
      registerSuccess.value = false;
    };

    return {
      activeTab,
      loginForm,
      registerForm,
      error,
      loginSuccess,
      registerSuccess,
      isLoggedIn,
      handleLogin,
      handleRegister,
      handleGoogleLogin,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.login-register-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
}

.tabs button.active {
  font-weight: bold;
  background: #ddd;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: 1px solid black;
  font-size: 16px;
  cursor: pointer;
}

.divider {
  text-align: center;
  margin: 15px 0;
}

.social-login-text,
.google-login {
  text-align: center;
  margin: 10px 0;
}

.google-button {
  width: 100%;
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-icon {
  width: 20px;
  height: 20px;
}

.requirements {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.underline {
  text-decoration: underline;
}

.error {
  color: red;
  text-align: center;
}

.success-message {
  text-align: center;
  margin-top: 20px;
}

.success-message p {
  color: green;
  font-size: 18px;
}

.logout-button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>