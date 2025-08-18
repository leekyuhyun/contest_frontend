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
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}

.btn-modern.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-modern.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-modern.primary:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
}

.btn-modern.secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.btn-modern.secondary:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
}
</style>
