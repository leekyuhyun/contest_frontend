<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'MonitoringMap',
  props: {
    gpsData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const map = ref(null)
    const polyline = ref(null)
    const marker = ref(null)

    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 7,
        }
        map.value = new window.kakao.maps.Map(container, options)
      } else {
        console.error('카카오 맵 스크립트가 로드되지 않았습니다.')
      }
    }

    const updateMap = gpsPoints => {
      if (!map.value || gpsPoints.length === 0) return

      const linePath = gpsPoints.map(point => new window.kakao.maps.LatLng(point.lat, point.lng))

      const latestPosition = linePath[linePath.length - 1]

      if (polyline.value) {
        polyline.value.setMap(null)
      }

      polyline.value = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#EF4444',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
      })
      polyline.value.setMap(map.value)

      if (marker.value) {
        marker.value.setMap(null)
      }

      marker.value = new window.kakao.maps.Marker({
        position: latestPosition,
      })
      marker.value.setMap(map.value)

      map.value.setCenter(latestPosition)
    }

    onMounted(() => {
      initMap()
    })

    watch(
      () => props.gpsData,
      newGpsData => {
        const validGpsPoints = newGpsData.filter(d => d.lat && d.lat !== 'N/A')
        if (validGpsPoints.length > 0) {
          updateMap(validGpsPoints)
        }
      },
      { deep: true }
    )

    return {}
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
