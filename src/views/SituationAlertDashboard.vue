<template>
  <div class="alert-dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h2 class="dashboard-title">
          <i class="fas fa-bell me-3"></i>
          상황 알림 대시보드
        </h2>
        <div class="alert-summary">
          <span class="badge bg-danger me-2">긴급: {{ criticalAlerts.length }}</span>
          <span class="badge bg-warning me-2">주의: {{ warningAlerts.length }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <!-- 실시간 알림 섹션 -->
      <div class="alerts-section">
        <div class="section-header">
          <h4>
            <i class="fas fa-exclamation-triangle me-2"></i>
            실시간 알림
          </h4>
          <button class="btn btn-outline-secondary btn-sm" @click="refreshAlerts">
            <i class="fas fa-sync-alt me-1"></i>
            새로고침
          </button>
        </div>

        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">로딩 중...</span>
          </div>
          <p class="mt-2">알림을 불러오는 중...</p>
        </div>

        <div v-else-if="alerts.length === 0" class="no-alerts">
          <i class="fas fa-check-circle text-success"></i>
          <p>현재 활성화된 알림이 없습니다.</p>
        </div>

        <div v-else class="alerts-list">
          <div
            v-for="alert in sortedAlerts"
            :key="alert.id"
            :class="['alert-card', `alert-${alert.severity}`]"
          >
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
                    @click="goToEmergencyDashboard(alert.macAddress)"
                  >
                    <i class="fas fa-external-link-alt me-1"></i>
                    응급 대응
                  </button>
                  <button
                    class="btn btn-outline-success btn-sm me-2"
                    @click="acknowledgeAlert(alert.id)"
                    :disabled="alert.acknowledged"
                  >
                    <i class="fas fa-check me-1"></i>
                    {{ alert.acknowledged ? '확인됨' : '확인' }}
                  </button>
                  <button class="btn btn-outline-secondary btn-sm" @click="dismissAlert(alert.id)">
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
        </div>
      </div>

      <!-- 통계 섹션 -->
      <div class="statistics-section">
        <div class="section-header">
          <h4>
            <i class="fas fa-chart-bar me-2"></i>
            오늘의 통계
          </h4>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon bg-danger">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ todayStats.critical }}</h3>
              <p>긴급 상황</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-warning">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ todayStats.warning }}</h3>
              <p>주의 알림</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-success">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ todayStats.resolved }}</h3>
              <p>해결된 상황</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-info">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-info">
              <h3>{{ todayStats.avgResponseTime }}분</h3>
              <p>평균 대응 시간</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SituationAlertDashboard',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const alerts = ref([])
    const refreshInterval = ref(null)

    const sampleAlerts = [
      {
        id: 1,
        title: '낙상 감지',
        description: '이규현님의 기기에서 낙상이 감지되었습니다.',
        severity: 'critical',
        timestamp: new Date(),
        acknowledged: false,
        macAddress: '0c:7a:15:d8:13:a1',
        deviceInfo: {
          name: '이규현',
          guardian_name: '따이안',
          guardian_phone: '010-1234-5678',
        },
        location: '서울시 중구 명동2가 54-2',
      },
      {
        id: 2,
        title: '폭행 상황 감지',
        description: '이규현님의 기기에서 폭행 상황이 감지되었습니다.',
        severity: 'critical',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        acknowledged: false,
        macAddress: '11:11:11:11:11:11',
        deviceInfo: {
          name: '이규현',
          guardian_name: '오약',
          guardian_phone: '010-4444-8888',
        },
        location: '서울시 중구 을지로 66',
      },
      {
        id: 3,
        title: '낙상 감지',
        description: '따이안님의 기기에서 낙상이 감지되었습니다.',
        severity: 'critical',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        acknowledged: true,
        macAddress: '12:34:46:89:77:80',
        deviceInfo: {
          name: '따이안',
          guardian_name: '따옷',
          guardian_phone: '010-4444-9999',
        },
        location: '서울시 중구 남대문로 73',
      },
      {
        id: 4,
        title: '폭행 상황 감지',
        description: '따이안님의 기기에서 폭행 상황이 감지되었습니다.',
        severity: 'critical',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        acknowledged: false,
        macAddress: '12:34:46:89:77:80',
        deviceInfo: {
          name: '따이안',
          guardian_name: '따옷',
          guardian_phone: '010-4444-9999',
        },
        location: '서울시 중구 남대문로 73',
      },
    ]

    const todayStats = ref({
      critical: 4,
      warning: 0,
      resolved: 1,
      avgResponseTime: 3.2,
    })

    // 계산된 속성들
    const criticalAlerts = computed(() =>
      alerts.value.filter(alert => alert.severity === 'critical')
    )

    const warningAlerts = computed(() => alerts.value.filter(alert => alert.severity === 'warning'))

    const sortedAlerts = computed(() => {
      const severityOrder = { critical: 3, warning: 2 }
      return [...alerts.value].sort((a, b) => {
        if (severityOrder[b.severity] !== severityOrder[a.severity]) {
          return severityOrder[b.severity] - severityOrder[a.severity]
        }
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
    })

    // 메서드들
    const loadAlerts = async () => {
      loading.value = true
      try {
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000))
        alerts.value = sampleAlerts
      } catch (error) {
        console.error('알림 로드 실패:', error)
      } finally {
        loading.value = false
      }
    }

    const refreshAlerts = () => {
      loadAlerts()
    }

    const getAlertIcon = severity => {
      const icons = {
        critical: 'fas fa-exclamation-triangle text-danger',
        warning: 'fas fa-exclamation-circle text-warning',
      }
      return icons[severity] || 'fas fa-bell'
    }

    const formatTime = timestamp => {
      const now = new Date()
      const diff = now - new Date(timestamp)
      const minutes = Math.floor(diff / 60000)

      if (minutes < 1) return '방금 전'
      if (minutes < 60) return `${minutes}분 전`

      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}시간 전`

      const days = Math.floor(hours / 24)
      return `${days}일 전`
    }

    const acknowledgeAlert = alertId => {
      const alert = alerts.value.find(a => a.id === alertId)
      if (alert) {
        alert.acknowledged = true
      }
    }

    const dismissAlert = alertId => {
      alerts.value = alerts.value.filter(a => a.id !== alertId)
    }

    const goToEmergencyDashboard = macAddress => {
      router.push({
        name: 'emergency-dashboard',
        params: { macAddress },
      })
    }

    // 라이프사이클
    onMounted(() => {
      loadAlerts()
      // 30초마다 자동 새로고침
      refreshInterval.value = setInterval(refreshAlerts, 30000)
    })

    onUnmounted(() => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value)
      }
    })

    return {
      loading,
      alerts,
      criticalAlerts,
      warningAlerts,
      sortedAlerts,
      todayStats,
      refreshAlerts,
      getAlertIcon,
      formatTime,
      acknowledgeAlert,
      dismissAlert,
      goToEmergencyDashboard,
    }
  },
}
</script>

<style scoped>
.alert-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  color: #2c3e50;
  font-weight: 700;
  margin: 0;
}

.alert-summary .badge {
  font-size: 0.9rem;
  padding: 8px 12px;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.alerts-section,
.statistics-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.section-header h4 {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.no-alerts {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.no-alerts i {
  font-size: 3rem;
  margin-bottom: 20px;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.stat-info p {
  margin: 0;
  color: #6c757d;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

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

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
