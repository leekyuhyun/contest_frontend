<template>
  <div class="form-section-card guardian-info">
    <div class="section-header-modern">
      <div class="section-icon-modern guardian">
        <i class="fas fa-shield-alt"></i>
      </div>
      <div class="section-content">
        <h3 class="section-title">보호자 정보</h3>
        <p class="section-subtitle">응급상황 시 연락할 보호자의 정보를 입력하세요</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-user-shield"></i>
            보호자 이름 <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              type="text"
              class="form-input-modern"
              :value="guardianInfo.name"
              @input="updateGuardianInfo('name', $event.target.value)"
              required
              placeholder="김보호"
              maxlength="50"
            />
            <div class="input-icon">
              <i class="fas fa-user-shield"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-heart"></i>
            보호자 관계 <span class="required">*</span>
          </label>
          <div class="select-container">
            <select
              class="form-select-modern"
              :value="guardianInfo.relation"
              @change="updateGuardianInfo('relation', $event.target.value)"
              required
            >
              <option value="">선택하세요</option>
              <option value="부">👨‍👦 부</option>
              <option value="모">👩‍👧 모</option>
              <option value="배우자">💑 배우자</option>
              <option value="자녀">👶 자녀</option>
              <option value="형제자매">👫 형제자매</option>
              <option value="친척">👪 친척</option>
              <option value="기타">🤝 기타</option>
            </select>
            <div class="select-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-phone-alt"></i>
            보호자 연락처 <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              type="tel"
              class="form-input-modern"
              :value="guardianInfo.phone"
              @input="updateGuardianInfo('phone', $event.target.value)"
              required
              placeholder="010-9876-5432"
            />
            <div class="input-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
          </div>
          <div
            v-if="guardianInfo.phone && !isValidPhoneNumber(guardianInfo.phone)"
            class="validation-message error"
          >
            <i class="fas fa-exclamation-triangle"></i>
            올바른 전화번호 형식이 아닙니다
          </div>
          <div
            v-else-if="guardianInfo.phone && isValidPhoneNumber(guardianInfo.phone)"
            class="validation-message success"
          >
            <i class="fas fa-check-circle"></i>
            올바른 전화번호 형식입니다
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuardianInfoSection',
  props: {
    guardianInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:guardianInfo'],
  methods: {
    updateGuardianInfo(field, value) {
      this.$emit('update:guardianInfo', { ...this.guardianInfo, [field]: value })
    },
    isValidPhoneNumber(phone) {
      if (!phone) return false
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
      return phoneRegex.test(phone)
    },
  },
}
</script>

<style scoped>
.form-section-card {
  background: #fdfdff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  transition: border-color 0.3s ease;
}

.form-section-card:focus-within {
  border-color: #4299e1;
}

.device-info {
  border-left: 4px solid #4299e1;
}
.user-info {
  border-left: 4px solid #38b2ac;
}
.guardian-info {
  border-left: 4px solid #ed8936;
}

.section-header-modern {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.section-icon-modern {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
  color: white;
}

.section-icon-modern.device {
  background-color: #4299e1;
}
.section-icon-modern.user {
  background-color: #38b2ac;
}
.section-icon-modern.guardian {
  background-color: #ed8936;
}

.section-content {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2d3748;
}

.section-subtitle {
  color: #718096;
  margin: 0;
  font-size: 0.9rem;
}

.form-group-modern {
  margin-bottom: 1.5rem;
}

.form-label-modern {
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-label-modern i {
  margin-right: 0.5rem;
  color: #a0aec0;
}

.required {
  color: #e53e3e;
  margin-left: 2px;
}

.input-container,
.select-container {
  position: relative;
}

.form-input-modern,
.form-select-modern {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input-modern:focus,
.form-select-modern:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.input-icon,
.select-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1rem;
  pointer-events: none;
  transition: color 0.3s ease;
}

.form-input-modern:focus ~ .input-icon,
.form-select-modern:focus ~ .input-icon {
  color: #4299e1;
}

.select-icon {
  left: auto;
  right: 1rem;
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
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .form-section-card {
    padding: 1.5rem;
  }
}
</style>
