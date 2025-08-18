<template>
  <div class="alert-dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h2 class="dashboard-title">
          <i class="fas fa-bell me-3"></i>
          상황 알림 대시보드
        </h2>
        <AlertSummaryBadges
          :critical-count="criticalAlerts.length"
          :warning-count="warningAlerts.length"
        />
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
          <AlertCard
            v-for="alert in sortedAlerts"
            :key="alert.id"
            :alert="alert"
            @acknowledge="acknowledgeAlert"
            @dismiss="dismissAlert"
            @emergency-response="goToEmergencyDashboard"
          />
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

        <StatisticsGrid :stats="todayStats" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AlertSummaryBadges from '@/components/alert/AlertSummaryBadges.vue'
import AlertCard from '@/components/alert/AlertCard.vue'
import StatisticsGrid from '@/components/alert/StatisticsGrid.vue'

export default {
  name: 'SituationAlertDashboard',
  components: {
    AlertSummaryBadges,
    AlertCard,
    StatisticsGrid,
  },
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

    const loadAlerts = async () => {
      loading.value = true
      try {
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

    onMounted(() => {
      loadAlerts()
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
}
</style>
