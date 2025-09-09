<template>
  <div class="timeline-card">
    <div class="panel-header">
      <i class="fas fa-history icon"></i>
      <h3 class="title">상황 타임라인</h3>
    </div>
    <div class="panel-body">
      <div class="timeline-placeholder">
        <p>타임라인 슬라이더 기능 구현 영역</p>
        <span>GPS 데이터 {{ gpsData.length }}개 수신</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineSlider',
  props: { gpsData: { type: Array, default: () => [] } },
}
</script>

<style scoped>
.timeline-card {
  padding: 1.5rem;
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}
.icon {
  font-size: 1.5rem;
  color: #a855f7;
}
.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}
.timeline-placeholder {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  color: #a0aec0;
  border-radius: 8px;
  text-align: center;
}
.timeline-placeholder span {
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
