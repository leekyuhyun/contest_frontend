<template>
  <div class="empty-state-container text-center py-5">
    <div class="icon-wrapper mb-3">
      <i class="fas fa-inbox"></i>
    </div>
    <p class="message mb-4">{{ message }}</p>
    <router-link :to="linkTo" class="btn btn-primary-custom">
      <i class="fas fa-plus me-2"></i>{{ linkText }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    message: {
      type: String,
      default: '데이터가 없습니다.',
    },
    linkTo: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.empty-state-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 1px dashed #d3d9e0;
}

.icon-wrapper {
  font-size: 3rem;
  color: #a0aec0;
}

.message {
  font-size: 1.1rem;
  color: #718096;
  font-weight: 500;
}

.btn-primary-custom {
  background-color: #3182ce;
  border-color: #3182ce;
  color: white;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary-custom:hover {
  background-color: #2b6cb0;
  border-color: #2b6cb0;
}
</style>
