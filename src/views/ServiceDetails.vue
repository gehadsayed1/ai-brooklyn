<template>
  <section
    class="py-20 px-6 md:px-16 bg-gradient-to-b from-gray-50 to-white text-gray-800"
    :dir="isArabic ? 'rtl' : 'ltr'"
  >
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
      <!-- Left Column: Service Info -->
      <div class="space-y-8">
        <div class="border-b pb-6">
          <h1 class="text-4xl font-bold text-primary mb-4">
            {{ t(`business_ai.services.${serviceKey}.title`) }}
          </h1>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t("services.overview") }}
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ t(`business_ai.services.${serviceKey}.desc`) }}
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="feature in serviceData.features"
            :key="feature"
            class="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100"
          >
            <i class="fas fa-check-circle text-primary"></i>
            <span class="text-gray-700">{{ feature }}</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t("services.benefits") }}
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit1") }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit2") }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit3") }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit4") }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit5") }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <i class="fas fa-star text-primary"></i>
              <span>{{ t("services.benefit6") }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="sticky top-24">
        <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-primary">
              {{ t("payment.title") }}
            </h2>
            <div class="flex gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="Visa"
                class="h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="MasterCard"
                class="h-6"
              />
            </div>
          </div>

          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ t("payment.description") }}
          </p>

          <form @submit.prevent="submitPayment" class="space-y-6">
            <!-- Email -->
            <div>
              <label class="block mb-2 font-medium text-gray-700">
                {{ t("payment.email") }}
              </label>
              <div class="relative">
                <Mail class="absolute left-4 top-3.5 text-gray-400" />
                <input
                  v-model="payment.email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  class="w-full pl-12 pr-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  @blur="validateEmail"
                />
              </div>
         
              <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
                <Lightbulb  size="17" class="text-yellow-500" /> {{ t("payment.emailNote") }}
              </p>
     
              <p v-if="emailError" class="text-red-500 text-sm mt-1">
                {{ t("payment.invalidEmail") }}
              </p>
            </div>

            <!-- Card Number -->
            <div>
              <label class="block mb-2 font-medium text-gray-700">
                {{ t("payment.cardNumber") }}
              </label>
              <div class="relative">
                <i
                  class="fas fa-credit-card absolute left-4 top-3.5 text-gray-400"
                ></i>
                <input
                  v-model="payment.cardNumber"
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  class="w-full pl-12 pr-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <!-- Expiry & CVV -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t("payment.expiry") }}
                </label>
                <input
                  v-model="payment.expiry"
                  type="text"
                  required
                  placeholder="MM/YY"
                  class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block mb-2 font-medium text-gray-700">
                  {{ t("payment.cvv") }}
                </label>
                <input
                  v-model="payment.cvv"
                  type="text"
                  required
                  placeholder="123"
                  class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <!-- Card Holder Name -->
            <div>
              <label class="block mb-2 font-medium text-gray-700">
                {{ t("payment.cardName") }}
              </label>
              <input
                v-model="payment.cardName"
                type="text"
                required
                placeholder="John Doe"
                class="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

        
            <p class="text-lg text-gray-900 text-center flex items-center gap-1 justify-center">
              <Lock size="17" class="text-green-500" /> {{ t("payment.trialNote") }}
            </p>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i class="fas fa-lock"></i>
              {{ t("payment.startTrial") }}
            </button>

            <p
              class="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-2"
            >
              <i class="fas fa-shield-alt text-green-500"></i>
              {{ t("payment.secureNote") }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Lightbulb, Lock, Mail } from "lucide-vue-next";

const { t, locale } = useI18n();
const route = useRoute();
const isArabic = computed(() => locale.value === "ar");
const serviceKey = route.query.service || "";

const payment = ref({
  email: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardName: "",
});

const emailError = ref(false);

function validateEmail() {
  emailError.value =
    payment.value.email.trim() !== "" &&
    !payment.value.email.endsWith("@gmail.com");
}

function submitPayment() {
  validateEmail();
  if (emailError.value) return;

  alert(t("payment.success"));
  payment.value = {
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  };
}

const serviceData = computed(() => {
  return (
    t(`services.${serviceKey}`, { returnObjects: true }) || {
      title: "",
      description: "",
      features: [],
    }
  );
});
</script>

<style scoped>
.bg-primary {
  background-color: var(--color-primary);
}
.text-primary {
  color: var(--color-primary);
}
.border-primary {
  border-color: var(--color-primary);
}
.ring-primary {
  --tw-ring-color: var(--color-primary);
}

html {
  scroll-behavior: smooth;
}

input:focus,
textarea:focus {
  outline: none;
}
</style>
