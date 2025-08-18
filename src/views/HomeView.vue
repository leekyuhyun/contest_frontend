<template>
  <main class="home-container">
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <CtaSection />
  </main>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorksSection.vue'
import CtaSection from '@/components/home/CtaSection.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    CtaSection,
  },
}
</script>

<style scoped>
.home-container {
  overflow-x: hidden;
}
</style>
