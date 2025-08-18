<template>
  <div class="form-section-card user-info">
    <div class="section-header-modern">
      <div class="section-icon-modern user">
        <i class="fas fa-user"></i>
      </div>
      <div class="section-content">
        <h3 class="section-title">사용자 정보</h3>
        <p class="section-subtitle">기기를 사용할 분의 개인정보를 입력하세요</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-user-circle"></i>
            사용자 이름 <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              type="text"
              class="form-input-modern"
              :value="userInfo.name"
              @input="updateUserInfo('name', $event.target.value)"
              required
              placeholder="예: 홍길동"
              maxlength="50"
            />
            <div class="input-icon">
              <i class="fas fa-user-circle"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-venus-mars"></i>
            성별 <span class="required">*</span>
          </label>
          <div class="select-container">
            <select
              class="form-select-modern"
              :value="userInfo.gender"
              @change="updateUserInfo('gender', $event.target.value)"
              required
            >
              <option value="">선택하세요</option>
              <option value="M">👨 남성</option>
              <option value="F">👩 여성</option>
            </select>
            <div class="select-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-calendar-alt"></i>
            생년월일 <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              type="date"
              class="form-input-modern"
              :value="userInfo.birthDate"
              @input="updateUserInfo('birthDate', $event.target.value)"
              required
              :max="maxBirthDate"
            />
            <div class="input-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div class="form-help" v-if="calculatedAge">현재 나이: {{ calculatedAge }}세</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group-modern">
          <label class="form-label-modern">
            <i class="fas fa-phone"></i>
            연락처 <span class="required">*</span>
          </label>
          <div class="input-container">
            <input
              type="tel"
              class="form-input-modern"
              :value="userInfo.phone"
              @input="updateUserInfo('phone', $event.target.value)"
              required
              placeholder="010-1234-5678"
            />
            <div class="input-icon">
              <i class="fas fa-phone"></i>
            </div>
          </div>
          <div
            v-if="userInfo.phone && !isValidPhoneNumber(userInfo.phone)"
            class="validation-message error"
          >
            <i class="fas fa-exclamation-triangle"></i>
            올바른 전화번호 형식이 아닙니다
          </div>
          <div
            v-else-if="userInfo.phone && isValidPhoneNumber(userInfo.phone)"
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
  name: 'UserInfoSection',
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:userInfo'],
  computed: {
    maxBirthDate() {
      return new Date().toISOString().split('T')[0]
    },
    calculatedAge() {
      if (!this.userInfo.birthDate) return null
      const today = new Date()
      const birthDate = new Date(this.userInfo.birthDate)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
  },
  methods: {
    updateUserInfo(field, value) {
      this.$emit('update:userInfo', { ...this.userInfo, [field]: value })
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

.user-info {
  border-left: 4px solid #4facfe;
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

.section-icon-modern.user {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
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

.input-container,
.select-container {
  position: relative;
}

.form-input-modern,
.form-select-modern {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input-modern:focus,
.form-select-modern:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
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
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }

  .form-section-card {
    padding: 1.5rem;
  }
}
</style>
