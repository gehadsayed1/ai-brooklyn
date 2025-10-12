<template>
  <section class="bg-gray-50 py-7 font-sans">
    <div class="container mx-auto px-6">
      
      <div class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-primary mb-4">{{ $t('contact.title') }}</h2>
        <p class="text-gray-600 text-lg">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="flex px-2 md:px-0 flex-col md:flex-row justify-center items-center gap-4 mb-14">     
        <a href="https://maps.app.goo.gl/pG7hwb5oKvWVbDtq8" target="_blank"
          class="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full md:w-[250px] h-[140px] justify-center border-2 border-transparent hover:border-primary">
          <div class="text-primary text-2xl mb-2">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <p class="text-gray-800 text-sm font-medium">
            {{ $t('contact.address') }}
          </p>
        </a>

        <!-- Phone Card -->
        <a href="https://wa.me/971567844965"
          target="_blank"
          class="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full md:w-[250px] h-[140px] justify-center border-2 border-transparent hover:border-primary">
          <div class="text-primary text-2xl mb-2">
            <i class="fab fa-whatsapp"></i>
          </div>
          <p class="text-gray-800 text-sm font-medium phone-number">
            +971 567844965
          </p>
        </a>

        <!-- Email Card -->
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ai@brooklynacademy.net&su=Contact%20Request"
          target="_blank"
          class="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full md:w-[250px] h-[140px] justify-center border-2 border-transparent hover:border-primary">
          <div class="text-primary text-2xl mb-2">
            <i class="fas fa-envelope"></i>
          </div>
          <p class="text-gray-800 text-sm font-medium">
            ai@brooklynacademy.net
          </p>
        </a>
      </div>

      <!-- Contact Form -->
      <div class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <form @submit.prevent="submitForm">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <!-- Name -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2" for="name">{{ $t('contact.name') }}</label>
              <div class="relative">
                <i class="fas fa-user absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 text-gray-400"></i>
                <input id="name" v-model="form.name" type="text" required :placeholder="$t('contact.placeholderName')"
                  class="ltr:pl-11 rtl:pr-11 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-gray-700 font-semibold mb-2" for="email">{{ $t('contact.email') }}</label>
              <div class="relative">
                <i class="fas fa-envelope absolute top-1/2 -translate-y-1/2 ltr:left-4 rtl:right-4 text-gray-400"></i>
                <input id="email" v-model="form.email" type="email" required :placeholder="$t('contact.placeholderEmail')"
                  class="ltr:pl-11 rtl:pr-11 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2" for="message">{{ $t('contact.message') }}</label>
            <textarea id="message" v-model="form.message" rows="5" required :placeholder="$t('contact.placeholderMessage')"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"></textarea>
          </div>

          <!-- Submit Button -->
          <div class="text-center flex items-center justify-center ">
            <button type="submit" :disabled="loading"
              class="w-full md:w-60 bg-primary flex items-center justify-center text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
              <span v-if="loading"
                class="loader border-4 border-t-4 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></span>
              <span v-else>{{ $t('contact.send') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Reactive state for the form and loading status
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  message: "",
});

// Function to clear the form fields
const resetForm = () => {
  form.value.name = "";
  form.value.email = "";
  form.value.message = "";
};

// Async function to handle the form submission using EmailJS
const submitForm = async () => {
  loading.value = true;

  try {
    
    const result = await emailjs.send(
      'service_zb5leclz',           
      'YOUR_TEMPLATE_ID',         
      {
        from_name: form.value.name,
        from_email: form.value.email,
        message: form.value.message,
        to_email: 'ai@brooklynacademy.net',  
      },
      'YOUR_PUBLIC_KEY'           
    );

    // Show a success pop-up to the user
    Swal.fire({
      title: t('contact.successTitle'),
      text: t('contact.successText'),
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: t('contact.successButton'),
    });
    
    // Reset the form after successful submission
    resetForm();

  } catch (err) {
    // Show an error pop-up if anything goes wrong
    console.error("Submission Error:", err);
    Swal.fire({
      title: t('contact.errorTitle'),
      text: t('contact.errorText'),
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: t('contact.errorButton'),
    });
  } finally {
    // Stop the loading indicator regardless of the outcome
    loading.value = false;
  }
};
</script>

<style>
/* Make sure you have Font Awesome and a font like Inter/sans-serif included in your project */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

/* Custom loader style */
.loader {
  border-top-color: transparent;
}
</style>
