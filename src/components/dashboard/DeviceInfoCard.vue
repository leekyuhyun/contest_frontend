<template>
  <div class="device-info-card">
    <div class="panel-header">
      <i class="fas fa-user-circle icon"></i>
      <h3 class="title">사용자 정보</h3>
    </div>
    <div class="panel-body">
      <div class="info-item">
        <span class="label">이름</span>
        <span class="value">{{ device.name }}</span>
      </div>
      <div class="info-item">
        <span class="label">MAC 주소</span>
        <span class="value monospace">{{ device.mac_address }}</span>
      </div>
      <div class="info-item">
        <span class="label">연락처</span>
        <span class="value">{{ device.phone }}</span>
      </div>
      <div class="info-item">
        <span class="label">보호자</span>
        <span class="value">{{ device.guardian_name }} ({{ device.guardian_relation }})</span>
      </div>
      <div class="info-item">
        <span class="label">보호자 연락처</span>
        <span class="value">{{ device.guardian_phone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfoCard',
  props: { device: { type: Object, required: true } },
}
</script>

<style scoped>
.panel-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.icon {
  font-size: 1.2rem;
  color: #4299e1;
}
.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}
.panel-body {
  padding: 1.25rem;
}
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #f8fafc;
}
.info-item:last-child {
  border-bottom: none;
}
.label {
  color: #64748b;
}
.value {
  font-weight: 500;
  color: #334155;
  text-align: right;
}
.monospace {
  font-family: monospace;
}
</style>
