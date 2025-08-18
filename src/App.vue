<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader />
    <div class="flex-grow-1">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/layout/Header.vue'
import AppFooter from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>
