<template>
  <section class="bg-gray-50 py-20">
    <div class="container mx-auto px-6">
      <!-- Title -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-primary mb-4">Get in touch!</h2>
        <p class="text-gray-600 text-lg">
          Contact us for a quote, help or to join the team.
        </p>
      </div>

      <div
        class="flex px-2 md:px-0 flex-col md:flex-row justify-center items-center gap-4 mb-14"
      >
        <a
          href="https://maps.app.goo.gl/pG7hwb5oKvWVbDtq8"
          target="_blank"
          class="flex flex-col items-center text-center p-3 rounded-xl bg-white shadow hover:shadow-lg transition cursor-pointer w-full md:w-[200px] h-[120px] justify-center border-2 border-primary"
        >
          <div class="text-primary text-lg mb-1">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <p class="text-gray-800 hover:text-primary transition text-sm">
            Dubai, Deira, Port Said, Golden Business Centre, Office 206
          </p>
        </a>

        <!-- Phone Card -->
        <a
          href="tel:0567844965"
          class="flex flex-col items-center text-center p-3 rounded-xl bg-white shadow hover:shadow-lg transition cursor-pointer w-full md:w-[200px] h-[120px] justify-center border-2 border-primary"
        >
          <div class="text-primary text-lg mb-1">
            <i class="fas fa-phone-alt"></i>
          </div>
          <p class="text-gray-800 hover:text-primary transition text-sm">
            0567844965
          </p>
        </a>

        <!-- Email Card -->
        <a
          :href="`https://mail.google.com/mail/?view=cm&fs=1&to=sherifbrooklyn@gmail.com&su=Contact Request`"
          target="_blank"
          class="flex flex-col items-center text-center p-3 rounded-xl bg-white shadow hover:shadow-lg transition cursor-pointer w-full md:w-[200px] h-[120px] justify-center border-2 border-primary"
        >
          <div class="text-primary text-lg mb-1">
            <i class="fas fa-envelope"></i>
          </div>
          <p class="text-gray-800 hover:text-primary transition text-sm">
            sherifbrooklyn@gmail.com
          </p>
        </a>
      </div>

      <!-- Contact Form -->
      <div class="max-w-4xl mx-auto rounded-2xl px-2 md:px-8">
        <form @submit.prevent="submitForm">
          <div>
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label class="block text-gray-700 font-semibold mb-1"
                  >Your Name</label
                >
                <div class="relative">
                  <i
                    class="fas fa-user absolute top-4 left-4 text-gray-400"
                  ></i>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your Name"
                    class="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-gray-700 font-semibold mb-1"
                  >Mail</label
                >
                <div class="relative">
                  <i
                    class="fas fa-envelope absolute top-4.5 left-4 text-gray-400"
                  ></i>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    class="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-gray-700 font-semibold mb-1"
                >Message</label
              >
              <textarea
                v-model="form.message"
                rows="5"
                required
                placeholder="Write your message here..."
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="mt-6 w-60 mx-auto bg-primary flex items-center justify-center text-white font-bold py-3 rounded-lg hover:bg-primary transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="loading"
              class="loader border-2 border-t-2 border-white rounded-full w-5 h-5 animate-spin"
            ></span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const success = ref(false);
const error = ref("");
const loading = ref(false);
const form = ref({
  date: new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  name: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  loading.value = true;
  success.value = false;
  error.value = "";
  console.log("Form data:", form.value);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzkdD3SXP2KdtahmWxT_W8IPXx5gSKfSstt80iniNjqh-8thablhHYTDunO1ph0Snk/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    if (!response.ok) {
      throw new Error("حصل خطأ أثناء الإرسال");
    }

    success.value = true;
    form.value = {
      date: new Date().toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      name: "",
      email: "",
      message: "",
    };
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
