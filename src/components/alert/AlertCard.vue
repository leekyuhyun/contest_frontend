<template>
  <div :class="['alert-card', `alert-${alert.severity}`]">
    <div class="alert-header">
      <div class="alert-info">
        <i :class="getAlertIcon(alert.severity)" class="alert-icon"></i>
        <div class="alert-details">
          <h5 class="alert-title">{{ alert.title }}</h5>
          <p class="alert-description">{{ alert.description }}</p>
        </div>
      </div>
      <div class="alert-actions">
        <span class="alert-time">{{ formatTime(alert.timestamp) }}</span>
        <div class="action-buttons">
          <button
            v-if="alert.severity === 'critical'"
            class="btn btn-danger btn-sm me-2"
            @click="$emit('emergency-response', alert.macAddress)"
          >
            <i class="fas fa-external-link-alt me-1"></i>
            응급 대응
          </button>
          <button
            class="btn btn-outline-success btn-sm me-2"
            @click="$emit('acknowledge', alert.id)"
            :disabled="alert.acknowledged"
          >
            <i class="fas fa-check me-1"></i>
            {{ alert.acknowledged ? '확인됨' : '확인' }}
          </button>
          <button class="btn btn-outline-secondary btn-sm" @click="$emit('dismiss', alert.id)">
            <i class="fas fa-times me-1"></i>
            해제
          </button>
        </div>
      </div>
    </div>

    <div v-if="alert.deviceInfo" class="alert-device-info">
      <div class="device-details">
        <span><strong>기기:</strong> {{ alert.deviceInfo.name }}</span>
        <span><strong>보호자:</strong> {{ alert.deviceInfo.guardian_name }}</span>
        <span><strong>연락처:</strong> {{ alert.deviceInfo.guardian_phone }}</span>
        <span v-if="alert.location"><strong>위치:</strong> {{ alert.location }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertCard',
  props: {
    alert: {
      type: Object,
      required: true,
    },
  },
  emits: ['acknowledge', 'dismiss', 'emergency-response'],
  methods: {
    getAlertIcon(severity) {
      const icons = {
        critical: 'fas fa-exclamation-triangle text-danger',
        warning: 'fas fa-exclamation-circle text-warning',
      }
      return icons[severity] || 'fas fa-bell'
    },
    formatTime(timestamp) {
      const now = new Date()
      const diff = now - new Date(timestamp)
      const minutes = Math.floor(diff / 60000)

      if (minutes < 1) return '방금 전'
      if (minutes < 60) return `${minutes}분 전`

      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}시간 전`

      const days = Math.floor(hours / 24)
      return `${days}일 전`
    },
  },
}
</script>

<style scoped>
.alert-card {
  border-radius: 12px;
  padding: 20px;
  border-left: 5px solid;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.alert-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.alert-critical {
  background: #fff5f5;
  border-left-color: #dc3545;
}

.alert-warning {
  background: #fffbf0;
  border-left-color: #ffc107;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.alert-info {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.alert-icon {
  font-size: 1.5rem;
  margin-top: 5px;
}

.alert-details h5 {
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #2c3e50;
}

.alert-details p {
  margin: 0;
  color: #6c757d;
  line-height: 1.5;
}

.alert-actions {
  text-align: right;
}

.alert-time {
  display: block;
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.alert-device-info {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.device-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  font-size: 0.9rem;
}

.device-details span {
  color: #495057;
}

@media (max-width: 768px) {
  .alert-header {
    flex-direction: column;
    gap: 15px;
  }

  .alert-actions {
    text-align: left;
    width: 100%;
  }

  .action-buttons {
    justify-content: flex-start;
  }

  .device-details {
    grid-template-columns: 1fr;
  }
}
</style>
