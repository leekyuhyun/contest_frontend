<template>
  <div class="info-section">
    <h5 class="section-title">기기 정보</h5>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="deviceId" class="form-label">기기 ID</label>
        <input type="text" class="form-control" id="deviceId" :value="device.id" disabled />
        <div class="form-text text-muted">* 기기 ID는 수정할 수 없습니다.</div>
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
        <div class="form-text text-muted">* 맥주소는 수정할 수 없습니다.</div>
      </div>
    </div>
    <!-- Removed user name field as it belongs in UserInfoSection -->
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
  emits: [],
}
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: white;
  margin-right: 1rem;
}

.device-icon {
  background-color: #4299e1;
}
.user-icon {
  background-color: #38b2ac;
}
.guardian-icon {
  background-color: #ed8936;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.detail-item {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  flex-basis: 120px;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
}

.detail-value {
  color: #4a5568;
}

.mac-address {
  font-family: 'Courier New', Courier, monospace;
  background-color: #edf2f7;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-control-modern {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control-modern:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-custom {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.btn-edit {
  background-color: #3182ce;
  border-color: #3182ce;
  color: white;
}

.btn-edit:hover {
  background-color: #2b6cb0;
}

.btn-save {
  background-color: #38a169;
  border-color: #38a169;
  color: white;
}
.btn-save:hover {
  background-color: #2f855a;
}

.btn-cancel {
  background-color: #ffffff;
  color: #4a5568;
  border-color: #e2e8f0;
}
.btn-cancel:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

/* 반응형 스타일 */
@media (max-width: 576px) {
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .detail-label {
    flex-basis: auto;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
    color: #718096;
  }
  .actions {
    flex-direction: column;
  }
  .btn-custom {
    width: 100%;
  }
}
</style>
