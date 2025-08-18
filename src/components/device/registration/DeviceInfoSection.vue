<template>
  <div class="form-section-card device-info">
    <div class="section-header-modern">
      <div class="section-icon-modern device">
        <i class="fas fa-microchip"></i>
      </div>
      <div class="section-content">
        <h3 class="section-title">기기 정보</h3>
        <p class="section-subtitle">등록할 스마트 기기의 기본 정보를 입력하세요</p>
      </div>
    </div>

    <div class="form-group-modern">
      <label class="form-label-modern">
        <i class="fas fa-network-wired"></i>
        맥주소 (MAC Address) <span class="required">*</span>
      </label>
      <div class="input-container">
        <input
          type="text"
          class="form-input-modern"
          :value="macAddress"
          @input="$emit('update:macAddress', $event.target.value)"
          required
          placeholder="예: AA:BB:CC:DD:EE:FF"
        />
        <div class="input-icon">
          <i class="fas fa-network-wired"></i>
        </div>
      </div>
      <div class="form-help">기기의 고유한 맥주소 (자동으로 형식이 맞춰집니다)</div>
      <div v-if="macAddress && !isValidMacAddress" class="validation-message error">
        <i class="fas fa-exclamation-triangle"></i>
        올바른 MAC 주소 형식이 아닙니다
      </div>
      <div v-else-if="macAddress && isValidMacAddress" class="validation-message success">
        <i class="fas fa-check-circle"></i>
        올바른 MAC 주소 형식입니다
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfoSection',
  props: {
    macAddress: {
      type: String,
      required: true,
    },
    isValidMacAddress: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:macAddress'],
}
</script>

<style scoped>
.form-section-card {
  background: #f8f9ff;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e1e8ff;
  transition: all 0.3s ease;
}

.form-section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.1);
}

.device-info {
  border-left: 4px solid #667eea;
}

.section-header-modern {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.section-icon-modern {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
  color: white;
}

.section-icon-modern.device {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.section-content {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #2d3748;
}

.section-subtitle {
  color: #718096;
  margin: 0;
  font-size: 0.95rem;
}

.form-group-modern {
  margin-bottom: 1.5rem;
}

.form-label-modern {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-label-modern i {
  margin-right: 0.5rem;
  color: #667eea;
}

.required {
  color: #e53e3e;
}

.input-container {
  position: relative;
}

.form-input-modern {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input-modern:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1rem;
  pointer-events: none;
}

.form-help {
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.25rem;
}

.validation-message {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.validation-message i {
  margin-right: 0.5rem;
}

.validation-message.success {
  color: #38a169;
}

.validation-message.error {
  color: #e53e3e;
}

@media (max-width: 768px) {
  .section-icon-modern {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }

  .form-section-card {
    padding: 1.5rem;
  }
}
</style>
