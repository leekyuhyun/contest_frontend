<template>
  <div class="table-responsive">
    <table class="table table-hover history-table">
      <thead class="table-header-custom">
        <tr>
          <th scope="col">분석 시간</th>
          <th scope="col">상황 ID</th>
          <th scope="col">범죄 여부</th>
          <th scope="col">범죄 유형</th>
          <th scope="col" class="text-center">확률</th>
          <th scope="col">STT 결과</th>
        </tr>
      </thead>
      <tbody>
        <HistoryTableRow
          v-for="prediction in predictions"
          :key="prediction.id"
          :prediction="prediction"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import HistoryTableRow from './HistoryTableRow.vue'

export default {
  name: 'HistoryTable',
  components: { HistoryTableRow },
  props: { predictions: { type: Array, required: true } },
}
</script>

<style scoped>
.history-table {
  font-size: 0.9rem;
  border-collapse: separate;
  border-spacing: 0;
}
.table-header-custom th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #e2e8f0;
  color: #4a5568;
  font-weight: 600;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.75rem 1rem;
}
.table-responsive {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

/* Mobile Responsive */
@media (max-width: 992px) {
  .table-header-custom {
    display: none;
  }
  .history-table,
  .history-table tbody,
  .history-table tr {
    display: block;
  }
  .table-responsive {
    border: none;
    background-color: transparent;
    padding: 0;
  }
}
</style>
