<template>
  <div class="history-page">
    <div class="container-fluid">
      <header class="page-header">
        <h1 class="page-title">
          <i class="fas fa-archive"></i>
          상황 분석 히스토리
        </h1>
        <p class="page-subtitle">
          {{
            macAddress
              ? `${macAddress} 기기의 분석 기록입니다.`
              : '과거에 발생했던 모든 AI 분석 기록을 조회합니다.'
          }}
        </p>
      </header>

      <main class="history-panel">
        <div class="table-container mt-4">
          <div v-if="isLoading" class="state-message">
            <div class="spinner-border text-primary" role="status"></div>
            <p>데이터를 불러오는 중입니다...</p>
          </div>
          <div v-else-if="historyData.items.length === 0" class="state-message">
            <i class="fas fa-info-circle"></i>
            <p>표시할 히스토리 데이터가 없습니다.</p>
          </div>
          <div v-else>
            <HistoryTable :predictions="historyData.items" />
            <Pagination
              :current-page="historyData.page"
              :total-pages="totalPages"
              @page-changed="handlePageChange"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { historyService } from '@/services/historyService.js'
import HistoryTable from '@/components/history/HistoryTable.vue'
import Pagination from '@/components/history/Pagination.vue'
// HistoryFilter import가 제거되었습니다.

export default {
  name: 'HistoryView',
  components: {
    HistoryTable,
    Pagination,
    // HistoryFilter 컴포넌트가 제거되었습니다.
  },
  props: {
    macAddress: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const historyData = ref({ items: [], total: 0, page: 1, page_size: 10 })
    const isLoading = ref(true)

    // ✨ URL 파라미터로 받은 macAddress를 바로 사용합니다. ✨
    const selectedMac = ref(props.macAddress)

    const totalPages = computed(() =>
      Math.ceil(historyData.value.total / historyData.value.page_size)
    )

    const loadHistory = async (page = 1) => {
      isLoading.value = true
      try {
        const data = await historyService.getHistory(
          page,
          historyData.value.page_size,
          selectedMac.value // URL 파라미터 값을 필터링 조건으로 사용
        )
        historyData.value = data
      } finally {
        isLoading.value = false
      }
    }

    // applyFilter 함수가 제거되었습니다.

    const handlePageChange = page => {
      loadHistory(page)
    }

    onMounted(() => {
      loadHistory(1)
    })

    return {
      historyData,
      isLoading,
      totalPages,
      handlePageChange,
      macAddress: props.macAddress, // 부제목에 사용하기 위해 반환
    }
  },
}
</script>

<style scoped>
/* 기존 스타일은 그대로 유지 */
.history-page {
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
  padding: 2rem;
}
.page-header {
  text-align: center;
  margin-bottom: 2rem;
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
.history-panel {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}
.state-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #a0aec0;
}
.state-message i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .history-page {
    padding: 1rem;
  }
  .history-panel {
    padding: 1rem;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
