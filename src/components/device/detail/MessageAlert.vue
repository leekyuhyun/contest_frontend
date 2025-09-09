<template>
  <div v-if="message" :class="alertClasses" role="alert">
    <i :class="iconClasses"></i>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'MessageAlert',
  props: {
    message: String,
    messageType: String, // 'success' or 'danger'
  },
  computed: {
    alertClasses() {
      return [
        'alert',
        'd-flex',
        'align-items-center',
        'mb-4',
        this.messageType === 'success' ? 'alert-success-custom' : 'alert-danger-custom',
      ]
    },
    iconClasses() {
      return [
        'fas',
        this.messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle',
        'me-2',
      ]
    },
  },
}
</script>

<style scoped>
.alert {
  border-radius: 8px;
  font-weight: 500;
}

.alert-success-custom {
  background-color: #f0fff4;
  color: #2f855a;
  border: 1px solid #9ae6b4;
}

.alert-danger-custom {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
}
</style>
