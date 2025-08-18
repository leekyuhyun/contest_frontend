<template>
  <div class="info-section">
    <h5 class="section-title">보호자 정보</h5>
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="guardianName" class="form-label">보호자 이름</label>
        <input
          type="text"
          class="form-control"
          id="guardianName"
          :value="device.guardian_name"
          @input="$emit('update:guardianName', $event.target.value)"
          required
        />
      </div>
      <div class="col-md-4 mb-3">
        <label for="guardianRelation" class="form-label">보호자 관계</label>
        <input
          type="text"
          class="form-control"
          id="guardianRelation"
          :value="device.guardian_relation"
          @input="$emit('update:guardianRelation', $event.target.value)"
          required
          placeholder="예: 부, 모, 자녀"
        />
      </div>
      <div class="col-md-4 mb-3">
        <label for="guardianPhone" class="form-label">보호자 연락처</label>
        <input
          type="tel"
          class="form-control"
          id="guardianPhone"
          :value="device.guardian_phone"
          @input="$emit('update:guardianPhone', $event.target.value)"
          required
          placeholder="예: 010-9876-5432"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuardianInfoSection',
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:guardianName', 'update:guardianRelation', 'update:guardianPhone'],
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

.form-control {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style>
