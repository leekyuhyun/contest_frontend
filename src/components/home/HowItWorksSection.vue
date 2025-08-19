<template>
  <section class="how-it-works-section py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="section-title">작동 원리</h2>
          <p class="section-subtitle">3단계로 이루어지는 스마트 안전 시스템</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4" v-for="(step, index) in steps" :key="index">
          <div class="step-card text-center">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>
            <h5 class="step-title">{{ step.title }}</h5>
            <p class="step-description">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="step-arrow d-none d-lg-block">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowItWorksSection',
  data() {
    return {
      steps: [
        {
          icon: 'fas fa-search',
          title: '감지',
          description: '스마트 감지 장치로 상황이 발생하면 센서 데이터를 서버로 전송합니다.',
        },
        {
          icon: 'fas fa-cogs',
          title: '분석',
          description: 'AI가 수집된 데이터를 분석하여 위험 상황을 판단합니다.',
        },
        {
          icon: 'fas fa-phone',
          title: '대응',
          description: '위험 감지 시 관계 기관과 보호자에게 알림을 전송합니다.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.how-it-works-section {
  position: relative;
}

.step-card {
  position: relative;
  padding: 2rem 1rem;
}

.step-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1.5rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.step-description {
  color: #6c757d;
  line-height: 1.6;
}

.step-arrow {
  position: absolute;
  top: 50%;
  right: -2rem;
  transform: translateY(-50%);
  font-size: 2rem;
  color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>
