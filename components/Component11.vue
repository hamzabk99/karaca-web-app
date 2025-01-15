<template>
    <div class="sepet-container">
      <!-- Left Side: Basket Items -->
      <div class="basket-items">
        <h2>Sepetim ({{ basketItems.length }} Ürün)</h2>
        <div class="separator"></div>
        <div class="store-info">
          <span>Karaca tarafından gönderilecektir.</span>
        </div>
        <div class="separator"></div>
        <div v-for="(item, index) in basketItems" :key="item.product.id" class="basket-item">
          <img :src="item.product.image" alt="item.product.name" class="basket-image" />
          <div class="basket-info">
            <h3>{{ item.product.name }}</h3>
            <p>16-19 Ocak tarihleri arasında kargoda</p>
          </div>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(index)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          <button class="delete-button" @click="removeItem(index)">🗑️</button>
        </div>
      </div>
  
      <!-- Right Side: Order Summary -->
      <div class="order-summary">
        <h2>Sipariş Özeti</h2>
        <div class="separator"></div>
        <div class="summary-item">
          <span>Ara Toplam</span>
          <span>{{ formatPrice(subtotal) }} TL</span>
        </div>
        <div class="separator"></div>
        <div class="summary-item">
          <span>Kargo Ücreti</span>
          <span>{{ formatPrice(shippingCost) }} TL</span>
        </div>
        <div class="separator"></div>
        <div class="summary-item total">
          <span>Toplam</span>
          <span>{{ formatPrice(total) }} TL</span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'; // Add computed
  import { useBasketStore } from '../stores/basketStore';
  import { formatPrice } from '../utils/helpers';
  
  export default defineComponent({
    name: 'Component11',
    setup() {
      const basketStore = useBasketStore();
  
      // Use computed properties to ensure reactivity
      const basketItems = computed(() => basketStore.items);
      const subtotal = computed(() => basketStore.subtotal);
      const shippingCost = computed(() => basketStore.shippingCost);
      const total = computed(() => basketStore.total);
  
      const decreaseQuantity = (index: number) => {
        console.log('Decreasing quantity for item at index:', index);
        basketStore.decreaseQuantity(index);
      };
  
      const increaseQuantity = (index: number) => {
        console.log('Increasing quantity for item at index:', index);
        basketStore.increaseQuantity(index);
      };
  
      const removeItem = (index: number) => {
        console.log('Removing item at index:', index);
        basketStore.removeFromBasket(index);
      };
  
      return {
        basketItems,
        subtotal,
        shippingCost,
        total,
        decreaseQuantity,
        increaseQuantity,
        removeItem,
        formatPrice,
      };
    },
  });
  </script>
  
  <style scoped>
  .sepet-container {
    display: flex;
    gap: 20px;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .basket-items {
    flex: 2;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .order-summary {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .separator {
    height: 1px;
    background-color: #ddd;
    margin: 10px 0;
  }
  
  .store-info {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
  }
  
  .basket-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .basket-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 8px;
  }
  
  .basket-info {
    flex: 1;
  }
  
  .basket-info h3 {
    font-size: 16px;
    margin: 0 0 5px 0;
    color: #333;
  }
  
  .basket-info p {
    font-size: 14px;
    margin: 0;
    color: #777;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-controls button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .quantity-controls button:hover {
    background-color: #ddd;
  }
  
  .delete-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #ff4444;
  }
  
  .delete-button:hover {
    color: #cc0000;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    font-size: 14px;
  }
  
  .summary-item.total {
    font-weight: bold;
    font-size: 16px;
  }
  </style>