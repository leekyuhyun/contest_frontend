<template>
  <div class="registration-container">
    <div class="container-fluid px-4">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card card-modern">
            <div class="card-body card-body-modern">
              <h2 class="text-center mb-4 registration-title">등록된 스마트 기기 목록</h2>

              <!-- Replaced loading state with LoadingSpinner component -->
              <LoadingSpinner v-if="isLoading" message="기기 목록을 불러오는 중..." />

              <!-- Replaced table with DeviceTable component -->
              <DeviceTable v-else-if="devices.length > 0" :devices="devices" :is-deleting="isDeleting"
                @delete="removeDevice" />

              <!-- Replaced empty state with EmptyState component -->
              <EmptyState v-else message="아직 등록된 기기가 없습니다." link-to="/register-device" link-text="새 기기 등록하기" />

              <!-- 메시지 -->
              <div v-if="message" :class="[
                'alert mt-3',
                messageType === 'success' ? 'alert-success' : 'alert-danger',
              ]">
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
      isDeleting: {}, // 각 기기 ID별 삭제 로딩 상태
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
        console.log(this.devices)
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || '기기 목록을 불러오는 데 실패했습니다.'
        this.setMessage(errorMessage, 'danger')
      } finally {
        this.isLoading = false
      }
    },
    async removeDevice(macAddr) {
      if (confirm(`기기 ID: ${macAddr}을(를) 정말로 삭제하시겠습니까?`)) {
        this.isDeleting[macAddr] = true
        this.message = ''
        try {
          await deviceService.deleteDevice(macAddr)
          this.setMessage(`기기 ID: ${macAddr}이(가) 삭제되었습니다.`, 'success')
          await this.fetchDevices() // 목록 새로고침
        } catch (error) {
          const errorMessage =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            '기기 삭제에 실패했습니다.'
          this.setMessage(errorMessage, 'danger')
        } finally {
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
/* DeviceRegistration과 동일한 보라색 그라데이션 스타일 적용 */
.registration-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
  animation: slideInUp 0.8s ease-out;
}

.card-modern {
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-body-modern {
  padding: 3rem;
}

.registration-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 2rem;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
