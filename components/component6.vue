<template>
    <div class="main-container">
      <div class="sidebar">
        <h2>Güncel Kampanyalar</h2>
        <ul>
          <li @click="showCampaign('Tüm Kampanyalar')">Tüm Kampanyalar</li>
          <li @click="showCampaign('Çeyiz Seti Kampanyaları')">Çeyiz Seti Kampanyaları</li>
          <li @click="showCampaign('Ödeme Ayrıcalıkları')">Ödeme Ayrıcalıkları</li>
        </ul>
      </div>
      <div class="content">
        <div v-if="selectedCampaign === 'Tüm Kampanyalar'">
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/forever-bone-web-s-021224.jpg" alt="Image 1" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/all-star-web-slider-101024.jpg" alt="Image 2" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
        </div>
        <div v-if="selectedCampaign === 'Çeyiz Seti Kampanyaları'">
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/senin-secimin-paketi-011024.jpg" alt="Image 3" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/mutlu-evlilik-web-mutlup17.jpg" alt="Image 4" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
        </div>
        <div v-if="selectedCampaign === 'Ödeme Ayrıcalıkları'">
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/krcweb-112.jpg" alt="Image 5" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
          <div class="image-container">
            <img src="https://cdn.karaca.com/image/banner/campaing/sonsuz-mutluluk-web-bride2907.jpg" alt="Image 6" />
            <button @click="startShopping">alışverişe Başla</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'MainComponent',
    setup() {
      const selectedCampaign = ref<string>('');
  
      const showCampaign = (campaign: string) => {
        selectedCampaign.value = campaign;
      };
  
      const startShopping = () => {
        console.log('alışverişe Başla');
      };
  
      return {
        selectedCampaign,
        showCampaign,
        startShopping,
      };
    },
  });
  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    gap: 16px;
  }
  
  .sidebar {
    flex: 1;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .sidebar h2 {
    margin-bottom: 1rem;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: black;
  }
  
  .sidebar li:hover {
    text-decoration: underline;
  }
  
  .content {
    flex: 3;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .image-container {
    width: 15cm;
    height: 5cm;
    text-align: center;
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 8px;
    position: relative;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-container button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 4px 8px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .image-container button:hover {
    background-color: #333;
  }
  </style>