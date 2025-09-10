<template>
  <tr>
    <td data-label="ID" class="text-center fw-medium text-muted">{{ device.id }}</td>
    <td data-label="사용자" class="fw-semibold text-dark">{{ device.name }}</td>
    <td data-label="MAC 주소">
      <code class="code-custom">{{ device.mac_address }}</code>
    </td>
    <td data-label="성별" class="text-center">
      <span :class="['badge', device.gender === 'M' ? 'badge-male' : 'badge-female']">
        {{ device.gender === 'M' ? '남성' : '여성' }}
      </span>
    </td>
    <td data-label="보호자" class="fw-medium">{{ device.guardian_name }}</td>
    <td data-label="관계">{{ device.guardian_relation }}</td>
    <td data-label="보호자 연락처">{{ device.guardian_phone }}</td>
    <td data-label="등록일" class="text-muted small">
      {{ formatDateTime(device.created_at) }}
    </td>
    <td data-label="관리" class="text-center">
      <div class="btn-group" role="group">
        <router-link
          :to="{
            name: 'device-detail',
            params: { macAddress: device.mac_address },
          }"
          class="btn btn-sm btn-outline-secondary"
        >
          상세/수정
        </router-link>
        <router-link
          :to="{ name: 'history', params: { macAddress: device.mac_address } }"
          class="btn btn-sm btn-outline-info"
        >
          히스토리
        </router-link>
        <button class="btn btn-sm btn-outline-danger" @click="handleDelete" :disabled="isDeleting">
          <span
            v-if="isDeleting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-else>삭제</span>
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
      const date = new Date(dateTimeString)
      return date.toLocaleDateString('ko-KR') + ' ' + date.toLocaleTimeString('ko-KR')
    },
    handleDelete() {
      this.$emit('delete', this.device.mac_address)
    },
  },
}
</script>

<style scoped>
/* 기존 스타일은 그대로 유지 */
td {
  white-space: nowrap;
}

.code-custom {
  background-color: #e9ecef;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
  color: #495057;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.6em;
  font-size: 0.8em;
}

.badge-male {
  background-color: #e3f2fd;
  color: #1e88e5;
}

.badge-female {
  background-color: #fff3e0;
  color: #fb8c00;
}

.btn-group .btn {
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
}

/* ✨ 버튼 간 간격 추가 ✨ */
.btn-group .btn + .btn {
  margin-left: 0.25rem;
}

/* 모바일 화면에서 badge와 code의 정렬을 맞추기 위한 스타일 */
@media (max-width: 992px) {
  td {
    white-space: normal; /* 모바일에서는 줄바꿈 허용 */
  }
  .badge,
  .code-custom,
  .btn-group {
    /* flex 컨테이너 안에서 오른쪽 정렬된 아이템들이 자연스럽게 보이도록 함 */
    width: 100%;
    text-align: right;
  }
  .btn-group {
    justify-content: flex-end;
  }
}
</style>
