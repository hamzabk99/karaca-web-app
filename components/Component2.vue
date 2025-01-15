<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-sections">
        <div class="footer-row">
          <div
            v-for="(section, index) in sections.slice(0, 4)"
            :key="'row1-' + index"
            class="footer-section"
          >
            <h3>{{ section.name }}</h3>
            <ul>
              <li v-for="(subName, subIndex) in section.subNames" :key="subIndex">
                <!-- Add click handlers for specific links -->
                <a
                  v-if="subName === 'Karaca Hediye Kartı'"
                  href="#"
                  @click.prevent="handleKaracaHediyeKarti"
                >
                  {{ subName }}
                </a>
                <a
                  v-else-if="subName === 'Küçük Ev Aletleri Servis Noktaları'"
                  href="#"
                  @click.prevent="handleKucukEvAletleriServis"
                >
                  {{ subName }}
                </a>
                <a
                  v-else-if="subName === 'Kampanyalar'"
                  href="#"
                  @click.prevent="handleKampanyalar"
                >
                  {{ subName }}
                </a>
                <a
                  v-else-if="subName === 'İletişim'"
                  href="#"
                  @click.prevent="handleIletisim"
                >
                  {{ subName }}
                </a>
                <a v-else href="#">{{ subName }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-row">
          <div
            v-for="(section, index) in sections.slice(4, 8)"
            :key="'row2-' + index"
            class="footer-section"
          >
            <h3>{{ section.name }}</h3>
            <ul>
              <li v-for="(subName, subIndex) in section.subNames" :key="subIndex">
                {{ subName }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-logo">
          <img
            src="https://static.karaca.com/catalog/view/assets/images/logos/karaca.png"
            alt="Logo"
            class="logo-white"
          />
        </div>
        <div class="footer-buttons">
          <button @click="navigateTo('https://www.apple.com/app-store')">App Store</button>
          <button @click="navigateTo('https://play.google.com')">Google Play</button>
          <button @click="navigateTo('https://appgallery.huawei.com')">App Gallery</button>
        </div>
        <div class="social-buttons">
          <a href="https://www.facebook.com/KaracaOnline" target="_blank">
            <img src="https://th.bing.com/th/id/OIP.qAvEb6dwa1l715giSS_qBAHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="Facebook" />
          </a>
          <a href="https://x.com/karacaonline?mx=2" target="_blank">
            <img src="https://th.bing.com/th/id/OIP.STCwkF2-a8qRGpUlOuSVWQHaHY?w=196&h=195&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/karaca/" target="_blank">
            <img src="https://th.bing.com/th/id/OIP.f3uHLlZDDmjWlTixdSXFHAHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/user/KaracaOnline" target="_blank">
            <img src="https://th.bing.com/th/id/OIP.jtp93-fKBruNBEf_A7uJTAHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="YouTube" />
          </a>
        </div>
      </div>

      <div class="footer-copyright">
        © Hamza-Alaa.com
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterComponent',
  data() {
    return {
      sections: [
        {
          name: 'Karaca',
          subNames: ['Hakkımızda', 'Ödüllerimiz', 'İletişim'],
        },
        {
          name: 'Yardım',
          subNames: [
            'Bilgi Toplumu Hizmetleri',
            'Entegre Yönetim Sistemi Politikamız',
            'Küçük Ev Aletleri Servis Noktaları',
          ],
        },
        {
          name: 'Alışveriş',
          subNames: ['Karaca Hediye Kartı', 'Kampanyalar', 'Tüm Markalar'],
        },
        {
          name: 'Kişisel Verilerin Korunması',
          subNames: ['Bilgilendirme', 'Sözleşmeler', 'Çerez Tercihleri'],
        },
        {
          name: 'Popüler Kategoriler',
          subNames: ['Yemek Takımı', 'Kahvaltı Takımı', 'Fincan Takımı'],
        },
        {
          name: 'En Sevilen Kategoriler',
          subNames: ['Robot Süpürge', 'Elektrikli Süpürge', 'Mutfak Robotu'],
        },
        {
          name: 'Özel Sayfalar',
          subNames: ['Anneye Hediye', 'Babaya Hediye', 'Sevgiliye Hediye'],
        },
        {
          name: 'Blog',
          subNames: ['Karaca Blog', 'Yemek Tarifleri', 'Yaşam'],
        },
      ],
    };
  },
  methods: {
    navigateTo(url: string) {
      window.open(url, '_blank');
    },
    // Emit events for specific links
    handleKaracaHediyeKarti() {
      this.$emit('update-middle-component', 'Component10');
    },
    handleKucukEvAletleriServis() {
      this.$emit('update-middle-component', 'Component8');
    },
    handleKampanyalar() {
      this.$emit('update-middle-component', 'Component6');
    },
    handleIletisim() {
      this.$emit('update-middle-component', 'Component7');
    },
  },
});
</script>

<style scoped>
.footer {
  background-color: black;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-sections {
  width: 100%;
  margin-bottom: 20px;
}

.footer-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.footer-section {
  flex: 1;
  margin: 0 10px;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 5px;
}

/* Style for links in the footer */
.footer-section a {
  color: white; /* Change link color to white */
  text-decoration: none; /* Remove underline */
}

.footer-section a:hover {
  color: #ccc; /* Change link color on hover */
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.footer-logo img {
  width: 100px;
  height: auto;
  filter: brightness(0) invert(1);
}

.footer-buttons button {
  background-color: #333;
  color: white;
  border: none;
  margin: 0 10px;
  padding: 10px 15px;
  cursor: pointer;
}

.social-buttons a img {
  width: 30px;
  margin: 0 10px;
}

.footer-copyright {
  font-size: 0.9rem;
  text-align: center;
}
</style>