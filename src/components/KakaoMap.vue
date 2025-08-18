<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'KakaoMap',
  props: {
    cctvs: {
      type: Array,
      default: () => [],
    },
    selectedCCTVId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
    }
  },
  watch: {
    cctvs: {
      handler() {
        this.loadKakaoMap()
      },
      deep: true,
    },
    selectedCCTVId(newId) {
      if (this.infowindow) {
        this.infowindow.close()
      }
      if (newId !== null) {
        const selectedMarker = this.markers.find(marker => marker.cctvId === newId)
        if (selectedMarker) {
          this.infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${selectedMarker.cctvName}</div>`,
          })
          this.infowindow.open(this.map, selectedMarker)
          this.map.setCenter(selectedMarker.getPosition())
        }
      }
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadKakaoMap()
    } else {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.loadKakaoMap)
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=02d5915414cc4aa36016e7ebbb4798f8&libraries=services' // YOUR_APP_KEY를 실제 키로 교체
      document.head.appendChild(script)
    }
  },
  methods: {
    loadKakaoMap() {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청 기준
        level: 7,
      }
      this.map = new kakao.maps.Map(container, options)
      this.addCCTVMarkers()
    },
    addCCTVMarkers() {
      // 기존 마커 제거
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
      if (this.infowindow) {
        this.infowindow.close()
      }

      this.cctvs.forEach(cctv => {
        const markerPosition = new kakao.maps.LatLng(cctv.lat, cctv.lng)
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          map: this.map,
        })

        // 마커에 CCTV 데이터 연결
        marker.cctvId = cctv.id
        marker.cctvName = cctv.name || cctv.address // 이름이 없으면 주소 사용

        kakao.maps.event.addListener(marker, 'click', () => {
          this.$emit('marker-clicked', cctv) // 클릭된 CCTV 데이터 전달
        })
        this.markers.push(marker)
      })

      // 모든 마커가 추가된 후, 지도의 중심과 확대 레벨 조정
      if (this.markers.length > 0) {
        const bounds = new kakao.maps.LatLngBounds()
        this.markers.forEach(marker => bounds.extend(marker.getPosition()))
        this.map.setBounds(bounds)
      }
    },
  },
}
</script>

<style scoped>
#map {
  flex-grow: 1; /* 부모 flex 컨테이너 내에서 공간을 채우도록 설정 */
  height: 100%; /* 부모 높이에 맞춤 */
}
</style>
