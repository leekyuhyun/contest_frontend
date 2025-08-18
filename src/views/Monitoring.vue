<template>
  <div :class="['monitoring-page', 'd-flex', { 'filter-sidebar-closed': !isFilterSidebarOpen }]">
    <!-- Filter Sidebar -->
    <div
      :class="[
        'sidebar-controls',
        'bg-light',
        'p-3',
        'shadow-sm',
        { 'sidebar-hidden': !isFilterSidebarOpen },
      ]"
    >
      <h5 class="mb-3 text-primary">CCTV 현황 필터</h5>
      <div class="mb-3">
        <label for="bigPosition" class="form-label">대분류 지역</label>
        <select
          id="bigPosition"
          class="form-select"
          v-model="selectedBigPosition"
          @change="filterCCTVs"
        >
          <option value="">전체</option>
          <option v-for="pos in bigPositions" :key="pos" :value="pos">{{ pos }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="smallPosition" class="form-label">소분류 지역</label>
        <select
          id="smallPosition"
          class="form-select"
          v-model="selectedSmallPosition"
          @change="filterCCTVs"
          :disabled="!selectedBigPosition"
        >
          <option value="">전체</option>
          <option v-for="pos in smallPositions" :key="pos" :value="pos">{{ pos }}</option>
        </select>
      </div>
      <button class="btn btn-outline-secondary w-100 mt-3" @click="resetFilters">
        필터 초기화
      </button>
      <button
        v-if="hasMoreCCTVs"
        class="btn btn-info w-100 mt-2"
        @click="loadMoreCCTVs"
        :disabled="isLoadingMore"
      >
        {{ isLoadingMore ? '불러오는 중...' : '더보기' }} ({{ allCCTVs.length }} / {{ totalCCTVs }})
      </button>
    </div>

    <!-- Main content area (Map + Detail Sidebar + Toggle Button) -->
    <div class="main-content-area flex-grow-1 position-relative">
      <!-- Toggle button for filter sidebar -->
      <button
        @click="toggleFilterSidebar"
        :class="[
          'btn',
          'btn-light',
          'rounded-circle',
          'shadow',
          'toggle-filter-btn',
          { shifted: isFilterSidebarOpen },
        ]"
      >
        <ChevronLeftIcon v-if="isFilterSidebarOpen" class="icon" />
        <ChevronRightIcon v-else class="icon" />
      </button>

      <KakaoMap
        :cctvs="filteredCCTVs"
        :selectedCCTVId="selectedCCTV ? selectedCCTV.id : null"
        @marker-clicked="handleMarkerClick"
        ref="kakaoMap"
      />

      <!-- Detail Sidebar (absolutely positioned within main-content-area) -->
      <CctvSidebar
        :cctv="selectedCCTV"
        :show="isDetailSidebarOpen"
        :filter-sidebar-open="isFilterSidebarOpen"
        @close-sidebar="closeDetailSidebar"
      />
    </div>
  </div>
</template>

<script>
import KakaoMap from '@/components/KakaoMap.vue'
import CctvSidebar from '@/components/CctvSidebar.vue'
import { cctvService } from '@/services/cctvService'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const INITIAL_LOAD_LIMIT = 500
const LOAD_MORE_STEP = 200

