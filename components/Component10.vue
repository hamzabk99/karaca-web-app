<script setup lang="ts">
import { ref } from "vue";

// Reactive data for gift amounts and selection
const amounts = ref<number[]>([1000, 1500, 2000, 2500, 3000]);
const selectedAmount = ref<number | null>(null);
const customAmount = ref<number | null>(null);
const customAmountSelected = ref<boolean>(false);

// Function to select predefined amounts
const selectAmount = (amount: number) => {
  selectedAmount.value = amount;
  customAmount.value = null;
  customAmountSelected.value = false;
};

// Function to handle gift card submission
const sendGiftCard = () => {
  const amount = customAmount.value || selectedAmount.value;
  if (amount) {
    alert(`Hediye kartı gönderiliyor: ${amount} TL`);
  } else {
    alert("Lütfen bir miktar seçin!");
  }
};
</script>

<template>
  <div class="gift-card-container">
    <div class="content">
      <div class="text-section">
        <h1>Karaca Hediye Kartı</h1>
        <p>
          Bazı hediyelerin yeri başka, diğer tüm hediyeler için Karaca! <br />
          Sevdiklerinize Karaca Hediye Kartı hediye edin, kendi hediyesini kendisi seçsin!
        </p>
        <button class="balance-button">Hediye Kartı Bakiye Sorgulama</button>

        <div class="gift-amount">
          <h3>Hediye Baremi Seçiniz</h3>
          <div class="amount-buttons">
            <button
              v-for="(amount, index) in amounts"
              :key="amount"
              :class="{ selected: selectedAmount === amount }"
              @click="selectAmount(amount)"
            >
              {{ amount }} TL
            </button>
            <button
              :class="{ selected: customAmountSelected }"
              @click="customAmountSelected = true"
            >
              Miktar Belirle
            </button>
          </div>
          <input
            v-if="customAmountSelected"
            type="number"
            v-model="customAmount"
            placeholder="Miktar Girin"
            class="custom-input"
          />
        </div>

        <button class="send-button" @click="sendGiftCard">
          Hediye Gönder
        </button>

        <div class="info-box">
          Hediye gönder butonuna bastığınızda karşınıza adres ve ödeme bilgilerinizi doldurarak hediye kartı işlemlerinizi tamamlayabileceğiniz ekran gelecek
        </div>
      </div>

      <div class="image-section">
        <img src="https://cdn.karaca.com/image/cdndata/1/202102/200.77.10.0605/8680214160770-1322.jpg" alt="Hediye Kartı Görseli" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gift-card-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-section {
  flex: 1;
  text-align: center;
}

.image-section {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.image-section img {
  max-width: 350px;
  border-radius: 10px;
}

.balance-button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.gift-amount {
  margin-top: 20px;
}

.amount-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.amount-buttons button,
.send-button {
  flex: 1 1 calc(30% - 10px);
  max-width: calc(30% - 10px);
  padding: 15px 15px;
  border: 1px solid #000000;
  background: white;
  color: #000000;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

button.selected {
  background: #000000;
  color: white;
}

.custom-input {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
}

.info-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff9c4;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.send-button {
  margin-top: 20px;
}

.info {
  font-size: 0.9rem;
  color: gray;
  margin-top: 10px;
}
</style>
