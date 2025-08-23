<template>
  <tr>
    <td class="fw-bold text-center">{{ device.id }}</td>
    <td class="fw-semibold text-primary text-center">{{ device.name }}</td>
    <td class="text-center">
      <code class="bg-light px-2 py-1 rounded">{{ device.mac_address }}</code>
    </td>
    <td class="text-center">
      <span :class="['badge', device.gender === 'M' ? 'bg-info' : 'bg-warning']">
        {{ device.gender === 'M' ? '남성' : '여성' }}
      </span>
    </td>
    <td class="fw-semibold text-center">{{ device.guardian_name }}</td>
    <td class="text-center">{{ device.guardian_relation }}</td>
    <td class="text-center">{{ device.guardian_phone }}</td>
    <td class="text-muted small text-center">
      {{ formatDateTime(device.created_at) }}
    </td>
    <td class="text-center">
      <div class="btn-group" role="group">
        <router-link :to="{
          name: 'device-detail',
          params: { macAddress: device.mac_address },
        }" class="btn btn-sm btn-outline-info">
          상세 보기
        </router-link>
        <button class="btn btn-sm btn-outline-danger" @click="handleDelete" :disabled="isDeleting">
          {{ isDeleting ? '삭제 중...' : '삭제' }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DeviceTableRow',
  props: {
    device: {
      type: Object,
      required: true,
    },
    isDeleting: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '-'
      return new Date(dateTimeString).toLocaleString('ko-KR')
    },
    handleDelete() {
      this.$emit('delete', this.device.id)
    },
  },
}
</script>

<style scoped>
.btn-group .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

@media (max-width: 1200px) {
  .btn-group .btn {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
}
</style>
