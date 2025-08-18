<template>
  <div v-if="message" class="message-container mt-4">
    <div
      :class="['message-modern', messageType === 'success' ? 'message-success' : 'message-error']"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageAlert',
  props: {
    message: {
      type: String,
      default: '',
    },
    messageType: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.message-container {
  display: flex;
  justify-content: center;
}

.message-modern {
  padding: 1rem 2rem;
  border-radius: 15px;
  color: white;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  animation: slideInUp 0.3s ease-out;
}

.message-success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.message-error {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
