<template>
  <div>
    <!-- Navbar يظهر إلا لو الصفحة الحالية ضمن الـ hiddenRoutes -->
    <NaveBar v-if="showLayout" />

    <router-view />

    <!-- Footer يظهر إلا لو الصفحة الحالية ضمن الـ hiddenRoutes -->
    <Footer v-if="showLayout" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"
import Footer from './components/Footer.vue'
import NaveBar from './components/NaveBar.vue'

const route = useRoute()


const hiddenRoutes = ["/business-instructor"]

const showLayout = computed(() => !hiddenRoutes.includes(route.path))
</script>
