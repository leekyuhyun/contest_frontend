<template>
  <div class="emergency-dashboard">
    <!-- 메인 콘텐츠 -->
    <div class="dashboard-content">
      <!-- 기기 정보 카드 -->
      <div class="device-info-section">
        <div class="info-card">
          <div class="card-header">
            <!-- Added flex layout with device info title and end situation button -->
            <div class="header-flex">
              <h3 class="h5 mb-0">
                <i class="fas fa-user-shield me-2"></i>
                기기 정보
              </h3>
              <button
                class="btn btn-danger btn-sm end-situation-btn"
                @click="endSituation"
                :disabled="loading"
              >
                <i class="fas fa-stop-circle me-2"></i>
                상황 종료
              </button>
            </div>
          </div>

          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">로딩 중...</span>
              </div>
              <p class="mt-2">기기 정보를 불러오는 중...</p>
            </div>

            <div v-else-if="deviceInfo" class="device-details">
              <div class="info-row">
                <span class="label">이름:</span>
                <span class="value">{{ deviceInfo.name }}</span>
              </div>

              <div class="info-row">
                <span class="label">보호자 이름:</span>
                <span class="value">{{ deviceInfo.guardian_name }}</span>
              </div>

              <div class="info-row">
                <span class="label">보호자 연락처:</span>
                <span class="value">{{ deviceInfo.guardian_phone }}</span>
              </div>

              <div class="info-row">
                <span class="label">발생 시간:</span>
                <span class="value emergency-time">{{ emergencyTime }}</span>
              </div>

              <div class="info-row">
                <span class="label">위치:</span>
                <span class="value location-address">{{ currentLocation.address }}</span>
              </div>
            </div>

            <div v-else class="alert alert-warning">
              <i class="fas fa-exclamation-triangle me-2"></i>
              <div v-if="errorMessage">{{ errorMessage }}</div>
              <div v-else>기기 정보를 불러올 수 없습니다.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 지도와 녹음을 양옆으로 배치하는 새로운 섹션 -->
      <div class="map-audio-section">
        <!-- 카카오 지도 -->
        <div class="map-container">
          <div class="map-header">
            <h4 class="h6 mb-0">
              <i class="fas fa-map-marker-alt me-2"></i>
              위치 정보
            </h4>
            <!-- Added coordinate display in map header -->
            <div class="coordinate-display">
              <div>{{ currentLocation.address }}</div>
              <small>위도: {{ currentLocation.lat }}, 경도: {{ currentLocation.lng }}</small>
              <!-- Added CCTV count display -->
              <div v-if="nearbyCCTVs.length > 0" class="cctv-count">
                <i class="fas fa-video me-1"></i>
                반경 200m 내 CCTV {{ nearbyCCTVs.length }}대
              </div>
            </div>
          </div>
          <!-- Added padding to prevent map cutoff -->
          <div class="map-wrapper">
            <div id="kakao-map" class="kakao-map"></div>
          </div>
        </div>

        <!-- 녹음 파일 섹션 -->
        <div class="audio-container">
          <div class="audio-header">
            <h4 class="h6 mb-0">
              <i class="fas fa-microphone me-2"></i>
              녹음 파일
            </h4>
          </div>

          <div class="audio-content">
            <div class="audio-player">
              <audio controls class="w-100">
                <source src="" type="audio/mpeg" />
                브라우저가 오디오를 지원하지 않습니다.
              </audio>
            </div>

            <div class="audio-info mt-2">
              <small class="text-muted">
                <i class="fas fa-clock me-1"></i>
                녹음 시간: {{ emergencyTime }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import deviceService from '../services/deviceService.js'
import { cctvService } from '../services/cctvService.js'

export default {
  name: 'EmergencyDashboard',
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
    const map = ref(null)
    const macAddress = ref(route.params.macAddress || '')
    const errorMessage = ref('')
    const nearbyCCTVs = ref([])
    const cctvMarkers = ref([])
    const cctvInfoWindow = ref(null)
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

    const fetchNearbyCCTVs = async (lat, lng) => {
      try {
        console.log('[v0] Fetching nearby CCTVs for coordinates:', lat, lng)
        const cctvs = await cctvService.getNearbyCCTVs(lat, lng, 200)
        nearbyCCTVs.value = cctvs
        console.log('[v0] Found nearby CCTVs:', cctvs.length)

        if (map.value) {
          addCCTVMarkers()
        }
      } catch (error) {
        console.error('Failed to fetch nearby CCTVs:', error)
        nearbyCCTVs.value = []
      }
    }

    const addCCTVMarkers = () => {
      if (!map.value || !window.kakao) return

      cctvMarkers.value.forEach(marker => marker.setMap(null))
      cctvMarkers.value = []

      if (cctvInfoWindow.value) {
        cctvInfoWindow.value.close()
      }

      nearbyCCTVs.value.forEach(cctv => {
        const markerPosition = new window.kakao.maps.LatLng(cctv.lat, cctv.lng)

        const imageSrc =
          'data:image/svg+xml;base64,' +
          btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m23 7-3 2v6l3 2V7Z"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="#3b82f6" stroke="#2563eb"/>
          </svg>
        `)
        const imageSize = new window.kakao.maps.Size(24, 24)
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          map: map.value,
        })

        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (cctvInfoWindow.value) {
            cctvInfoWindow.value.close()
          }

          const content = `
            <div style="padding: 10px; min-width: 200px;">
              <h6 style="margin: 0 0 8px 0; color: #2563eb;">
                <i class="fas fa-video" style="margin-right: 5px;"></i>
                CCTV 정보
              </h6>
              <div style="font-size: 12px; line-height: 1.4;">
                <div><strong>주소:</strong> ${cctv.address}</div>
                <div><strong>용도:</strong> ${cctv.purpose || '일반감시'}</div>
                <div><strong>카메라 수:</strong> ${cctv.camera_count || 1}대</div>
                ${cctv.camera_resolution ? `<div><strong>해상도:</strong> ${cctv.camera_resolution}</div>` : ''}
                ${cctv.agency_name ? `<div><strong>관리기관:</strong> ${cctv.agency_name}</div>` : ''}
                ${cctv.agency_phone ? `<div><strong>연락처:</strong> ${cctv.agency_phone}</div>` : ''}
              </div>
            </div>
          `

          cctvInfoWindow.value = new window.kakao.maps.InfoWindow({
            content: content,
          })
          cctvInfoWindow.value.open(map.value, marker)
        })

        cctvMarkers.value.push(marker)
      })
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

        updateMapLocation(fixedLocation.lat, fixedLocation.lng)

        await fetchNearbyCCTVs(fixedLocation.lat, fixedLocation.lng)
      } catch (error) {
        console.error('기기 정보 조회 실패:', error)
        deviceInfo.value = null
        errorMessage.value = error.message || '기기 정보를 불러오는 중 오류가 발생했습니다.'

        const fixedLocation = getFixedLocationByMac(macAddress.value)
        currentLocation.value = fixedLocation
        updateMapLocation(fixedLocation.lat, fixedLocation.lng)

        await fetchNearbyCCTVs(fixedLocation.lat, fixedLocation.lng)
      } finally {
        loading.value = false
      }
    }

    const updateMapLocation = (lat, lng) => {
      if (map.value) {
        const newCenter = new window.kakao.maps.LatLng(lat, lng)
        map.value.setCenter(newCenter)

        map.value.removeOverlayMapTypeId && map.value.removeOverlayMapTypeId()

        const marker = new window.kakao.maps.Marker({
          position: newCenter,
        })
        marker.setMap(map.value)

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">응급상황 발생지점<br/>${currentLocation.value.address}<br/>좌표: ${currentLocation.value.lat}, ${currentLocation.value.lng}</div>`,
        })
        infoWindow.open(map.value, marker)

        addCCTVMarkers()
      }
    }

    const initKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('kakao-map')
        const options = {
          center: new window.kakao.maps.LatLng(
            currentLocation.value.lat,
            currentLocation.value.lng
          ),
          level: 3,
        }

        map.value = new window.kakao.maps.Map(container, options)

        const markerPosition = new window.kakao.maps.LatLng(
          currentLocation.value.lat,
          currentLocation.value.lng
        )
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map.value)

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">응급상황 발생지점<br/>${currentLocation.value.address}<br/>좌표: ${currentLocation.value.lat}, ${currentLocation.value.lng}</div>`,
        })
        infoWindow.open(map.value, marker)

        addCCTVMarkers()
      } else {
        setTimeout(initKakaoMap, 500)
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

      if (!window.kakao) {
        const script = document.createElement('script')
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY&autoload=false'
        script.onload = () => {
          window.kakao.maps.load(initKakaoMap)
        }
        document.head.appendChild(script)
      } else {
        initKakaoMap()
      }
    })

    return {
      loading,
      deviceInfo,
      emergencyTime,
      macAddress,
      errorMessage,
      currentLocation,
      nearbyCCTVs,
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

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.end-situation-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 3px 10px rgba(220, 53, 69, 0.3);
  transition: all 0.3s ease;
}

