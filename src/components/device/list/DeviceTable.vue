<template>
  <div class="table-responsive">
    <table class="table table-hover table-striped device-table">
      <thead class="table-dark">
        <tr>
          <th scope="col" class="col-id text-center">ID</th>
          <th scope="col" class="col-name text-center">기기 이름</th>
          <th scope="col" class="col-mac text-center">맥주소</th>
          <th scope="col" class="col-gender text-center">성별</th>
          <th scope="col" class="col-guardian-name text-center">보호자 이름</th>
          <th scope="col" class="col-guardian-relation text-center">보호자 관계</th>
          <th scope="col" class="col-guardian-phone text-center">보호자 연락처</th>
          <th scope="col" class="col-date text-center">등록일</th>
          <th scope="col" class="col-actions text-center">관리</th>
        </tr>
      </thead>
      <tbody>
        <DeviceTableRow v-for="device in devices" :key="device.id" :device="device" :is-deleting="isDeleting[macAddr]"
          @delete="handleDelete" />
      </tbody>
    </table>
  </div>
</template>

<script>
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
}

.device-table th {
  border-top: none;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
}

.device-table td {
  vertical-align: middle;
  padding: 0.75rem 0.5rem;
  text-align: center;
}

/* 컬럼별 너비 조정 */
.col-id {
  width: 8%;
}

.col-name {
  width: 15%;
}

.col-mac {
  width: 18%;
}

.col-gender {
  width: 10%;
}

.col-guardian-name {
  width: 12%;
}

.col-guardian-relation {
  width: 10%;
}

.col-guardian-phone {
  width: 15%;
}

.col-date {
  width: 15%;
}

.col-actions {
  width: 17%;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 1200px) {
  .device-table {
    font-size: 0.8rem;
  }
}
</style>
