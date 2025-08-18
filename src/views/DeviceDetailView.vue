<template>
  <div class="page-background">
    <div class="container-fluid py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card card-modern">
            <div class="card-body card-body-modern">
              <h2 class="text-center mb-4 text-dark">기기 상세 정보 및 수정</h2>

              <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">기기 정보를 불러오는 중...</p>
              </div>

              <div v-else-if="device">
                <form @submit.prevent="updateDevice">
                  <!-- 기기 정보 -->
                  <DeviceInfoSection :device="device" @update:name="device.name = $event" />

                  <!-- 사용자 정보 (백엔드에 'user_name' 필드가 없으므로 제거) -->
                  <UserInfoSection
                    :device="device"
                    @update:gender="device.gender = $event"
                    @update:birthDate="device.birth_date = $event"
                    @update:phone="device.phone = $event"
                  />

                  <!-- 보호자 정보 -->
                  <GuardianInfoSection
                    :device="device"
                    @update:guardianName="device.guardian_name = $event"
                    @update:guardianRelation="device.guardian_relation = $event"
                    @update:guardianPhone="device.guardian_phone = $event"
                  />

                  <div class="text-center mt-4">
                    <button
                      type="submit"
                      class="btn btn-modern btn-lg px-5"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? '수정 중...' : '정보 수정' }}
                    </button>
                  </div>
                </form>
              </div>

              <div v-else class="text-center text-muted py-5">
                <p>기기 정보를 찾을 수 없습니다.</p>
                <router-link to="/device-list" class="btn btn-outline-secondary mt-3">
                  기기 목록으로 돌아가기
                </router-link>
              </div>

              <!-- 메시지 스타일을 그라데이션 배경으로 변경 -->
              <MessageAlert :message="message" :messageType="messageType" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceService } from '@/services/deviceService'
import DeviceInfoSection from '@/components/device/detail/DeviceInfoSection.vue'
import UserInfoSection from '@/components/device/detail/UserInfoSection.vue'
import GuardianInfoSection from '@/components/device/detail/GuardianInfoSection.vue'
import MessageAlert from '@/components/device/detail/MessageAlert.vue'

export default {
  name: 'DeviceDetailView',
  components: {
    DeviceInfoSection,
    UserInfoSection,
    GuardianInfoSection,
    MessageAlert,
  },
  props: ['deviceId'],
  data() {
    return {
      device: null,
      isLoading: true,
      isSubmitting: false,
      message: '',
      messageType: '',
    }
  },
  async mounted() {
    await this.fetchDeviceDetails()
  },
  methods: {
    async fetchDeviceDetails() {
      this.isLoading = true
      this.message = ''
      try {
        const fetchedDevice = await deviceService.getDevice(this.deviceId)
        this.device = {
          id: fetchedDevice.id,
          mac_address: fetchedDevice.mac_address,
          name: fetchedDevice.name,
          gender: fetchedDevice.gender,
          birth_date: fetchedDevice.birth_date,
          phone: fetchedDevice.phone,
          guardian_name: fetchedDevice.guardian_name,
          guardian_relation: fetchedDevice.guardian_relation,
          guardian_phone: fetchedDevice.guardian_phone,
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || '기기 정보를 불러오는 데 실패했습니다.'
        this.setMessage(errorMessage, 'danger')
        this.device = null
      } finally {
        this.isLoading = false
      }
    },
    async updateDevice() {
      if (!this.validateForm()) {
        this.setMessage('모든 필수 필드를 채워주세요.', 'danger')
        return
      }

      this.isSubmitting = true
      this.message = ''

      try {
        const payload = {
          mac_address: this.device.mac_address,
          name: this.device.name,
          gender: this.device.gender,
          birth_date: this.device.birth_date,
          phone: this.device.phone,
          guardian_name: this.device.guardian_name,
          guardian_relation: this.device.guardian_relation,
          guardian_phone: this.device.guardian_phone,
        }

        const response = await deviceService.updateDevice(this.deviceId, payload)
        this.setMessage(
          `기기 "${response.name}" (MAC: ${response.mac_address}) 정보가 성공적으로 업데이트되었습니다!`,
          'success'
        )
        await this.fetchDeviceDetails()
      } catch (error) {
        const errorMessage = error.response?.data?.detail || '기기 정보 업데이트에 실패했습니다.'
        this.setMessage(errorMessage, 'danger')
      } finally {
        this.isSubmitting = false
      }
    },
    validateForm() {
      return (
        this.device.name &&
        this.device.gender &&
        this.device.birth_date &&
        this.device.phone &&
        this.device.guardian_name &&
        this.device.guardian_relation &&
        this.device.guardian_phone
      )
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
  watch: {
    deviceId: 'fetchDeviceDetails',
  },
}
</script>

<style scoped>
.page-background {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.card-modern {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: none;
  animation: slideInUp 0.6s ease-out;
}

.card-body-modern {
  padding: 3rem;
}

.btn-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-modern:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.btn-modern:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border {
  color: #667eea !important;
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

@media (max-width: 768px) {
  .card-body-modern {
    padding: 2rem 1.5rem;
  }
}
</style>
