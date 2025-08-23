<template>
  <div class="emergency-dashboard">
    <div class="dashboard-content">
      <!-- Split device info into separate component -->
      <DeviceInfoCard :loading="loadingDeviceInfo" :deviceInfo="deviceInfo" :errorMessage="errorMessage"
        @endSituation="endSituation" />
      <TimelineSlider :data="sortedData" @select="handleSelect" @select-live="handleSelectLive" />
      <MonitoringMap v-if="selectedData" :data="selectedData"></MonitoringMap>
      <!-- <div v-if="loadingWs" class="text-center py-4">
        이건 모른다잉
      </div>
      <div v-else-if="sortedData.length === 0">
        아직 뭐 없다잉
      </div>
      <div v-else>
        지금은 뭐 있다잉
      </div>
      <div class="map-audio-section">
        <ul>
          <li v-for="item in sortedData" :key="item.created_at">
            <strong>{{ formatDateTime(item.created_at) }}</strong>
            <br>
            위치: {{ item.lat }}, {{ item.lng }}
            <br>
            <audio v-if="item.audio_obj_key" :src="item.audio_obj_key" controls></audio>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import deviceService from '../services/deviceService.js'
import DeviceInfoCard from '../components/dashboard/DeviceInfoCard.vue'
import TimelineSlider from '@/components/dashboard/TimelineSlider.vue'
import MonitoringMap from '@/components/dashboard/MonitoringMap.vue'

export default {
  name: 'Dashboard',
  components: {
    DeviceInfoCard,
    TimelineSlider,
    MonitoringMap,
  },
  props: {
    macAddress: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '-'
      return new Date(dateTimeString).toLocaleString('ko-KR')
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const loadingDeviceInfo = ref(true)
    const deviceInfo = ref(null)
    const macAddress = ref(route.params.macAddress || '')
    const errorMessage = ref('')

    const loadingWs = ref(true)
    const streamData = ref([])
    const ws = ref(null)

    const connectWebSocket = () => {
      ws.value = new WebSocket(`ws://${import.meta.env.VITE_API_URL || '127.0.0.1:8000'}/ws/dashboard/${macAddress.value}`)

      ws.value.onopen = () => {
        console.log('WebSocket connected')
      }

      ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data)
        loadingWs.value = false;
        console.log(data)
        if (data.initial) {
          streamData.value = data.data
        } else {
          console.log(data.data[0])
          streamData.value.push(data.data[0])
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

    const fetchDeviceInfo = async () => {
      try {
        loadingDeviceInfo.value = true
        errorMessage.value = ''

        if (!macAddress.value) {
          console.error('MAC 주소가 제공되지 않았습니다.')
          errorMessage.value = 'MAC 주소가 제공되지 않았습니다.'
          return
        }

        const response = await deviceService.getDeviceByMac(macAddress.value)

        deviceInfo.value = response

      } catch (error) {
        deviceInfo.value = null
        errorMessage.value = error.message || '기기 정보를 불러오는 중 오류가 발생했습니다.'
      } finally {
        loadingDeviceInfo.value = false
      }
    }

    const endSituation = () => {
      if (confirm('응급 상황을 종료하시겠습니까?')) {
        alert('응급 상황이 종료되었습니다.')
        router.push('/device-list')
      }
    }

    const sortedData = computed(() => {
      return [...streamData.value].sort((a, b) => new Date(new Date(a.created_at).getTime() - new Date(b.created_at).getTime()))
    })

    const selected = ref(0)

    const handleSelect = (select) => {
      selected.value = select;
    }

    const selectedData = computed(() => {
      return streamData.value.find(
        item => new Date(item.created_at).getTime() === selected.value
      )
    })

    const selectedLive = ref(true)

    const handleSelectLive = (select) => {
      selected.value = select;
    }

    onMounted(() => {
      fetchDeviceInfo()
      connectWebSocket()
    })

    onUnmounted(() => {
      disconnectWebSocket()
    })

    onBeforeRouteLeave(() => {
      disconnectWebSocket()
    })

    return {
      loadingDeviceInfo,
      deviceInfo,
      macAddress,
      errorMessage,
      endSituation,
      loadingWs,
      sortedData,
      selected,
      selectedData,
      handleSelect,
      handleSelectLive,
    }
  },
}
</script>

<style scoped>
.emergency-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  padding: 20px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
}

.map-audio-section {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

@media (max-width: 768px) {
  .dashboard-content {
    gap: 20px;
    height: calc(100vh - 40px);
  }

  .map-audio-section {
    flex-direction: column;
  }
}
</style>
