<script setup>
import AboutUsSection from "../components/AboutUsSection.vue";
import ContactUssection from "../components/ContactUssection.vue";
// import Footer from "../components/Footer.vue";
import HeroSection from "../components/HeroSection.vue";
import SolutionsSection from "../components/SolutionsSection.vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import WhyChooseUsSection from "../components/WhyChooseUsSection.vue";
// import ProjectsSection from "../components/ProjectsSection.vue";
// import Navbar from "../components/NaveBar.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
//  
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Header -->
  
      <!-- <Navbar /> -->
  

    <!-- Hero Section -->
    <HeroSection id="home"/>

    <div class="w-full max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <!-- How it Works Video -->
        <VideoPlayer 
          videoSrc="https://ik.imagekit.io/ts7pphpbz3/Ai%20Tool%20(2).mp4"
          :title="t('videoSection.howItWorks')"
        />
        
        <!-- Benefits Video -->
        <VideoPlayer 
          videoSrc="https://ik.imagekit.io/lwfhzb5ur/full%20video..mp4"
          :title="t('videoSection.benefits')"
        />
      </div>
    </div>
    <!-- About Us Section -->
    <AboutUsSection />

    <!-- Solutions Section -->
    <SolutionsSection id="solutions"/>
    <!-- Why Choose Us Section -->
  <WhyChooseUsSection id="Choose"/>

    <!-- Projects Section -->
<!-- <ProjectsSection id="projects"/> -->

  

<!-- Contact Us section -->
<ContactUssection id="contact"/>
<!-- Footer -->
<!-- <Footer/> -->






  </div>
</template>

<style scoped>

/* Custom styles if needed */
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.max-w-md {
  max-width: 28rem;
}
</style>
