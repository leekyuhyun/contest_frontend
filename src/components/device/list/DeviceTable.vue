<template>
  <div class="table-responsive-wrapper">
    <table class="table table-hover device-table responsive-table">
      <thead class="table-header-custom">
        <tr>
          <th scope="col" class="text-center">ID</th>
          <th scope="col">사용자</th>
          <th scope="col">MAC 주소</th>
          <th scope="col" class="text-center">성별</th>
          <th scope="col">보호자</th>
          <th scope="col">관계</th>
          <th scope="col">보호자 연락처</th>
          <th scope="col">등록일</th>
          <th scope="col" class="text-center">관리</th>
        </tr>
      </thead>
      <tbody>
        <DeviceTableRow
          v-for="device in devices"
          :key="device.mac_address"
          :device="device"
          :is-deleting="isDeleting[device.mac_address]"
          @delete="handleDelete"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
// ... 기존 스크립트 내용은 그대로 유지 ...
import DeviceTableRow from './DeviceTableRow.vue'

export default {
  name: 'DeviceTable',
  components: {
    DeviceTableRow,
  },
  props: {
    devices: {
      type: Array,
      required: true,
    },
    isDeleting: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleDelete(macAddr) {
      this.$emit('delete', macAddr)
    },
  },
}
</script>

<style scoped>
.device-table {
  margin-bottom: 0;
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

.device-table td {
  vertical-align: middle;
  padding: 0.75rem 1rem;
}

.table-responsive-wrapper {
  border-radius: 10px;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
}

.table-hover tbody tr:hover {
  background-color: #f7fafc;
}

/* 모바일 반응형 스타일 */
@media (max-width: 992px) {
  /* 992px 이하에서 카드 형태로 변경 */
  .responsive-table {
    border: none;
  }

  .responsive-table thead {
    display: none; /* 헤더 숨기기 */
  }

  .responsive-table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .responsive-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e9ecef;
    text-align: right;
  }

  .responsive-table tr td:last-child {
    border-bottom: none;
  }

  .responsive-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #4a5568;
    margin-right: 1rem;
    text-align: left;
  }
}
</style>
