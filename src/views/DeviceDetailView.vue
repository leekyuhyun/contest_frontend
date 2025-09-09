<template>
  <div class="device-detail-page">
    <div class="container py-4">
      <div class="page-header mb-4">
        <router-link to="/device-list" class="btn btn-outline-secondary btn-sm back-button">
          <i class="fas fa-arrow-left me-2"></i>목록으로 돌아가기
        </router-link>
        <h1 class="page-title">기기 상세 정보</h1>
        <p class="page-subtitle">{{ macAddress }}</p>
      </div>

      <MessageAlert :message="message" :messageType="messageType" v-if="message" />

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">기기 정보를 불러오는 중입니다...</p>
      </div>

      <div v-else-if="device" class="row g-4">
        <div class="col-lg-8">
          <div class="card card-modern">
            <div class="card-body">
              <UserInfoSection
                :device="device"
                :is-editing="isUserEditing"
                @update="updateDeviceData"
              />
              <div class="d-flex justify-content-end mt-3">
                <button v-if="!isUserEditing" @click="toggleEdit('user')" class="btn btn-primary">
                  수정
                </button>
                <template v-else>
                  <button @click="saveChanges" class="btn btn-success me-2">저장</button>
                  <button @click="cancelEdit('user')" class="btn btn-secondary">취소</button>
                </template>
              </div>
            </div>
          </div>
          <div class="card card-modern mt-4">
            <div class="card-body">
              <GuardianInfoSection
                :device="device"
                :is-editing="isGuardianEditing"
                @update="updateDeviceData"
              />
              <div class="d-flex justify-content-end mt-3">
                <button
                  v-if="!isGuardianEditing"
                  @click="toggleEdit('guardian')"
                  class="btn btn-primary"
                >
                  수정
                </button>
                <template v-else>
                  <button @click="saveChanges" class="btn btn-success me-2">저장</button>
                  <button @click="cancelEdit('guardian')" class="btn btn-secondary">취소</button>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card card-modern">
            <div class="card-body">
              <DeviceInfoSection :device="device" />
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!isLoading && !device" class="text-center py-5">
        <h2>기기 정보를 찾을 수 없습니다.</h2>
        <p>요청하신 MAC 주소의 기기가 존재하지 않거나, 정보를 불러오는 데 실패했습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceService } from '../services/deviceService'
import DeviceInfoSection from '../components/device/detail/DeviceInfoSection.vue'
import UserInfoSection from '../components/device/detail/UserInfoSection.vue'
import GuardianInfoSection from '../components/device/detail/GuardianInfoSection.vue'
import MessageAlert from '../components/device/detail/MessageAlert.vue'

export default {
  name: 'DeviceDetailView',
  components: {
    DeviceInfoSection,
    UserInfoSection,
    GuardianInfoSection,
    MessageAlert,
  },
  props: ['macAddress'],
  data() {
    return {
      device: null,
      originalDevice: null,
      isLoading: true,
      isUserEditing: false,
      isGuardianEditing: false,
      message: '',
      messageType: '',
    }
  },
  async created() {
    await this.fetchDeviceDetails()
  },
  methods: {
    async fetchDeviceDetails() {
      this.isLoading = true
      try {
        const data = await deviceService.getDeviceByMac(this.macAddress)
        this.device = { ...data }
        this.originalDevice = { ...data }
      } catch (error) {
        this.setMessage('기기 정보를 불러오는 데 실패했습니다.', 'danger')
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    toggleEdit(section) {
      if (section === 'user') this.isUserEditing = !this.isUserEditing
      if (section === 'guardian') this.isGuardianEditing = !this.isGuardianEditing
    },
    cancelEdit(section) {
      this.device = { ...this.originalDevice }
      this.toggleEdit(section)
    },
    updateDeviceData(updatedData) {
      this.device = { ...this.device, ...updatedData }
    },
    async saveChanges() {
      try {
        const updatedData = await deviceService.updateDevice(this.macAddress, this.device)
        this.device = { ...updatedData }
        this.originalDevice = { ...updatedData }
        this.isUserEditing = false
        this.isGuardianEditing = false
        this.setMessage('성공적으로 업데이트되었습니다.', 'success')
      } catch (error) {
        this.setMessage('업데이트에 실패했습니다. 다시 시도해주세요.', 'danger')
        console.error(error)
      }
    },
    setMessage(msg, type) {
      this.message = msg
      this.messageType = type
      setTimeout(() => {
        this.message = ''
      }, 5000)
    },
  },
}
</script>

<style scoped>
.device-detail-page {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  position: relative;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.page-subtitle {
  font-family: 'Courier New', Courier, monospace;
  color: #718096;
  background-color: #e2e8f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.9rem;
}

.card-modern {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .page-header {
    padding-top: 50px; /* 버튼과의 공간 확보 */
  }
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
