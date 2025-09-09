<template>
  <section class="hero-section">
    <div class="hero-background"></div>
    <div class="container position-relative">
      <div class="row align-items-center min-vh-75">
        <div class="col-lg-6">
          <div class="hero-content">
            <h1 class="hero-title">
              <span class="text-primary">민증의 지팡이</span><br />
              <span class="text-gradient">통합 관제 시스템</span>
            </h1>
            <p class="hero-subtitle">
              AI 기반 실시간 대응으로 시민의 안전을 확보하고<br />
              골든타임을 사수합니다.
            </p>
            <div class="hero-buttons">
              <router-link to="/alerts" class="btn btn-primary btn-lg me-3">
                <i class="fas fa-bell me-2"></i>상황 알림 대시보드
              </router-link>
              <router-link to="/device-list" class="btn btn-outline-primary btn-lg">
                <i class="fas fa-list me-2"></i>등록 기기 목록
              </router-link>
            </div>
            <div class="hero-stats mt-4">
              <div class="row">
                <div class="col-4">
                  <div class="stat-item">
                    <h3 class="stat-number">AI</h3>
                    <p class="stat-label">위험 상황 분석</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <h3 class="stat-number">신속</h3>
                    <p class="stat-label">초동 대응 지원</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <h3 class="stat-number">스마트 장치</h3>
                    <p class="stat-label">안전 장치</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-image">
            <div class="floating-card card-1">
              <i class="fas fa-broadcast-tower text-success"></i>
              <span>실시간 신호 감지</span>
            </div>
            <div class="floating-card card-2">
              <i class="fas fa-cogs text-info"></i>
              <span>AI 데이터 분석</span>
            </div>
            <div class="floating-card card-3">
              <i class="fas fa-bullhorn text-warning"></i>
              <span>신속 전파</span>
            </div>
            <div class="hero-graphic">
              <div class="pulse-circle"></div>
              <div class="pulse-circle pulse-2"></div>
              <div class="pulse-circle pulse-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/placeholder.svg?height=800&width=1200') center/cover;
  opacity: 0.1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.text-gradient {
  background: linear-gradient(45deg, #38b2ac, #81e6d9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons .btn {
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hero-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.hero-stats {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #81e6d9;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
}

.hero-image {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  animation: float 3s ease-in-out infinite;
}

.floating-card i {
  font-size: 1.5rem;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 10%;
  animation-delay: 1s;
}

.card-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 2s;
}

.hero-graphic {
  position: relative;
  width: 200px;
  height: 200px;
}

.pulse-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.pulse-circle:nth-child(1) {
  width: 100px;
  height: 100px;
}
.pulse-2 {
  width: 150px;
  height: 150px;
  animation-delay: 0.5s;
}
.pulse-3 {
  width: 200px;
  height: 200px;
  animation-delay: 1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .floating-card {
    display: none;
  }

  .hero-image {
    height: 300px;
  }
}
</style>
