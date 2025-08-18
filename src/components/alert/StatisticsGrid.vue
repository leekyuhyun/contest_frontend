<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon bg-danger">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.critical }}</h3>
        <p>긴급 상황</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon bg-warning">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.warning }}</h3>
        <p>주의 알림</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon bg-success">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.resolved }}</h3>
        <p>해결된 상황</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon bg-info">
        <i class="fas fa-clock"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.avgResponseTime }}분</h3>
        <p>평균 대응 시간</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsGrid',
  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.stat-info p {
  margin: 0;
  color: #6c757d;
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
