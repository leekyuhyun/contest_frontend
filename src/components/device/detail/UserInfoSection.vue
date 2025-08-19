<template>
  <div class="info-section">
    <h5 class="section-title">사용자 정보</h5>
    <!-- Changed from Bootstrap rows/cols to CSS Grid 2x2 layout -->
    <div class="grid-2x2">
      <div class="form-group">
        <label for="userName" class="form-label">사용자 이름</label>
        <!-- Made user name field read-only like MAC address and device ID -->
        <input
          type="text"
          class="form-control readonly-field"
          id="userName"
          :value="device.name"
          readonly
          placeholder="예: 홍길동"
        />
        <div class="form-text text-muted">* 이름은 수정할 수 없습니다.</div>
      </div>
      <div class="form-group">
        <label for="gender" class="form-label">성별</label>
        <select
          class="form-select"
          id="gender"
          :value="device.gender"
          @change="$emit('update:gender', $event.target.value)"
          required
        >
          <option value="">선택</option>
          <option value="M">남성</option>
          <option value="F">여성</option>
        </select>
      </div>
      <div class="form-group">
        <label for="birthDate" class="form-label">생년월일</label>
        <input
          type="date"
          class="form-control"
          id="birthDate"
          :value="device.birth_date"
          @input="$emit('update:birthDate', $event.target.value)"
          required
        />
        <div class="form-text text-muted">* YYYY-MM-DD 형식으로 입력</div>
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">연락처</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          :value="device.phone"
          @input="$emit('update:phone', $event.target.value)"
          required
          placeholder="예: 010-1234-5678"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoSection',
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:gender', 'update:birthDate', 'update:phone'],
}
</script>

<style scoped>
.info-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  border-left: 4px solid #667eea;
}

.section-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.form-control,
.form-select {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

/* Added CSS Grid 2x2 layout styles */
.grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

/* Added responsive behavior for mobile */
@media (max-width: 768px) {
  .grid-2x2 {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}

/* Added styling for read-only fields */
.readonly-field {
  background-color: #f8f9fa !important;
  color: #6c757d;
  cursor: not-allowed;
}

.readonly-field:focus {
  border-color: #e9ecef !important;
  box-shadow: none !important;
}
</style>
