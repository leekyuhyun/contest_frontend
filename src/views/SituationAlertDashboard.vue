<template>
  <div class="alert-dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h2 class="dashboard-title">
          <i class="fas fa-bell me-3"></i>
          상황 알림 대시보드
        </h2>
        <AlertSummaryBadges :danger-count="dangerAlerts.length" :warning-count="warningAlerts.length" />
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
          <AlertCard v-for="alert in sortedAlerts" :key="alert.id" :alert="alert" @route="goToDashboard" />
        </div>
      </div>

      <!-- 통계 섹션 -->
      <!-- <div class="statistics-section">
        <div class="section-header">
          <h4>
            <i class="fas fa-chart-bar me-2"></i>
            오늘의 통계
          </h4>
        </div>

        <StatisticsGrid :stats="todayStats" />
      </div> -->
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
    const loading = ref(true)
    const alerts = ref([])
    const ws = ref(null)

    const connectWebSocket = () => {
      ws.value = new WebSocket(`ws://${import.meta.env.VITE_API_URL || '127.0.0.1:8000'}/ws/dashboard`)

      ws.value.onopen = () => {
        console.log('WebSocket connected')
      }

      ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data)
        loading.value = false;
        if (data.initial) {
          alerts.value = data.data
        } else {
          const idx = alerts.value.findIndex(d => d.mac_addr === data.data[0].mac_addr)
          if (idx !== -1) {
            alerts.value[idx] = { ...alerts.value[idx], ...data.data[0] }
          } else {
            alerts.value += data.data[0]
          }
        }
      }

      ws.value.onclose = () => {
        console.log('WebSocket disconnected, reconnecting in 10s...')
        setTimeout(connectWebSocket, 10000)
      }

      ws.value.onerror = (err) => {
        console.error('WebSocket error:', err)
        ws.value.close()
      }
    }

    const disconnectWebSocket = () => {
      if (ws.value) {
        ws.value.close()
      }
    }

    // const todayStats = ref({
    //   critical: 4,
    //   warning: 0,
    //   resolved: 1,
    //   avgResponseTime: 3.2,
    // })

    const dangerAlerts = computed(() => alerts.value.filter(alert => alert.status === 'DANGER'))
    const warningAlerts = computed(() => alerts.value.filter(alert => alert.status === 'WARNING'))

    const sortedAlerts = computed(() => {
      const statusOrder = { critical: 3, warning: 2 }
      return [...alerts.value].sort((a, b) => {
        if (statusOrder[b.status] !== statusOrder[a.status]) {
          return statusOrder[b.status] - statusOrder[a.status]
        }
        return new Date(b.timestamp) - new Date(a.timestamp)
      })
    })

    const dismissAlert = alertId => {
      alerts.value = alerts.value.filter(a => a.id !== alertId)
    }

    const goToDashboard = macAddress => {
      router.push({
        name: 'dashboard',
        params: { macAddress },
      })
    }

    onMounted(() => {
      connectWebSocket()
    })

    onUnmounted(() => {
      disconnectWebSocket()
    })

    return {
      loading,
      alerts,
      dangerAlerts,
      warningAlerts,
      sortedAlerts,
      // todayStats,
      dismissAlert,
      goToDashboard,
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
