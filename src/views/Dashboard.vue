<template>
  <div class="emergency-dashboard">
    <div class="dashboard-content">
      <!-- Split device info into separate component -->
      <DeviceInfoCard
        :loading="loading"
        :deviceInfo="deviceInfo"
        :emergencyTime="emergencyTime"
        :currentLocation="currentLocation"
        :errorMessage="errorMessage"
        @endSituation="endSituation"
      />

      <!-- Split map and audio into separate components -->
      <div class="map-audio-section">
        <EmergencyMap :currentLocation="currentLocation" />
        <AudioPlayer :emergencyTime="emergencyTime" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import deviceService from '../services/deviceService.js'
import DeviceInfoCard from '../components/emergency/DeviceInfoCard.vue'
import EmergencyMap from '../components/emergency/EmergencyMap.vue'
import AudioPlayer from '../components/emergency/AudioPlayer.vue'

export default {
  name: 'EmergencyDashboard',
  components: {
    DeviceInfoCard,
    EmergencyMap,
    AudioPlayer,
  },
  props: {
    macAddress: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const loading = ref(true)
    const deviceInfo = ref(null)
    const emergencyTime = ref('')
    const macAddress = ref(route.params.macAddress || '')
    const errorMessage = ref('')
    const currentLocation = ref({
      lat: 37.5665,
      lng: 126.978,
      address: '서울시 중구 명동2가 54-2',
    })

    const generateEmergencyTime = () => {
      const now = new Date()
      return now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }

    const getFixedLocationByMac = mac => {
      const locationMap = {
        '0c:7a:15:d8:13:a1': {
          lat: 37.5665,
          lng: 126.978,
          address: '서울시 중구 명동2가 54-2',
        },
        '11:11:11:11:11:11': {
          lat: 37.5636,
          lng: 126.9748,
          address: '서울시 중구 을지로 66',
        },
        '12:34:46:89:77:80': {
          lat: 37.5547,
          lng: 126.9707,
          address: '서울시 중구 남대문로 73',
        },
        default: {
          lat: 37.5519,
          lng: 126.9918,
          address: '서울시 강남구 테헤란로 152',
        },
      }

      return locationMap[mac] || locationMap['default']
    }

    const fetchDeviceInfo = async () => {
      try {
        loading.value = true
        errorMessage.value = ''

        if (!macAddress.value) {
          console.error('MAC 주소가 제공되지 않았습니다.')
          errorMessage.value = 'MAC 주소가 제공되지 않았습니다.'
          return
        }

        console.log('[v0] Fetching device info for MAC:', macAddress.value)

        const response = await deviceService.getDeviceByMac(macAddress.value)
        console.log('[v0] Device info response:', response)

        deviceInfo.value = response
        emergencyTime.value = generateEmergencyTime()

        const fixedLocation = getFixedLocationByMac(macAddress.value)
        currentLocation.value = fixedLocation
      } catch (error) {
        console.error('기기 정보 조회 실패:', error)
        deviceInfo.value = null
        errorMessage.value = error.message || '기기 정보를 불러오는 중 오류가 발생했습니다.'

        const fixedLocation = getFixedLocationByMac(macAddress.value)
        currentLocation.value = fixedLocation
      } finally {
        loading.value = false
      }
    }

    const endSituation = () => {
      if (confirm('응급 상황을 종료하시겠습니까?')) {
        alert('응급 상황이 종료되었습니다.')
        router.push('/device-list')
      }
    }

    onMounted(() => {
      fetchDeviceInfo()
    })

    return {
      loading,
      deviceInfo,
      emergencyTime,
      macAddress,
      errorMessage,
      currentLocation,
      endSituation,
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
