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
  background-color: #ffffff; /* Removed gradient */
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.progress-container {
  position: relative;
}

.progress-modern {
  height: 8px;
  background: #e2e8f0; /* Lighter background for progress bar */
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-modern {
  height: 100%;
  background-color: #4299e1; /* Changed to solid primary color */
  border-radius: 10px;
  transition: width 0.6s ease;
}

.progress-text {
  text-align: center;
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #4a5568; /* Changed text color */
}
</style>
