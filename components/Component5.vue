<template>
    <div class="product-page">
      <!-- Ürün Görselleri Carousel -->
      <div class="image-carousel">
        <div class="carousel">
          <!-- Ana Görsel -->
          <img
            :src="product.images[currentImageIndex]"
            alt="Product Image"
            class="carousel-image"
          />
          <button @click="prevImage" class="carousel-btn prev-btn">‹</button>
          <button @click="nextImage" class="carousel-btn next-btn">›</button>
        </div>
  
        <!-- Küçük Görsel Galerisi -->
        <div class="thumbnail-gallery">
          <img
            v-for="(image, index) in product.images"
            :src="image"
            :key="index"
            :class="{ active: index === currentImageIndex }"
            class="thumbnail"
            @click="currentImageIndex = index"
          />
        </div>
      </div>
  
      <!-- Ürün Detayları -->
      <div class="product-details">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>
  
        <!-- Adet Seçimi -->
        <div class="quantity-selector">
          <label for="quantity">Adet:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            v-model="quantity"
            class="quantity-input"
          />
        </div>
  
        <button @click="addToCart" class="add-to-cart-btn">Sepete Ekle</button>
  
        <div class="shipping-info">
          <p>Gönderim Bilgileri:</p>
          <ul>
            <li v-for="detail in product.shippingDetails" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ProductPage',
    setup() {
      // Ürün verileri
      const product = ref({
        title: 'Karaca Yeni Yıl Kupa Seti',
        price: '699.99 TL',
        description: 'Yılbaşı için mükemmel bir hediye olan şirin kupa seti!',
        images: [
          'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/1/202409/000001000018470001/8683650297727_0.jpg',
          'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/1/202409/000001000018470001/8683650297727-10.jpg',
          'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/1/202409/000001000018470001/8683650297727-2.jpg',
          'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/1/202409/000001000018470001/8683650297727-4.jpg',
        ],
        shippingDetails: [
          'Teslimat 3-12 Aralık tarihleri arasında',
          '1600 TL üzeri siparişlerde kargo bedava',
        ],
      });
  
      // Carousel durumu
      const currentImageIndex = ref(0);
  
      // Carousel kontrolü
      const nextImage = () => {
        currentImageIndex.value =
          (currentImageIndex.value + 1) % product.value.images.length;
      };
  
      const prevImage = () => {
        currentImageIndex.value =
          (currentImageIndex.value - 1 + product.value.images.length) %
          product.value.images.length;
      };
  
      // Sepete ekleme
      const quantity = ref(1);
      const addToCart = () => {
        console.log(
          `${quantity.value} adet "${product.value.title}" sepete eklendi.`
        );
      };
  
      return { product, currentImageIndex, nextImage, prevImage, quantity, addToCart };
    },
  });
  </script>
  
  <style scoped>
  /* Genel Yerleşim */
  .product-page {
    display: flex;
    flex-direction: row;
    padding: 20px;
    font-family: Arial, sans-serif;
    gap: 30px;
  }
  
  /* Carousel */
  .image-carousel {
    flex: 1;
    position: relative;
    max-width: 400px;
  }
  
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 2px solid #ddd;
  }
  
  /* Thumbnail Gallery */
  .thumbnail-gallery {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border: 2px solid #ddd;
    cursor: pointer;
  }
  
  .thumbnail.active {
    border-color: #ff4500;
  }
  
  /* Carousel Buttons */
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 20px;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
  
  /* Ürün Detayları */
  .product-details {
    flex: 2;
  }
  
  .product-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 20px;
    color: #e60000;
    margin-bottom: 10px;
  }
  
  .product-description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  /* Adet Seçimi */
  .quantity-selector {
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .quantity-selector label {
    margin-right: 10px;
  }
  
  .quantity-input {
    width: 60px;
    padding: 5px;
    font-size: 16px;
  }
  
  .add-to-cart-btn {
    background-color: #ff4500;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .shipping-info {
    font-size: 14px;
  }
  
  .shipping-info ul {
    padding-left: 20px;
  }
  </style>
  