import { defineStore } from 'pinia';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface BasketItem {
  product: Product;
  quantity: number;
}

export const useBasketStore = defineStore('basket', {
  state: () => ({
    items: [] as BasketItem[],
  }),
  getters: {
    subtotal(state) {
      return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    shippingCost(): number {
      return this.subtotal >= 300 ? 0 : 59.99;
    },
    total(): number {
      return this.subtotal + this.shippingCost;
    },
  },
  actions: {
    addToBasket(product: Product) {
      const existingItem = this.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      console.log('Added to basket:', product.name);
      console.log('Updated items:', this.items);
    },
    increaseQuantity(index: number) {
      console.log('Increasing quantity for item at index:', index);
      this.items[index].quantity++;
      console.log('Updated items:', this.items);
    },
    decreaseQuantity(index: number) {
      if (this.items[index].quantity > 1) {
        console.log('Decreasing quantity for item at index:', index);
        this.items[index].quantity--;
        console.log('Updated items:', this.items);
      }
    },
    removeFromBasket(index: number) {
      console.log('Removing item at index:', index);
      this.items.splice(index, 1);
      console.log('Updated items:', this.items);
    },
    clearBasket() {
      console.log('Clearing basket');
      this.items = [];
    },
  },
});