<template>
  <div class="info-section">
    <h5 class="section-title">기기 정보</h5>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="deviceId" class="form-label">기기 ID</label>
        <input type="text" class="form-control" id="deviceId" :value="device.id" disabled />
        <div class="form-text text-muted">기기 ID는 수정할 수 없습니다.</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="macAddress" class="form-label">맥주소 (MAC Address)</label>
        <input
          type="text"
          class="form-control"
          id="macAddress"
          :value="device.mac_address"
          disabled
        />
        <div class="form-text text-muted">맥주소는 수정할 수 없습니다.</div>
      </div>
    </div>
    <div class="mb-3">
      <label for="deviceName" class="form-label">기기 이름</label>
      <input
        type="text"
        class="form-control"
        id="deviceName"
        :value="device.name"
        @input="$emit('update:name', $event.target.value)"
        required
        placeholder="예: 왕곽봉님 기기"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfoSection',
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:name'],
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

.form-control:disabled {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}
</style>
