<template>
  <div class="card-header-modern">
    <div class="progress-container mb-4">
      <div class="progress-modern">
        <div class="progress-bar-modern" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <div class="progress-text">{{ progressPercentage }}% 완료</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressSection',
  props: {
    progressPercentage: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.card-header-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}

.progress-container {
  position: relative;
}

.progress-modern {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-modern {
  height: 100%;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 10px;
  transition: width 0.6s ease;
  position: relative;
}

.progress-bar-modern::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

.progress-text {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
