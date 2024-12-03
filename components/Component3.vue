<template>
    <div class="cart-container">
      <!-- Product Selection -->
      <div class="product-selection">
        <h2>Ürün Seçimi</h2>
        <div class="product-list">
          <div
            v-for="(product, index) in availableProducts"
            :key="product.id"
            class="product-item"
          >
            <img :src="product.image" alt="product.name" class="product-image" />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ formatPrice(product.discountedPrice) }} TL</p>
              <button @click="addToCart(index)">Sepete Ekle</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Cart Section -->
      <div class="cart-content">
        <!-- Left: Cart Items -->
        <div class="cart-items">
          <h1>Sepetim ({{ items.length }} Ürün)</h1>
          <div v-for="(item, index) in items" :key="item.id" class="cart-item">
            <div class="item-details">
              <img :src="item.image" alt="item.name" class="item-image" />
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.deliveryDate }}</p>
              </div>
            </div>
            <div class="item-actions">
              <div class="item-quantity">
                <button @click="decreaseQuantity(index)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
              <div class="item-price">{{ formatPrice(item.discountedPrice) }} TL</div>
              <button class="delete-button" @click="removeItem(index)">🗑️</button>
            </div>
          </div>
        </div>
  
        <!-- Right: Order Summary -->
        <div class="order-summary">
          <h2>Sipariş Özeti</h2>
          <p>Ara Toplam: {{ formatPrice(subtotal) }} TL</p>
          <p>Kargo Bedava: {{ shippingCost === 0 ? '-0 TL' : formatPrice(shippingCost) + ' TL' }}</p>
          <p>Ücretsiz Kargo: {{ subtotal >= freeShippingThreshold ? '-59.99 TL' : 'Geçerli değil' }}</p>
          <h3>Toplam: {{ formatPrice(total) }} TL</h3>
          <button class="checkout-button">Ödeme Adımına Geç</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  interface Product {
    id: number;
    name: string;
    image: string;
    deliveryDate: string;
    price: number;
    discountedPrice: number;
  }
  
  interface CartItem extends Product {
    quantity: number;
  }
  
  export default defineComponent({
    name: 'Cart',
    setup() {
      // Available products to add
      const availableProducts = ref<Product[]>([
        {
          id: 1,
          name: 'Tencere Seti - 7 Parça',
          image: 'https://cdn.karaca.com/rcman/cw695h695q90gm/image/banner/karaca/urun/urun2/urun3/153.09.01.3563-121.jpg',
          deliveryDate: '03 - 12 Aralık tarihleri arasında kargoda.',
          price: 3999,
          discountedPrice: 3499,
        },
        {
          id: 2,
          name: 'Nevresim Takımı Mint',
          image: 'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/1/202304/200.22.08.0034/8680214328521-1.jpg',
          deliveryDate: '03 - 12 Aralık tarihleri arasında kargoda.',
          price: 999.99,
          discountedPrice: 799.99,
        },
        {
          id: 3,
          name: 'Karaca Pro Multimax 6 in 1',
          image: 'https://cdn.karaca.com/rcman/cw695h695q90gm/image/cdndata/185/202309/153.09.01.4348/8683650198567-1.jpg',
          deliveryDate: '03 - 12 Aralık tarihleri arasında kargoda.',
          price: 2500,
          discountedPrice: 1999,
        },
      ]);
  
      // Cart items
      const items = ref<CartItem[]>([]);
  
      // Free shipping threshold
      const freeShippingThreshold = 3000;
  
      // Computed properties
      const subtotal = computed(() =>
        items.value.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
      );
      const shippingCost = computed(() =>
        subtotal.value >= freeShippingThreshold ? 0 : 59.99
      );
      const total = computed(() => subtotal.value + shippingCost.value);
  
      // Methods
      const addToCart = (index: number) => {
        const product = availableProducts.value[index];
        const existingItem = items.value.find((item) => item.id === product.id);
  
        if (existingItem) {
          existingItem.quantity++;
        } else {
          items.value.push({ ...product, quantity: 1 });
        }
      };
  
      const increaseQuantity = (index: number) => {
        items.value[index].quantity++;
      };
  
      const decreaseQuantity = (index: number) => {
        if (items.value[index].quantity > 1) {
          items.value[index].quantity--;
        }
      };
  
      const removeItem = (index: number) => {
        items.value.splice(index, 1);
      };
  
      const formatPrice = (price: number) => price.toFixed(2);
  
      return {
        availableProducts,
        items,
        subtotal,
        shippingCost,
        total,
        freeShippingThreshold,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        formatPrice,
      };
    },
  });
  </script>
  
  <style scoped>
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Arial, sans-serif;
    width: 90%;
    margin: 0 auto;
  }
  
  .product-selection {
    margin-bottom: 20px;
  }
  
  .product-list {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
  }
  
  .product-item {
    width: 200px;
    text-align: center;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
  }
  
  .product-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .product-info h3 {
    font-size: 16px;
    margin: 10px 0;
  }
  
  .product-info p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .product-info button {
    background-color: #000;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .cart-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .cart-items {
    width: 65%;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
  }
  
  .item-details {
    display: flex;
    align-items: center;
    width: 70%;
  }
  
  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
  }
  
  .item-quantity button {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
  
  .item-price {
    font-weight: bold;
    margin-left: 10px;
  }
  
  .delete-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .order-summary {
    width: 30%;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .order-summary h2,
  .order-summary h3 {
    margin-bottom: 15px;
  }
  
  .order-summary p {
    margin: 10px 0;
  }
  
  .checkout-button {
    display: block;
    width: 100%;
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
  