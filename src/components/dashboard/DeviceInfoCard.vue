<template>
  <div class="device-info-section">
    <div class="info-card">
      <div class="card-header">
        <div class="header-flex">
          <h3 class="h5 mb-0">
            <i class="fas fa-user-shield me-2"></i>
            기기 정보
          </h3>
          <button class="btn btn-danger btn-sm end-situation-btn" @click="$emit('endSituation')" :disabled="loading">
            <i class="fas fa-stop-circle me-2"></i>
            상황 종료
          </button>
        </div>
      </div>

      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
          <p class="mt-2">기기 정보를 불러오는 중...</p>
        </div>

        <div v-else-if="deviceInfo" class="device-details">
          <div class="info-row">
            <span class="label">이름:</span>
            <span class="value">{{ deviceInfo.name }}</span>
          </div>
          <div class="info-row">
            <span class="label">연락처:</span>
            <span class="value">{{ deviceInfo.phone }}</span>
          </div>
          <div class="info-row">
            <span class="label">보호자 이름:</span>
            <span class="value">{{ deviceInfo.guardian_name }}</span>
          </div>
          <div class="info-row">
            <span class="label">보호자 연락처:</span>
            <span class="value">{{ deviceInfo.guardian_phone }}</span>
          </div>

        </div>

        <div v-else class="alert alert-warning">
          <i class="fas fa-exclamation-triangle me-2"></i>
          <div v-if="errorMessage">{{ errorMessage }}</div>
          <div v-else>기기 정보를 불러올 수 없습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfoCard',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    deviceInfo: {
      type: Object,
      default: null,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['endSituation'],
}
</script>

<style scoped>
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.end-situation-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
  transition: all 0.3s ease;
}

.end-situation-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
}

.card-body {
  padding: 30px;
}

.device-details {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr;
  gap: 1rem;
}

.info-row {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 15px 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  white-space: nowrap;
  min-width: 0;
}

.label {
  font-weight: 600;
  color: #555;
  min-width: 80px;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #2c3e50;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.emergency-time {
  color: #e74c3c !important;
  font-weight: 700;
}

.location-address {
  color: #2980b9 !important;
  font-weight: 700;
}

@media (max-width: 768px) {
  .header-flex {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .device-details {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .value {
    text-align: left;
  }
}
</style>
