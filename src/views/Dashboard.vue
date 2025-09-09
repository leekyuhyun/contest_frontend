<template>
  <div class="dashboard-page">
    <div class="panel top-panel mb-4">
      <DeviceInfoCard v-if="deviceInfo" :device="deviceInfo" />
      <div v-else class="panel-placeholder">기기 정보 로딩 중...</div>
    </div>

    <div class="main-grid">
      <main class="panel map-panel">
        <MonitoringMap :gps-data="sortedData" />
        <div v-if="loadingWs" class="map-loading-overlay">
          <div class="spinner-border text-light" role="status"></div>
          <p>데이터 수신 중...</p>
        </div>
      </main>

      <aside class="panel log-panel">
        <div class="panel-header">
          <i class="fas fa-history icon"></i>
          <h3 class="title">실시간 로그</h3>
        </div>
        <div class="panel-body">
          <div v-if="loadingWs" class="log-state">
            <span>최초 데이터 수신 중입니다...</span>
          </div>
          <div v-else-if="sortedData.length === 0" class="log-state">
            <span>수신된 데이터가 없습니다.</span>
          </div>
          <ul v-else class="log-list">
            <li v-for="item in sortedData" :key="item.created_at" class="log-item">
              <div class="log-timestamp">
                <i class="fas fa-clock"></i>
                {{ formatDateTime(item.created_at) }}
              </div>
              <div class="log-content">
                <div class="log-detail" v-if="item.lat && item.lat !== 'N/A'">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>위치: {{ item.lat }}, {{ item.lng }}</span>
                </div>
                <audio
                  v-if="item.audio_obj_key"
                  :src="item.audio_obj_key"
                  controls
                  class="log-audio"
                ></audio>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import MonitoringMap from '@/components/dashboard/MonitoringMap.vue'
import DeviceInfoCard from '@/components/dashboard/DeviceInfoCard.vue'

export default {
  name: 'Dashboard',
  components: {
    MonitoringMap,
    DeviceInfoCard,
  },
  setup() {
    const route = useRoute()
    const macAddress = route.params.macAddress

    const loadingWs = ref(true)
    const situationData = ref([])
    const deviceInfo = ref(null)
    const ws = ref(null)

    const connectWebSocket = () => {
      ws.value = new WebSocket(
        `ws://${import.meta.env.VITE_API_URL || '127.0.0.1:8000'}/ws/situation/${macAddress}`
      )

      ws.value.onopen = () => console.log(`WebSocket connected for ${macAddress}`)

      ws.value.onmessage = event => {
        const data = JSON.parse(event.data)
        loadingWs.value = false

        if (data.initial) {
          deviceInfo.value = data.data.device
          situationData.value = data.data.gps_data.map(gps => ({
            ...gps,
            lat: gps.latitude,
            lng: gps.longitude,
          }))
          data.data.stt_data.forEach(stt => {
            situationData.value.push({ ...stt, created_at: stt.timestamp, lat: 'N/A', lng: 'N/A' })
          })
        } else {
          const { gps, stt } = data.data
          if (gps) {
            situationData.value.push({ ...gps, lat: gps.latitude, lng: gps.longitude })
          }
          if (stt) {
            situationData.value.push({ ...stt, created_at: stt.timestamp, lat: 'N/A', lng: 'N/A' })
          }
        }
      }
      ws.value.onclose = () => console.log('WebSocket disconnected')
      ws.value.onerror = error => {
        console.error('WebSocket error:', error)
        ws.value.close()
      }
    }

    const disconnectWebSocket = () => {
      if (ws.value) ws.value.close()
    }

    const sortedData = computed(() => {
      return [...situationData.value].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    })

    const formatDateTime = timestamp => {
      if (!timestamp) return ''
      return new Date(timestamp).toLocaleString('ko-KR')
    }

    onMounted(connectWebSocket)
    onUnmounted(disconnectWebSocket)
    onBeforeRouteLeave(disconnectWebSocket)

    return {
      loadingWs,
      sortedData,
      deviceInfo,
      formatDateTime,
    }
  },
}
</script>

<style scoped>
.dashboard-page {
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.panel {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.top-panel {
  flex-shrink: 0;
}

.main-grid {
  display: grid;
  grid-template-columns: 7fr 3fr; /* 지도와 로그 비율 */
  gap: 1.5rem;
  flex-grow: 1;
  min-height: 0;
}

.map-panel {
  position: relative;
  display: flex;
  flex-direction: column;
}

.log-panel {
  display: flex;
  flex-direction: column;
}

.map-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* 오른쪽 로그 패널 스타일 */
.panel-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
.panel-header .icon {
  font-size: 1.2rem;
  color: #a855f7;
}
.panel-header .title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}

.panel-body {
  overflow-y: auto;
  padding: 0.5rem;
}
.log-state {
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
}
.log-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.log-item {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
}
.log-item:last-child {
  border-bottom: none;
}
.log-timestamp {
  font-weight: 600;
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.log-content .log-detail {
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.log-audio {
  width: 100%;
  margin-top: 0.75rem;
  height: 40px;
}

/* 반응형 스타일 */
@media (max-width: 992px) {
  .dashboard-page {
    padding: 1rem;
  }
  .main-grid {
    grid-template-columns: 1fr; /* 세로로 쌓이도록 변경 */
  }
  .map-panel {
    min-height: 400px; /* 모바일에서 최소 높이 보장 */
  }
  .log-panel {
    min-height: 300px;
  }
}
</style>
