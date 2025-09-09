<template>
  <section class="how-it-works-section py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="section-title">대응 프로세스</h2>
          <p class="section-subtitle">3단계로 이루어지는 신속·정확한 대응 시스템</p>
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
          icon: 'fas fa-search-location',
          title: '상황 감지',
          description:
            '등록된 스마트 기기에서 위험 징후 발생 시, 관련 센서 데이터를 즉시 서버로 전송합니다.',
        },
        {
          icon: 'fas fa-cogs',
          title: '상황 분석',
          description:
            '수집된 데이터를 AI가 종합적으로 분석하여 위험 상황 여부와 등급을 판단합니다.',
        },
        {
          icon: 'fas fa-phone-volume',
          title: '상황 전파 및 대응',
          description:
            '분석 결과를 바탕으로 즉시 관계 기관 및 담당자에게 상황을 전파하고 초동 대응을 지원합니다.',
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
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
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
  color: #4a5568;
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
  color: #4a5568;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>
