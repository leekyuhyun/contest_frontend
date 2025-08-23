<template>
  <div :class="['alert-card', `alert-${alert.status === 'WARNING' ? 'warning' : 'danger'}`]">
    <div class="alert-header">
      <div class="alert-info">
        <i :class="getAlertIcon(alert.status)" class="alert-icon"></i>
        <div class="alert-details">
          <h5 class="alert-title">{{ `기기 소지자에게 ${alert.status === 'WARNING' ? '경고' : '위험'} 상황이 발생했습니다` }}</h5>
          <!-- <p class="alert-description">{{ alert.description }}</p> -->
        </div>
      </div>
      <span class="alert-time">{{ formatTime(alert.created_at) }}</span>
    </div>

    <div v-if="alert" class="alert-device-info">
      <div class="device-details">
        <span><strong>이름:</strong> {{ alert.name }}</span>
        <span><strong>연락처:</strong> {{ alert.phone }}</span>
        <span><strong>보호자:</strong> {{ alert.guardian_name }}</span>
        <span><strong>보호자 연락처:</strong> {{ alert.guardian_phone }}</span>
        <span><strong>기기 식별자:</strong> {{ alert.mac_addr }}</span>
        <span><strong>AI 추론 횟수:</strong> {{ alert.ai_inference_count }}회</span>
        <span></span>
        <span><strong>보호자와의 관계:</strong> {{ alert.guardian_relation }}</span>
      </div>
    </div>
    <div class="alert-actions">
      <div class="action-buttons">
        <button class="btn btn-warning btn-sm me-2" @click="$emit('route', alert.mac_addr)">
          <i class="fas fa-external-link-alt me-1"></i>
          모니터링
        </button>
        <!-- TODO: 상황종료 버튼 만들기 -->
        <!-- 상황종료 버튼 누르면 pop-up 을 통해 재확인후 삭제 -->
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
  emits: ['route'],
  methods: {
    getAlertIcon(status) {
      const icons = {
        danger: 'fas fa-exclamation-triangle text-danger',
        warning: 'fas fa-exclamation-circle text-warning',
      }
      return icons[status] || 'fas fa-bell'
    },
    formatTime(timestamp) {
      const now = new Date()
      const utcDate = new Date(timestamp)
      const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)
      const diff = now - kstDate
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

.alert-danger {
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
  margin-top: 0.8rem;
}

.alert-device-info {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
}

.device-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
