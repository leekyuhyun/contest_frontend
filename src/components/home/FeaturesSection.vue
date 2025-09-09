<template>
  <section class="features-section py-5">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="section-title">주요 기능</h2>
          <p class="section-subtitle">첨단 기술로 신속하고 정확한 대응을 지원합니다.</p>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-md-4" v-for="(feature, index) in features" :key="index">
          <div class="feature-card h-100" :class="`feature-${index + 1}`">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <div class="feature-content">
              <h5 class="feature-title">{{ feature.title }}</h5>
              <p class="feature-description">{{ feature.description }}</p>
              <ul class="feature-list">
                <li v-for="item in feature.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        {
          icon: 'fas fa-satellite-dish text-success',
          title: '실시간 관제',
          description: '등록된 기기로부터 24시간 데이터를 수신하여 위험 징후를 즉시 포착합니다.',
          items: ['위치 정보 수집', '음성 데이터 분석', '이상 패턴 감지'],
        },
        {
          icon: 'fas fa-brain text-info',
          title: 'AI 기반 상황 분석',
          description: '인공지능이 데이터를 종합 분석하여 상황의 위험도를 정확하게 판단합니다.',
          items: ['음성 텍스트 변환(STT)', '상황 판단(LLM)', '위험도 등급 분류'],
        },
        {
          icon: 'fas fa-siren-on text-danger',
          title: '관계기관 대응',
          description:
            '위험 상황 발생 시 담당자와 관계기관에 통보하여 신속한 초동 대응을 지원합니다.',
          items: ['상황 전파', '보호자 알림', '초동 대응 지원'],
        },
      ],
    }
  },
}
</script>

<style scoped>
.features-section {
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 0;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f8f9fa;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.feature-1 .feature-icon {
  background: rgba(40, 167, 69, 0.1);
}
.feature-2 .feature-icon {
  background: rgba(23, 162, 184, 0.1);
}
.feature-3 .feature-icon {
  background: rgba(220, 53, 69, 0.1);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-description {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  color: #495057;
  position: relative;
  padding-left: 1.5rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>
