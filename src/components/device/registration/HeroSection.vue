<template>
  <div class="hero-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="hero-content text-center text-white mb-5">
            <div class="hero-icon mb-3">
              <i class="fas fa-plus-circle"></i>
            </div>
            <h1 class="hero-title mb-3">새로운 스마트 기기 등록</h1>
            <p class="hero-subtitle">
              범죄 취약 계층을 위한 안전 기기를 등록하여 더 안전한 환경을 만들어보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
.hero-section {
  padding: 4rem 0 2rem;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

.hero-icon {
  font-size: 4rem;
  opacity: 0.9;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
