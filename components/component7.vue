<template>
    <div class="container">
     
      <div class="left-column">
        <div class="contact">
          <h3>İletişim</h3>
          <p>
            <strong>Telefon:</strong> {{ contact.phone }}<br />
            <strong>Çalışma saatlerimiz:</strong> {{ contact.workingHours }}
          </p>
          <p>{{ contact.message }}</p>
          <button>{{ contact.buttonText }}</button>
        </div>
  
        <div class="address">
          <h3>Adres</h3>
          <p>
            <strong>{{ address.title }}</strong><br />
            {{ address.details }}
          </p>
          <button>{{ address.mapButtonText }}</button>
        </div>
  
        <div class="service-address">
          <h3>Satış Sonrası Servis Adresi</h3>
          <p>{{ serviceAddress }}</p>
          <button>{{ serviceAddressButton }}</button>
        </div>
      </div>
  
      
      <div class="right-column">
        <div class="trademark">
          <h3>Tescilli Marka Adı</h3>
          <p>
            <strong>İşletme Adı:</strong><br />
            {{ trademark.businessName }}
          </p>
          <br />
          <p>
            <strong>Şirketin Mersis Numarası:</strong><br />
            {{ trademark.mersisNumber }}
          </p>
          <br />
          <p>
            <strong>Ticaret Ünvanı:</strong><br />
            {{ trademark.tradeTitle }}
          </p>
          <br />
          <p>
            <strong>Telefon Numarası:</strong><br />
            {{ trademark.phoneNumber }}
          </p>
          <br />
          <p>
            <strong>KEP Adresi:</strong><br />
            {{ trademark.kepAddress }}
          </p>
          <br />
          <p>
            <strong>E-posta Adresi:</strong><br />
            {{ trademark.email }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "ContactInfo",
    data() {
      return {
        contact: {
          phone: "+90 850 2525 572",
          workingHours: "sabah 09:00 - akşam 20:00",
          message:
            "Değerli Karacasever; Siparişleriniz, ürün ve hizmet bildirimleriniz için formumuzu kullanmanızı rica eder, keyifli günler dileriz.",
          buttonText: "İletişim Formu",
        },
        address: {
          title: "KARACA Headquarters",
          details:
            "KARACA ZÜCCACİYE TİC. VE SAN. A.Ş.\nCumhuriyet Mahallesi Yeni Yol 1 Sk. Now Bomonti Apt. No: 2/12 Şişli/İstanbul\nAdres Kod: 3371525803\nŞişli / Bomonti",
          mapButtonText: "Harita",
        },
        serviceAddress:
          "Ömerli Mahallesi Profesör Mehmet Bozkurt Caddesi No:22\nHadımköy / Arnavutköy / İstanbul",
        serviceAddressButton: "Harita",
        trademark: {
          businessName: "Karaca Züccaciye",
          mersisNumber: "0-5060-0247-6900010",
          tradeTitle: "KARACA ZÜCCACİYE TİC. VE SAN. A.Ş.",
          phoneNumber: "+90 850 2525 572",
          kepAddress: "karacazuccaciye.malilisler@hs03.kep.tr",
          email: "deneyimmerkezi@store-tr.karaca.com",
        },
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    display: flex;
    gap: 20px;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .left-column {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .right-column {
    flex: 1;
    background-color: #f9f9f9;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .contact,
  .address,
  .service-address {
    background-color: #f9f9f9;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .trademark {
    font-size: 1.1rem;
    line-height: 1.8;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    margin: 5px 0;
    color: #555;
    line-height: 1.5;
    white-space: pre-wrap;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: white;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #f0f0f0;
  }
  </style>
  