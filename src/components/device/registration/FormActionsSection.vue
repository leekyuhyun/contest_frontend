<template>
  <div class="form-actions">
    <button type="submit" class="btn-modern primary" :disabled="isSubmitting || !isFormValid">
      <span v-if="isSubmitting">
        <i class="fas fa-spinner fa-spin"></i>
        등록 중...
      </span>
      <span v-else>
        <i class="fas fa-check-circle"></i>
        기기 등록하기
      </span>
    </button>
    <button type="button" class="btn-modern secondary" @click="$emit('reset')">
      <i class="fas fa-redo"></i>
      입력 내용 초기화
    </button>
  </div>
</template>

<script>
export default {
  name: 'FormActionsSection',
  props: {
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    isFormValid: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['reset'],
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
}

.btn-modern {
  padding: 0.875rem 2rem;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}

.btn-modern.primary {
  background-color: #3182ce;
  color: white;
  border-color: #3182ce;
}

.btn-modern.primary:hover:not(:disabled) {
  background-color: #2b6cb0;
  border-color: #2b6cb0;
}

.btn-modern.primary:disabled {
  background-color: #a0aec0;
  border-color: #a0aec0;
  cursor: not-allowed;
}

.btn-modern.secondary {
  background: #ffffff;
  color: #4a5568;
  border-color: #e2e8f0;
}

.btn-modern.secondary:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
}
</style>
