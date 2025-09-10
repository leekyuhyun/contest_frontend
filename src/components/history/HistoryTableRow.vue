<template>
  <tr>
    <td data-label="분석 시간" class="timestamp-cell">
      {{ formatDateTime(prediction.created_at) }}
    </td>
    <td data-label="상황 ID">{{ prediction.situation_id }}</td>
    <td data-label="범죄 여부">
      <span class="badge" :class="prediction.is_crime ? 'badge-danger' : 'badge-success'">
        {{ prediction.is_crime ? '범죄 의심' : '정상' }}
      </span>
    </td>
    <td data-label="AI 분석 결과">{{ prediction.crime_type || 'N/A' }}</td>
    <td data-label="확률" class="text-center">
      {{ formatProbability(prediction.crime_probability) }}
    </td>
    <td data-label="음성 STT 결과" class="stt-cell">{{ prediction.stt_result || '-' }}</td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryTableRow',
  props: { prediction: { type: Object, required: true } },
  methods: {
    formatDateTime(timestamp) {
      if (!timestamp) return '-'
      return new Date(timestamp).toLocaleString('ko-KR')
    },
    formatProbability(prob) {
      if (prob === null || prob === undefined) return '-'
      return `${(prob * 100).toFixed(1)}%`
    },
  },
}
</script>

<style scoped>
td {
  vertical-align: middle;
  padding: 0.75rem 1rem;
}
.timestamp-cell {
  white-space: nowrap;
  color: #4a5568;
}
.stt-cell {
  max-width: 300px;
  white-space: normal; /* 모바일에서도 잘 보이도록 줄바꿈 허용 */
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: italic;
  color: #718096;
}
.badge {
  font-weight: 500;
  padding: 0.35em 0.6em;
  font-size: 0.8em;
}
.badge-danger {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
}
.badge-success {
  background-color: #f0fff4;
  color: #2f855a;
  border: 1px solid #9ae6b4;
}

/* Mobile Responsive */
@media (max-width: 992px) {
  tr {
    display: block;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #fff;
  }
  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    text-align: right;
  }
  td:last-child {
    border-bottom: none;
  }
  td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #4a5568;
    margin-right: 1rem;
    text-align: left;
  }
  .stt-cell {
    white-space: normal;
  }
}
</style>