export default {
  name: 'MonitoringPage',
  components: {
    KakaoMap,
    CctvSidebar,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      allCCTVs: [],
      filteredCCTVs: [],
      bigPositions: [],
      smallPositions: [],
      selectedBigPosition: '',
      selectedSmallPosition: '',
      selectedCCTV: null,
      isFilterSidebarOpen: true,
      isDetailSidebarOpen: false,
      currentSkip: 0,
      totalCCTVs: 0,
      isLoadingMore: false,
    }
  },
  computed: {
    hasMoreCCTVs() {
      return this.allCCTVs.length < this.totalCCTVs
    },
  },
  async mounted() {
    await this.loadAvailableRegions()
  },
  watch: {
    selectedBigPosition(newVal) {
      this.selectedSmallPosition = ''
      this.updateSmallPositions(newVal)
      this.filterCCTVs() // 이제 백엔드에서 데이터를 불러옴
    },
    selectedSmallPosition() {
      this.filterCCTVs() // 이제 백엔드에서 데이터를 불러옴
    },
  },
  methods: {
    async loadAvailableRegions() {
      try {
        const regions = await cctvService.getAvailableRegions()
        this.bigPositions = regions.big_positions
        this.smallPositionsMap = new Map()

        // 소분류 지역 맵 생성
        Object.entries(regions.small_positions).forEach(([bigPos, smallPosList]) => {
          this.smallPositionsMap.set(bigPos, new Set(smallPosList))
        })
      } catch (error) {
        console.error('지역 목록을 불러오는 데 실패했습니다:', error)
      }
    },
    async filterCCTVs() {
      if (!this.selectedBigPosition) {
        this.allCCTVs = []
        this.filteredCCTVs = []
        this.totalCCTVs = 0
        this.closeDetailSidebar()
        return
      }

      try {
        // 선택된 지역의 CCTV 데이터만 백엔드에서 불러오기
        const fetchedData = await cctvService.getCCTVsByRegion(
          this.selectedBigPosition,
          this.selectedSmallPosition || null,
          0,
          INITIAL_LOAD_LIMIT
        )

        this.allCCTVs = fetchedData
        this.filteredCCTVs = fetchedData
        this.currentSkip = fetchedData.length

        // 총 개수 조회
        const countData = await cctvService.getCCTVCountByRegion(
          this.selectedBigPosition,
          this.selectedSmallPosition || null
        )
        this.totalCCTVs = countData.count
      } catch (error) {
        console.error('CCTV 데이터를 불러오는 데 실패했습니다:', error)
        this.allCCTVs = []
        this.filteredCCTVs = []
        this.totalCCTVs = 0
      }

      this.closeDetailSidebar()
    },
    async loadMoreCCTVs() {
      if (!this.selectedBigPosition) return

      this.isLoadingMore = true
      try {
        const fetchedData = await cctvService.getCCTVsByRegion(
          this.selectedBigPosition,
          this.selectedSmallPosition || null,
          this.currentSkip,
          LOAD_MORE_STEP
        )

        this.allCCTVs = [...this.allCCTVs, ...fetchedData]
        this.filteredCCTVs = this.allCCTVs
        this.currentSkip += fetchedData.length
      } catch (error) {
        console.error('추가 CCTV 데이터를 불러오는 데 실패했습니다:', error)
      } finally {
        this.isLoadingMore = false
      }
    },
    resetFilters() {
      this.selectedBigPosition = ''
      this.selectedSmallPosition = ''
      this.allCCTVs = []
      this.filteredCCTVs = []
      this.totalCCTVs = 0
      this.currentSkip = 0
      this.closeDetailSidebar()
    },
    handleMarkerClick(cctv) {
      this.selectedCCTV = cctv
      this.isDetailSidebarOpen = true
    },
    closeDetailSidebar() {
      this.isDetailSidebarOpen = false
      this.selectedCCTV = null
    },
    toggleFilterSidebar() {
      this.isFilterSidebarOpen = !this.isFilterSidebarOpen
      this.closeDetailSidebar()
      // CSS 전환이 완료될 시간을 준 후 Kakao Map을 다시 그립니다.
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.kakaoMap && this.$refs.kakaoMap.map) {
            this.$refs.kakaoMap.map.relayout()
          }
        }, 300) // CSS transition 시간과 일치시킵니다.
      })
    },
    updateSmallPositions(bigPosition) {
      if (bigPosition && this.smallPositionsMap.has(bigPosition)) {
        this.smallPositions = Array.from(this.smallPositionsMap.get(bigPosition)).sort()
      } else {
        this.smallPositions = []
      }
    },
  },
}
</script>

<style scoped>
.monitoring-page {
  width: 100%;
  height: calc(100vh - 56px); /* 헤더 높이(56px)를 제외한 전체 높이 */
  display: flex;
  position: relative;
}

.sidebar-controls {
  width: 250px; /* 기본 너비 */
  flex-shrink: 0; /* 줄어들지 않음 */
  transition:
    width 0.3s ease-in-out,
    padding 0.3s ease-in-out,
    border-right 0.3s ease-in-out; /* 너비, 패딩, 경계선 변화 애니메이션 */
  overflow: hidden; /* 내용이 넘치면 숨김 */
  border-right: 1px solid #dee2e6;
}

.sidebar-controls.sidebar-hidden {
  width: 0; /* 숨겨질 때 너비를 0으로 */
  padding: 0 !important; /* 패딩도 제거 */
  border-right: none; /* 경계선 제거 */
}

.main-content-area {
  /* flex-grow: 1; 은 이미 클래스에 추가됨 */
  /* position: relative; 은 이미 클래스에 추가됨 */
  display: flex; /* KakaoMap이 내부 공간을 채우도록 */
}

.toggle-filter-btn {
  position: absolute;
  top: 10px;
  left: 10px; /* 기본 위치 */
  z-index: 1001; /* 다른 요소 위에 표시 */
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: left 0.3s ease-in-out; /* 위치 변화 애니메이션 */
}

.toggle-filter-btn.shifted {
  left: 260px; /* 필터 사이드바가 열려있을 때 위치 (필터 너비 250px + 여백 10px) */
}

.toggle-filter-btn .icon {
  width: 20px;
  height: 20px;
  color: #007bff; /* Bootstrap primary color */
}

/* KakaoMap.vue의 #map 스타일은 KakaoMap.vue 파일 내에 정의되어 있습니다. */
</style>