.end-situation-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
}

.card-body {
  padding: 30px;
}

.device-details {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr 2fr 2.5fr;
  gap: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  white-space: nowrap;
  min-width: 0;
}

.label {
  font-weight: 600;
  color: #555;
  min-width: 80px;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #2c3e50;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.emergency-time {
  color: #e74c3c !important;
  font-weight: 700;
}

.map-audio-section {
  display: flex;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.map-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 2;
  display: flex;
  flex-direction: column;
}

.map-header {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  padding: 15px 20px;
  flex-shrink: 0;
}

.map-wrapper {
  flex: 1;
  padding: 10px;
  background: white;
  display: flex;
  min-height: 0;
}

.kakao-map {
  width: 100%;
  flex: 1;
  min-height: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.audio-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.audio-header {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
  padding: 15px 20px;
}

.audio-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.audio-player audio {
  border-radius: 10px;
}

@media (max-width: 768px) {
  .dashboard-content {
    gap: 20px;
    height: calc(100vh - 40px);
  }

  .header-flex {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .device-details {
    grid-template-columns: 1fr;
  }

  .map-audio-section {
    flex-direction: column;
  }

  .kakao-map {
    min-height: 250px;
    height: 300px;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .value {
    text-align: left;
  }
}

.location-address {
  color: #2980b9 !important;
  font-weight: 700;
}

.coordinate-display {
  margin-top: 8px;
  opacity: 0.9;
}

.coordinate-display div {
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.coordinate-display small {
  font-family: 'Courier New', monospace;
  font-weight: 500;
  font-size: 0.8rem;
}

.cctv-count {
  margin-top: 4px;
  font-size: 0.8rem;
  color: #3b82f6;
  font-weight: 600;
}

.cctv-count i {
  color: #2563eb;
}
</style>
