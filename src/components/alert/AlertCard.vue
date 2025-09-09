<template>
  <div class="alert-card" :class="cardStatusClass">
    <div class="card-header">
      <div class="header-left">
        <i
          :class="alert.status === 'DANGER' ? 'fa-biohazard' : 'fa-exclamation-circle'"
          class="fas status-icon"
        ></i>
        <span class="status-text">{{ alert.status === 'DANGER' ? '위험' : '경고' }}</span>
      </div>
      <span class="timestamp">{{ formatTime(alert.created_at) }}</span>
    </div>

    <div class="card-body">
      <div class="user-info">
        <span class="user-name">{{ alert.name }}</span>
        <span class="user-mac">{{ alert.mac_addr }}</span>
      </div>
      <div v-if="alert.situation_labels" class="detected-situation">
        <i class="fas fa-bullseye"></i>
        <strong>탐지된 상황:</strong> {{ alert.situation_labels }}
      </div>
      <div class="contact-info">
        <p><i class="fas fa-phone"></i> {{ alert.phone }}</p>
        <p>
          <i class="fas fa-user-shield"></i> {{ alert.guardian_name }} ({{
            alert.guardian_relation
          }})
        </p>
      </div>
    </div>

    <div class="card-footer">
      <div class="ai-info">
        <i class="fas fa-robot"></i> AI 추론 횟수: {{ alert.ai_inference_count }}회
      </div>
      <button class="btn-monitoring" @click="$emit('route', alert.mac_addr)">
        상세 모니터링 <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertCard',
  props: {
    alert: { type: Object, required: true },
  },
  emits: ['route'],
  computed: {
    cardStatusClass() {
      return this.alert.status === 'DANGER' ? 'status-danger' : 'status-warning'
    },
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      // KST (UTC+9)로 변환
      const kstDate = new Date(date.getTime())
      return kstDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
/* 기존 스타일은 그대로 유지 */
.alert-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  border-left-width: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.alert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
}
.status-danger {
  border-left-color: #ef4444;
}
.status-warning {
  border-left-color: #f59e0b;
}
.status-danger .status-icon,
.status-danger .status-text {
  color: #ef4444;
}
.status-warning .status-icon,
.status-warning .status-text {
  color: #f59e0b;
}

.card-header,
.card-body,
.card-footer {
  padding: 1rem 1.25rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
}
.timestamp {
  font-size: 0.8rem;
  color: #718096;
}

.card-body .user-info {
  margin-bottom: 1rem;
}
.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}
.user-mac {
  font-family: monospace;
  color: #64748b;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
.contact-info p {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.contact-info p + p {
  margin-top: 0.25rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  border-radius: 0 0 12px 12px;
}
.ai-info {
  color: #64748b;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-monitoring {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-monitoring:hover {
  background-color: #2b6cb0;
}

/* ✨ 추가된 스타일 ✨ */
.detected-situation {
  padding: 0.5rem 0.75rem;
  background-color: #f0f2f5; /* 약간의 배경색 추가 */
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2d3748; /* 텍스트 색상 변경 */
  border: 1px solid #e2e8f0;
}

.detected-situation i {
  color: #4299e1; /* 아이콘 색상 변경 */
}
</style>
