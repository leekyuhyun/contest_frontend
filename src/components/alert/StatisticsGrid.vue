<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon total"><i class="fas fa-bullhorn"></i></div>
      <div class="stat-content">
        <p class="stat-label">총 발생 상황</p>
        <p class="stat-value">{{ total }}</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon danger"><i class="fas fa-biohazard"></i></div>
      <div class="stat-content">
        <p class="stat-label">위험</p>
        <p class="stat-value">{{ dangerCount }}</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon warning"><i class="fas fa-exclamation-circle"></i></div>
      <div class="stat-content">
        <p class="stat-label">경고</p>
        <p class="stat-value">{{ warningCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsGrid',
  props: {
    alerts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // alerts prop을 기반으로 통계치를 계산
    total() {
      return this.alerts.length
    },
    dangerCount() {
      return this.alerts.filter(a => a.status === 'DANGER').length
    },
    warningCount() {
      return this.alerts.filter(a => a.status === 'WARNING').length
    },
  },
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.stat-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}
.total {
  background-color: #4299e1;
}
.danger {
  background-color: #ef4444;
}
.warning {
  background-color: #f59e0b;
}
.stat-label {
  margin: 0;
  font-size: 0.9rem;
  color: #718096;
}
.stat-value {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
}
@media (max-width: 768px) {
  .stats-grid {
    gap: 1rem;
  }
  .stat-card {
    padding: 1rem;
  }
}
</style>
