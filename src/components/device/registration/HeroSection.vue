<template>
  <div class="hero-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="hero-content text-center mb-5">
            <div class="hero-icon mb-3">
              <i class="fas fa-plus-circle"></i>
            </div>
            <h1 class="hero-title mb-3">신규 기기 등록</h1>
            <p class="hero-subtitle">관리할 새로운 기기의 정보를 입력하여 시스템에 등록합니다.</p>
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
  background-color: #f0f2f5; /* Match parent background */
}

.hero-content {
  color: #2d3748; /* Changed text color to dark */
}

.hero-icon {
  font-size: 3.5rem;
  color: #4a5568; /* Updated icon color */
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #718096; /* Updated subtitle color */
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
}
</style>
