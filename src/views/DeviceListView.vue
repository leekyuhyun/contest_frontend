<template>
  <div class="device-list-page">
    <div class="container-fluid px-md-4 px-2">
      <div class="page-header">
        <h1 class="page-title">등록 기기 목록</h1>
        <p class="page-subtitle">시스템에 등록된 모든 기기를 확인하고 관리합니다.</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card card-modern">
            <div class="card-body card-body-modern">
              <LoadingSpinner v-if="isLoading" message="기기 목록을 불러오는 중..." />

              <DeviceTable
                v-else-if="devices.length > 0"
                :devices="devices"
                :is-deleting="isDeleting"
                @delete="removeDevice"
              />

              <EmptyState
                v-else
                message="아직 등록된 기기가 없습니다."
                link-to="/register-device"
                link-text="새 기기 등록하기"
              />

              <div
                v-if="message"
                :class="[
                  'alert mt-4',
                  messageType === 'success' ? 'alert-success' : 'alert-danger',
                ]"
                role="alert"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceService } from '../services/deviceService'
import LoadingSpinner from '../components/device/list/LoadingSpinner.vue'
import EmptyState from '../components/device/list/EmptyState.vue'
import DeviceTable from '../components/device/list/DeviceTable.vue'

export default {
  name: 'DeviceListView',
  components: {
    LoadingSpinner,
    EmptyState,
    DeviceTable,
  },
  data() {
    return {
      devices: [],
      isLoading: true,
      isDeleting: {},
      message: '',
      messageType: '',
    }
  },
  async mounted() {
    await this.fetchDevices()
  },
  methods: {
    async fetchDevices() {
      this.isLoading = true
      this.message = ''
      try {
        this.devices = await deviceService.getAllDevices()
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || '기기 목록을 불러오는 데 실패했습니다.'
        this.setMessage(errorMessage, 'danger')
      } finally {
        this.isLoading = false
      }
    },
    async removeDevice(macAddr) {
      if (confirm(`MAC 주소: ${macAddr} 기기를 정말로 삭제하시겠습니까?`)) {
        // this.$set 대신 직접 할당
        this.isDeleting[macAddr] = true
        this.message = ''
        try {
          await deviceService.deleteDevice(macAddr)
          this.setMessage(`기기(MAC: ${macAddr})가 삭제되었습니다.`, 'success')
          await this.fetchDevices()
        } catch (error) {
          const errorMessage =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            '기기 삭제에 실패했습니다.'
          this.setMessage(errorMessage, 'danger')
        } finally {
          // this.$set 대신 직접 할당
          this.isDeleting[macAddr] = false
        }
      }
    },

    setMessage(msg, type) {
      this.message = msg
      this.messageType = type
      setTimeout(() => {
        this.message = ''
        this.messageType = ''
      }, 5000)
    },
  },
}
</script>

<style scoped>
.device-list-page {
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #718096;
}

.card-modern {
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.card-body-modern {
  padding: 2.5rem;
}

.alert {
  border-radius: 8px;
}

/* 모바일 화면에서 패딩 조정 */
@media (max-width: 768px) {
  .device-list-page {
    padding: 1rem 0;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .card-body-modern {
    padding: 1rem;
  }
}
</style>
