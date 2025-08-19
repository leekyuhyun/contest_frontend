<template>
  <header class="modern-header">
    <div class="header-container">
      <!-- Modern logo section with updated branding -->
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">🛡️</div>
          <span class="logo-text">The Cane of Minjeung</span>
        </router-link>
      </div>

      <!-- Mobile menu toggle button -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Modern navigation with responsive design -->
      <nav class="main-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeMobileMenu">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register-device" class="nav-link" @click="closeMobileMenu"
              >기기 등록</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/device-list" class="nav-link" @click="closeMobileMenu"
              >등록 기기 목록</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/monitoring" class="nav-link" @click="closeMobileMenu"
              >모니터링</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/alerts" class="nav-link" @click="closeMobileMenu"
              >상황 알림 대시보드</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMobileMenuOpen: false,
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
  },
}
</script>

<style scoped>
.modern-header {
  background: var(--background, #ffffff);
  border-bottom: 1px solid var(--border, #e5e7eb);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--foreground, #4b5563);
  font-weight: 700;
  font-size: 1.25rem;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  color: var(--primary, #0891b2);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.25rem;
}

.mobile-menu-toggle span {
  width: 24px;
  height: 2px;
  background: var(--foreground, #4b5563);
  transition: all 0.3s ease;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.main-nav {
  display: flex;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: var(--muted-foreground, #4b5563);
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary, #0891b2);
}

.nav-link.router-link-active {
  color: var(--primary, #0891b2);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary, #0891b2);
}

.user-section {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--background, #ffffff);
    border-top: 1px solid var(--border, #e5e7eb);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .main-nav.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    gap: 0;
    padding: 1rem;
  }

  .nav-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border, #e5e7eb);
  }

  .nav-item:last-child .nav-link {
    border-bottom: none;
  }
}
</style>
