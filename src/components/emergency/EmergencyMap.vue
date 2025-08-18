<template>
  <div class="map-container">
    <div class="map-header">
      <h4 class="h6 mb-0">
        <i class="fas fa-map-marker-alt me-2"></i>
        위치 정보
      </h4>
      <div class="coordinate-display">
        <div>{{ currentLocation.address }}</div>
        <small>위도: {{ currentLocation.lat }}, 경도: {{ currentLocation.lng }}</small>
        <div v-if="nearbyCCTVs.length > 0" class="cctv-count">
          <i class="fas fa-video me-1"></i>
          반경 200m 내 CCTV {{ nearbyCCTVs.length }}대
        </div>
      </div>
    </div>
    <div class="map-wrapper">
      <div id="kakao-map" class="kakao-map"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { cctvService } from '../../services/cctvService.js'

export default {
  name: 'EmergencyMap',
  props: {
    currentLocation: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const map = ref(null)
    const nearbyCCTVs = ref([])
    const cctvMarkers = ref([])
    const cctvInfoWindow = ref(null)

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

    const updateMapLocation = (lat, lng) => {
      if (map.value) {
        const newCenter = new window.kakao.maps.LatLng(lat, lng)
        map.value.setCenter(newCenter)

        const marker = new window.kakao.maps.Marker({
          position: newCenter,
        })
        marker.setMap(map.value)

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">응급상황 발생지점<br/>${props.currentLocation.address}<br/>좌표: ${props.currentLocation.lat}, ${props.currentLocation.lng}</div>`,
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
            props.currentLocation.lat,
            props.currentLocation.lng
          ),
          level: 3,
        }

        map.value = new window.kakao.maps.Map(container, options)

        const markerPosition = new window.kakao.maps.LatLng(
          props.currentLocation.lat,
          props.currentLocation.lng
        )
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map.value)

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">응급상황 발생지점<br/>${props.currentLocation.address}<br/>좌표: ${props.currentLocation.lat}, ${props.currentLocation.lng}</div>`,
        })
        infoWindow.open(map.value, marker)

        fetchNearbyCCTVs(props.currentLocation.lat, props.currentLocation.lng)
      } else {
        setTimeout(initKakaoMap, 500)
      }
    }

    watch(
      () => props.currentLocation,
      newLocation => {
        if (newLocation && newLocation.lat && newLocation.lng) {
          updateMapLocation(newLocation.lat, newLocation.lng)
          fetchNearbyCCTVs(newLocation.lat, newLocation.lng)
        }
      },
      { deep: true }
    )

    onMounted(() => {
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
      nearbyCCTVs,
    }
  },
}
</script>

<style scoped>
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

@media (max-width: 768px) {
  .kakao-map {
    min-height: 250px;
    height: 300px;
  }
}
</style>
