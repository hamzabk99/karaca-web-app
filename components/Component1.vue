<template>
  <header class="header">
    <div class="info-bar">
      <div class="info-item">
        <a href="#">Sipariş Takip</a>
      </div>
      <div class="info-item">
        <a href="#">Kolay İade</a>
      </div>
      <div class="info-item">
        <a href="#">Kampanyalar</a>
      </div>
      <div class="info-item">
        <a href="#">Blog</a>
      </div>
      <div class="info-item">
        <a href="#">Yardım</a>
      </div>
      <div class="info-item">
        <a href="#">Destek</a>
      </div>
    </div>

    <div class="top-bar">
      <div class="logo-container">
        <img src="https://static.karaca.com/catalog/view/assets/images/logos/karacalogo.svg" alt="Logo" class="logo" />
      </div>
      <div class="search-container">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Search for products, categories, or brands..." 
        />
      </div>
      <div class="account-cart">
        <div class="dropdown">
          <button class="dropdown-btn">Hesabım</button>
          <div class="dropdown-content">
            <a href="#" @click="handleGirisYap">Giriş Yap</a>
            <a href="#">Üye Ol</a>
            <a href="#">Siparişlerim</a>
          </div>
        </div>
        <button class="dropdown-btn" @click="handleSepet">Sepet</button>
      </div>
    </div>
    <nav class="category-nav">
      <ul class="category-list">
        <li v-for="(category, index) in categories" :key="index" class="category-item">
          <div class="dropdown">
            <button class="dropdown-btn">{{ category.name }}</button>
            <div class="dropdown-content">
              <a v-for="(item, idx) in category.items" :key="idx" href="#" @click="handleGida">{{ item }}</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EcommerceHeader",
  data() {
    return {
      categories: [
        { name: "Sofra", items: ["Yemek Takımları", "Sofra Servis", "Servis Sunum"] },
        { name: "Mutfak", items: ["Pişirme", "İçecek Hazırlama", "Mutfak Gereçleri"] },
        { name: "Küçük Ev Aletleri", items: ["Elektrikli Ev Aletleri", "Elektrikli Süpürgeler", "Gıda Hazırlama"] },
        { name: "Ev ve Yaşam", items: ["Yatak Odası", "Banyo", "Dekoratif Aksesuarlar"] },
        { name: "Yılbaşı Ürünleri" },
        { name: "Karaca x Müge Anlı" },
        { name: "Gıda", items: ["Kahveler", "Yağlar", "Atıştırmalıklar"] },
        { name: "Çeyiz Seti", items: ["Mutfak Çeyiz Seti", "Yatak Odası Çeyiz Seti", "Banyo Çeyiz Seti"] },
        { name: "Yeniler" },
        { name: "Markalar", items: ["Karaca", "Cookplus", "Emsan"] }
      ]
    };
  },
  methods: {
    handleSepet() {
      this.$emit("update-middle-component", "Component11");
    },
    handleGirisYap() {
      this.$emit("update-middle-component", "Component4");
    },
    handleGida() {
      this.$emit("update-middle-component", "Component3");
    },
  },
});
</script>

  <style scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f8f8; 
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  
  .info-bar {
    display: flex;
    justify-content: flex-end; 
    background-color: #f8f8f8;
    padding: 5px 10px;
    width: 100%;
  }
  
  .info-item {
    margin-left: 20px; 
  }
  
  .info-item a {
    text-decoration: none;
    color: #333;
    font-size: 0.8rem; 
    padding: 5px;
  }
  
  .info-item a:hover {
    color: #007bff;
  }
  
  
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
  
  .logo-container {
    flex-shrink: 0;
    margin-left: 1rem;
  }
  
  .logo {
    height: 30px;
  }
  
  .search-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    margin-top: 1rem;
  }
  
  .search-bar {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  .search-bar:focus {
    border-color: #007bff;
  }
  
  .account-cart {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
  
  .logo-small {
    height: 20px;
    margin-right: 0.5rem;
  }
  
  .dropdown {
    position: relative;
    margin-left: 1rem;
  }
  
  .dropdown-btn {
    background: none;
    color: black;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
  
  .dropdown-btn:hover {
    color: #007bff;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {
    background-color: #ddd;
  }
  
  .category-nav {
    width: 100%;
    margin-top: 1rem;
  }
  
  .category-list {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .category-item {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    cursor: pointer;
  }
  
  .category-item:hover {
    color: #007bff;
  }
  
  .dropdown-btn {
    font-size: 0.8rem;
  }
  </style>
  