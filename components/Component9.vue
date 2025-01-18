<template>
  <form @submit.prevent="submitForm">
    <p>
      Aşağıdaki alanlar üzerinden tarafımıza açıklayacağınız kişisel verileriniz Karaca Züccaciye Ticaret ve Sanayi A.Ş. tarafından İletişim Faaliyetlerinin
      Yürütülmesi, Talep / Şikayetlerin Takibi, İş Süreçlerinin İyileştirilmesine Yönelik Önerilerin Alınması Ve Değerlendirilmesi, Mal / Hizmet Satış Sonrası
      Destek Hizmetlerinin Yürütülmesi, Müşteri Memnuniyetine Yönelik Aktivitelerin Yürütülmesi, Müşteri İlişkileri Yönetimi Süreçlerinin Yürütülmesi
      amaçlarıyla işlenecektir. Ayrıntılı bilgiye
      <a href="#">İletişim Formu Aydınlatma Metni</a>'nden ulaşabilirsiniz.
    </p>
    <div>
      <label for="contactChannel">Lütfen İletişim Kanalını Seçiniz *</label>
      <select id="contactChannel" v-model="form.contactChannel" required>
        <option value="" disabled>Lütfen Seçiniz</option>
        <option>kurumsal iletişim</option>
        <option>E-Ticaret iletişim</option>
      </select>
    </div>
    <div>
      <label for="firstName">Adınız *</label>
      <input id="firstName" v-model="form.firstName" type="text" required />
    </div>
    <div>
      <label for="lastName">Soyadınız *</label>
      <input id="lastName" v-model="form.lastName" type="text" required />
    </div>
    <div>
      <label for="email">E-posta Adresiniz *</label>
      <input id="email" v-model="form.email" type="email" required />
    </div>
    <div>
      <label for="phone">Cep Telefonu *</label>
      <input id="phone" v-model="form.phone" type="tel" required />
    </div>
    <div>
      <label for="subject">Konunuz *</label>
      <select id="subject" v-model="form.subject" required>
        <option value="" disabled>Lütfen Seçiniz</option>
        <option>Talep</option>
        <option>Şikayet</option>
        <option>Öneri</option>
      </select>
    </div>
    <div>
      <label for="attachment">Dosya Eki ve Görsel</label>
      <input id="attachment" type="file" @change="handleFileUpload" />
    </div>
    <div>
      <label for="message">Mesajınız *</label>
      <textarea
        id="message"
        v-model="form.message"
        placeholder="Size daha hızlı yardımcı olabilmemiz için mesajınıza yer, zaman, işlem veya sipariş numarası gibi bilgileri ekleyebilirsiniz."
        required
      ></textarea>
    </div>
    <button type="submit">Formu Gönder</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from '../stores/authStore';

export default defineComponent({
  name: "ContactForm",
  setup() {
    const authStore = useAuthStore();
    const form = ref({
      contactChannel: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      attachment: null as File | null,
      message: "",
    });

    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        form.value.attachment = input.files[0];
      }
    };

    const submitForm = async () => {
      if (!authStore.user) {
        alert('Lütfen önce giriş yapın.');
        return;
      }

      const formData = {
        ...form.value,
        attachment: form.value.attachment ? form.value.attachment.name : null,
        userId: authStore.user.uid,
      };

      await authStore.submitForm(formData);
      alert('Form başarıyla gönderildi!');
    };

    return { form, handleFileUpload, submitForm };
  },
});
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}
input,
select,
textarea,
button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  margin-top: 1.5rem;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #444;
}
</style>