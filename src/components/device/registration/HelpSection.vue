<template>
  <div class="help-section">
    <div class="help-header">
      <i class="fas fa-question-circle"></i>
      <h4>등록 도움말</h4>
    </div>
    <div class="help-content">
      <div class="help-item">
        <i class="fas fa-check"></i>
        <span>모든 필수 항목(*)을 입력해주세요</span>
      </div>
      <div class="help-item">
        <i class="fas fa-check"></i>
        <span>맥주소는 기기 설정에서 확인할 수 있습니다</span>
      </div>
      <div class="help-item">
        <i class="fas fa-check"></i>
        <span>사용자 이름은 기기를 사용하는 분의 실명을 입력하세요</span>
      </div>
      <div class="help-item">
        <i class="fas fa-check"></i>
        <span>보호자 연락처는 응급상황 시 사용됩니다</span>
      </div>
      <div class="help-item">
        <i class="fas fa-check"></i>
        <span>등록 후 기기 목록에서 정보를 수정할 수 있습니다</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpSection',
}
</script>

<style scoped>
.help-section {
  background: #f7fafc; /* Changed from gradient to solid color */
  border-radius: 12px;
  padding: 1.5rem; /* Adjusted padding */
  margin-top: 3rem;
  border: 1px solid #e2e8f0;
}

.help-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem; /* Adjusted margin */
}

.help-header i {
  color: #4299e1; /* Updated icon color */
  font-size: 1.1rem;
}

.help-header h4 {
  margin: 0;
  color: #2d3748;
  font-weight: 600; /* Adjusted font-weight */
  font-size: 1.1rem;
}

.help-content {
  display: grid;
  gap: 0.75rem;
}

.help-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4a5568;
}

.help-item i {
  color: #38a169;
  font-size: 0.875rem;
}
</style>
