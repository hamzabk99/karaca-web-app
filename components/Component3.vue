<template>
  <div class="product-container">
    <div class="product-selection">
      <h2>Ürün Seçimi</h2>
      <div class="product-list">
        <div
          v-for="product in availableProducts"
          :key="product.id"
          class="product-item"
        >
          <img :src="product.image" alt="product.name" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ formatPrice(product.price) }} TL</p>
            <button class="add-to-basket" @click="addToBasket(product)">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { collection, getDocs } from 'firebase/firestore';
import { useBasketStore } from '../stores/basketStore'; 
import { formatPrice } from '../utils/helpers'; 
import { firestore } from '../firebase'; 

// Initialize Firebase

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default defineComponent({
  name: 'ProductList',
  setup() {
    // Available products fetched from Firebase
    const availableProducts = ref<Product[]>([]);

    // Initialize the Pinia store
    const basketStore = useBasketStore();

    // Fetch products from Firestore
    onMounted(async () => {
      const productsRef = collection(firestore, 'products');
      const snapshot = await getDocs(productsRef);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      availableProducts.value = products;
    });

    // Add product to the basket using the Pinia store
    const addToBasket = (product: Product) => {
      basketStore.addToBasket(product);
      console.log('Added to basket:', product.name);
    };

    return {
      availableProducts,
      addToBasket,
      formatPrice,
    };
  },
});
</script>

<style scoped>
.product-container {
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
  flex-wrap: wrap;
}

.product-item {
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info h3 {
  font-size: 16px;
  margin: 10px 0;
  color: #333;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
}

.button-container {
  margin-top: auto; /* Push the button to the bottom */
}

.add-to-basket {
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.product-item:hover .add-to-basket {
  opacity: 1;
}

.add-to-basket:hover {
  background-color: black;
  color: white;
}
</style>