<template>
  <div
    :class="['cctv-sidebar', 'bg-white', 'shadow-sm', { 'is-open': show }]"
    :style="{ left: sidebarLeftPosition }"
  >
    <div
      class="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom bg-light"
    >
      <h5 class="mb-0 text-primary">CCTV 상세 정보</h5>
      <button type="button" class="btn-close" @click="$emit('close-sidebar')"></button>
    </div>
    <div class="sidebar-body p-3 overflow-auto flex-grow-1" v-if="cctv">
      <p><strong>주소:</strong> {{ cctv.address }}</p>
      <p><strong>설치 목적:</strong> {{ cctv.purpose }}</p>
      <p><strong>관할 기관:</strong> {{ cctv.agency_name }}</p>
      <p><strong>설치 일자:</strong> {{ formatCCTVDate(cctv.data_reference_date) }}</p>
      <p><strong>카메라 수:</strong> {{ cctv.camera_count || 'N/A' }}</p>
      <p><strong>카메라 해상도:</strong> {{ cctv.camera_resolution || 'N/A' }}</p>
      <p><strong>방향:</strong> {{ cctv.direction || 'N/A' }}</p>
      <p><strong>저장 일수:</strong> {{ cctv.storage_days || 'N/A' }}일</p>
      <p><strong>기관 연락처:</strong> {{ cctv.agency_phone || 'N/A' }}</p>
      <p><strong>위도:</strong> {{ cctv.lat }}</p>
      <p><strong>경도:</strong> {{ cctv.lng }}</p>
    </div>
    <div class="sidebar-body p-3 text-muted" v-else>
      <p>CCTV 마커를 클릭하여 상세 정보를 확인하세요.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CctvSidebar',
  props: {
    cctv: {
      type: Object,
      default: null,
    },
    show: {
      type: Boolean,
      default: false,
    },
    filterSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sidebarLeftPosition() {
      const sidebarWidth = 350 // 상세 사이드바의 너비
      return this.show ? '0px' : `-${sidebarWidth}px`
    },
  },
  methods: {
    formatCCTVDate(dateString) {
      if (!dateString) return 'N/A'
      try {
        const date = new Date(dateString)
        return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}월 ${String(date.getDate()).padStart(2, '0')}일`
      } catch (e) {
        return dateString
      }
    },
  },
}
</script>

<style scoped>
.cctv-sidebar {
  position: absolute;
  top: 0;
  height: 100%;
  width: 350px;
  transition: left 0.3s ease-in-out; /* left 속성 변화 애니메이션 */
  z-index: 999;
  display: flex;
  flex-direction: column;
}
/* .is-open 클래스는 이제 필요 없음. left 속성으로 제어 */
</style>
