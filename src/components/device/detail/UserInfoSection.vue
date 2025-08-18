<template>
  <div class="info-section">
    <h5 class="section-title">사용자 정보</h5>
    <div class="row">
      <div class="col-md-4 mb-3">
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
      <div class="col-md-4 mb-3">
        <label for="birthDate" class="form-label">생년월일</label>
        <input
          type="date"
          class="form-control"
          id="birthDate"
          :value="device.birth_date"
          @input="$emit('update:birthDate', $event.target.value)"
          required
        />
        <div class="form-text text-muted">YYYY-MM-DD 형식으로 입력</div>
      </div>
      <div class="col-md-4 mb-3">
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
</style>
