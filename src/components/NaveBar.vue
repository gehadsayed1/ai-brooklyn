<script setup>
import { useGoogleAnalytics } from "../composables/useGoogleAnalytics";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LangSwitcher from "./LangSwitcher.vue";
import { useI18n } from "vue-i18n";
import { LogIn, LogOut } from "lucide-vue-next";
import { useLoginWithGoogleStore } from "../stores/LoginWithGoogle";
import GoogleLoginModal from "./GoogleLoginModal.vue";

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

const isMenuOpen = ref(false);
const currentSection = ref("#home");
const isLoginPopupOpen = ref(false);
const isLoggingOut = ref(false);
const isUserDropdownOpen = ref(false);

const loginStore = useLoginWithGoogleStore();

// Analytics
const { trackEvent } = useGoogleAnalytics();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    currentSection.value = `#${id}`;
  }
};

const handleLogout = async () => {
  isLoggingOut.value = true;
  isUserDropdownOpen.value = false;

  trackEvent("user_logout", {
    user_id: loginStore.user?.id || "unknown",
  });

  try {
    await loginStore.logout();
  } finally {
    isLoggingOut.value = false;
  }
};

const handleLogoClick = () => {
  if (!loginStore.user) {
    router.push("/");
  }
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const closeUserDropdown = () => {
  isUserDropdownOpen.value = false;
};

const isHomePage = computed(() => route.path === "/");
const isRTL = computed(() => locale.value === 'ar');
const dropdownPositionClass = computed(() => isRTL.value ? '-left-3' : '-right-3');
const dropdownTextAlignClass = computed(() => isRTL.value ? 'text-right' : 'text-left');
const dropdownFlexDirectionClass = computed(() => isRTL.value ? 'flex-row-reverse' : '');

onMounted(() => {
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = `#${section.getAttribute("id")}`;
      }
    });
    if (current) currentSection.value = current;
  });

  // Close user dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-dropdown-container")) {
      isUserDropdownOpen.value = false;
    }
  });

  // Load user if token in URL (for Google login return)
  loginStore.loadUserFromUrl(router);
});
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-white flex px-3 py-2 md:px-10 border-b border-blue-200 md:shadow-lg shadow-2xl items-center justify-between">
    <!-- Logo -->
    <div class="text-lg font-bold flex-shrink-0" :class="loginStore.user ? 'cursor-default' : 'cursor-pointer'">
      <img class="w-24 md:w-35 h-auto" @click="handleLogoClick" src="../assets/logo1.png" alt="Logo" />
    </div>

    <!-- Burger Icon - Only show on home page -->
    <div v-if="isHomePage" class="md:hidden text-gray-400 cursor-pointer ml-2" @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <!-- Menu Items -->
    <ul v-if="isHomePage" :class="[
      'md:flex md:space-x-2 md:static absolute top-full left-0 w-full md:w-auto text-primary md:bg-transparent transition-all duration-300 ease-in-out z-50',
      isMenuOpen ? 'block bg-white shadow-lg' : 'hidden',
    ]">
      <li>
        <button @click="scrollTo('home')" :class="[
          'nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#home' ? 'active text-primary font-bold' : '',
        ]">
          {{ t("nav.home") }}
        </button>
      </li>

      <li>
        <button @click="scrollTo('about')" :class="[
          'nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#about' ? 'active text-primary font-bold' : '',
        ]">
          {{ t("nav.about") }}
        </button>
      </li>

      <li>
        <button @click="scrollTo('solutions')" :class="[
          'nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#solutions'
            ? 'active text-primary font-bold'
            : '',
        ]">
          {{ t("nav.solutions") }}
        </button>
      </li>

      <li>
        <button @click="scrollTo('contact')" :class="[
          'nav-link block md:inline-block p-3 hover:text-primary',
          currentSection === '#contact'
            ? 'active text-primary font-bold'
            : '',
        ]">
          {{ t("nav.contact") }}
        </button>
      </li>
    </ul>

    <!-- Right side -->
    <div class="flex items-center gap-2 md:gap-5 relative flex-shrink-0">
      <LangSwitcher class="ml-1 md:ml-4" />

      <!-- Login button -->
      <button v-if="!loginStore.user" @click="isLoginPopupOpen = true"
        class="focus:outline-none bg-primary flex items-center gap-1 text-white text-xs md:text-base font-semibold py-1.5 px-3 md:px-4 rounded hover:bg-blue-900 cursor-pointer transition transform hover:scale-105">
        <span class="hidden sm:inline">{{ t("nav.login") }}</span>
        <LogIn size="16" class="md:w-[18px] md:h-[18px]" />
      </button>

      <!-- User dropdown -->
      <div v-else class="relative user-dropdown-container">
        <button @click="toggleUserDropdown" class="flex items-center gap-1 md:gap-2 cursor-pointer">
          <img :src="loginStore.user.avatar" alt="avatar" class="w-7 h-7 md:w-8 md:h-8 rounded-full border" />
          <span class="font-semibold text-xs md:text-base hidden sm:inline max-w-[100px] md:max-w-none truncate">{{
            loginStore.user.name }}</span>

          <svg
            :class="['w-3 h-3 md:w-4 md:h-4 text-gray-500 hidden sm:block transition-transform', isUserDropdownOpen ? 'rotate-180' : '']"
            fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown -->
        <div v-show="isUserDropdownOpen"
          :class="['absolute', dropdownPositionClass, 'mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-50']">
          <button @click="handleLogout"
            :class="['flex items-center gap-2 w-full', dropdownTextAlignClass, dropdownFlexDirectionClass, 'text-red-500 px-4 py-2 hover:bg-gray-100 hover:underline cursor-pointer text-sm']">
            <span>{{ t("nav.logout") }}</span>

            <div v-if="isLoggingOut"
              class="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>

            <LogOut v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div v-if="isLoginPopupOpen" class="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
    <GoogleLoginModal :isOpen="isLoginPopupOpen" @close="isLoginPopupOpen = false" />
  </div>
</template>
