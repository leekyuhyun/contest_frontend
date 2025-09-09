<template>
  <section class="cta-section py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h2 class="cta-title text-white">민증의 지팡이 통합 관제 시스템</h2>
          <p class="cta-subtitle text-white-50">
            지금 바로 상황판을 확인하고 시민의 안전을 지키세요.
          </p>
          <div class="cta-buttons">
            <router-link to="/alerts" class="btn btn-light btn-lg me-3">
              <i class="fas fa-chart-line me-2"></i>대시보드로 이동
            </router-link>
            <router-link to="/device-list" class="btn btn-outline-light btn-lg">
              <i class="fas fa-list-alt me-2"></i>등록 기기 현황
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
}
</script>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.cta-buttons .btn {
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-title {
    font-size: 2rem;
  }
}
</style>
