<template>
  <div class="alert-dashboard-page">
    <div class="container-fluid">
      <header class="page-header">
        <h1 class="page-title">
          <i class="fas fa-bell"></i>
          실시간 상황 접수
        </h1>
        <p class="page-subtitle">새로운 상황이 발생하면 여기에 실시간으로 표시됩니다.</p>
      </header>

      <StatisticsGrid :alerts="alerts" class="mb-4" />

      <main class="alert-grid-container">
        <div v-if="loading" class="state-message">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2">상황 목록을 불러오는 중...</p>
        </div>
        <div v-else-if="alerts.length === 0" class="state-message">
          <i class="fas fa-check-circle"></i>
          <p>현재 접수된 상황이 없습니다.</p>
        </div>

        <AlertCard
          v-for="alert in sortedAlerts"
          :key="alert.mac_addr"
          :alert="alert"
          @route="goToDashboard"
        />
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import AlertCard from '@/components/alert/AlertCard.vue' // 기존 카드
import StatisticsGrid from '@/components/alert/StatisticsGrid.vue' // 새로운 통계 컴포넌트

export default {
  name: 'SituationAlertDashboard',
  components: {
    AlertCard,
    StatisticsGrid,
  },
  setup() {
    const router = useRouter()
    const loading = ref(true)
    const alerts = ref([])
    const ws = ref(null)

    const connectWebSocket = () => {
      ws.value = new WebSocket(
        `ws://${import.meta.env.VITE_API_URL || '127.0.0.1:8000'}/ws/dashboard`
      )

      ws.value.onopen = () => console.log('WebSocket connected')

      ws.value.onmessage = event => {
        const data = JSON.parse(event.data)
        loading.value = false
        if (data.initial) {
          alerts.value = data.data
        } else {
          const idx = alerts.value.findIndex(d => d.mac_addr === data.data[0].mac_addr)
          if (idx !== -1) {
            if (data.data[0].status === 'TERMINATED') {
              alerts.value.splice(idx, 1)
            } else {
              alerts.value[idx] = { ...alerts.value[idx], ...data.data[0] }
            }
          } else {
            alerts.value.unshift(data.data[0]) // 새 알림을 맨 위에 추가
          }
        }
      }

      ws.value.onclose = () => {
        console.log('WebSocket disconnected, reconnecting in 10s...')
        setTimeout(connectWebSocket, 10000)
      }

      ws.value.onerror = err => {
        console.error('WebSocket error:', err)
        ws.value.close()
      }
    }

    const disconnectWebSocket = () => {
      if (ws.value) ws.value.close()
    }

    const sortedAlerts = computed(() => {
      const statusOrder = { DANGER: 2, WARNING: 1 }
      return [...alerts.value].sort((a, b) => {
        const statusA = statusOrder[a.status] || 0
        const statusB = statusOrder[b.status] || 0
        if (statusB !== statusA) {
          return statusB - statusA
        }
        return new Date(b.created_at) - new Date(a.created_at)
      })
    })

    const goToDashboard = macAddress => {
      router.push({ name: 'dashboard', params: { macAddress } })
    }

    onMounted(connectWebSocket)
    onUnmounted(disconnectWebSocket)
    onBeforeRouteLeave(disconnectWebSocket)

    return {
      loading,
      alerts,
      sortedAlerts,
      goToDashboard,
    }
  },
}
</script>

<style scoped>
.alert-dashboard-page {
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2d3748;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #718096;
}

.alert-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.state-message {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #ffffff;
  border-radius: 12px;
  color: #a0aec0;
  border: 1px solid #e2e8f0;
}

.state-message i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .alert-dashboard-page {
    padding: 1rem;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .alert-grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
