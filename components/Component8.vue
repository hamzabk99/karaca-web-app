<template>
    <div class="service-container">
      <h1>Küçük Ev Aletleri Yetkili Servisleri</h1>
      <div class="search-section">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Servis noktası adıyla arama yapabilirsiniz."
          class="search-input"
        />
        <select v-model="selectedOption" class="dropdown">
          <option value="" disabled>Seçiniz</option>
          <option v-for="option in dropdownOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button @click="findNearestService" class="nearest-button">
        Bana En Yakın Servis
      </button>
      <button @click="applyToBeAuthorized" class="authorized-button">
        Yetkili Servis Olmak İstiyorum
      </button>
  
      <ul class="service-list">
        <li v-for="service in filteredServices" :key="service.id" class="service-item">
          <h3>{{ service.name }}</h3>
          <p>{{ service.address }}</p>
          <p>{{ service.location }}</p>
          <a :href="'mailto:' + service.email">{{ service.email }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  
  interface Service {
    id: number;
    name: string;
    address: string;
    location: string;
    email: string;
    city: string;
  }
  
  export default defineComponent({
    name: "AuthorizedServices",
    setup() {
      const searchQuery = ref("");
      const selectedOption = ref<string | null>(null);
  
      const dropdownOptions = ["Istanbul", "Yalova", "Bursa"];
      const services = ref<Service[]>([
        {
          id: 1,
          name: "DÜZOVA ELEKTRİK",
          address: "Baraj Yolu 5. Durak Merih Apt. No:65/d",
          location: "SEYHAN/Adana",
          email: "duzovaelektrik@hotmail.com",
          city: "Istanbul",
        },
        {
          id: 2,
          name: "DÜZOVA ELEKTRİK TPĞ",
          address: "Tepebağ Mah. Cemal Gürsel Cad. 27001 Sk. No:5/a",
          location: "SEYHAN/Adana",
          email: "duzovaelektriksube@hotmail.com",
          city: "Istanbul",
        },
        {
          id: 3,
          name: "EYMEN TEKNİK",
          address: "Selahattin Eyyübi Kozan Cad. N:385/b",
          location: "YÜREĞİR/Adana",
          email: "eymentehnikadana@hotmail.com",
          city: "Yalova",
        },
        {
          id: 4,
          name: "MUTLU SOĞUTMA",
          address: "Toros Mah. 78024 Sok. No:8/b",
          location: "ÇUKUROVA/Adana",
          email: "mutluklima01@hotmail.com",
          city: "Bursa",
        },
      ]);
  
      const filteredServices = computed(() => {
        return services.value
          .filter(
            (service) =>
              (!selectedOption.value || service.city === selectedOption.value) &&
              service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
          )
          .map((service) => {
            if (service.city === "Istanbul") {
              return { ...service, address: "Istanbul Address", location: "ISTANBUL" };
            } else if (service.city === "Yalova") {
              return { ...service, address: "Yalova Address", location: "YALOVA" };
            } else if (service.city === "Bursa") {
              return { ...service, address: "Bursa Address", location: "BURSA" };
            }
            return service;
          });
      });
  
      const findNearestService = () => {
        alert("Konumunuza izin vererek en yakın servisi bulun!");
      };
  
      const applyToBeAuthorized = () => {
        alert("Yetkili servis olmak için başvuru yapabilirsiniz.");
      };
  
      return {
        searchQuery,
        selectedOption,
        dropdownOptions,
        services,
        filteredServices,
        findNearestService,
        applyToBeAuthorized,
      };
    },
  });
  </script>
  
  <style scoped>
  .service-container {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .search-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-input,
  .dropdown {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .nearest-button,
  .authorized-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .nearest-button:hover,
  .authorized-button:hover {
    background-color: #f8f8f8;
  }
  
  .service-list {
    list-style: none;
    padding: 0;
  }
  
  .service-item {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  </style>
  