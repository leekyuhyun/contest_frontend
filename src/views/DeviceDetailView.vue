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
                  <div class="info-section">
                    <h5 class="section-title">기기 정보</h5>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="deviceId" class="form-label">기기 ID</label>
                        <input
                          type="text"
                          class="form-control"
                          id="deviceId"
                          v-model="device.id"
                          disabled
                        />
                        <div class="form-text text-muted">기기 ID는 수정할 수 없습니다.</div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="macAddress" class="form-label">맥주소 (MAC Address)</label>
                        <input
                          type="text"
                          class="form-control"
                          id="macAddress"
                          v-model="device.mac_address"
                          disabled
                        />
                        <div class="form-text text-muted">맥주소는 수정할 수 없습니다.</div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="deviceName" class="form-label">기기 이름</label>
                      <input
                        type="text"
                        class="form-control"
                        id="deviceName"
                        v-model="device.name"
                        required
                        placeholder="예: 왕곽봉님 기기"
                      />
                    </div>
                  </div>

                  <!-- 사용자 정보 (백엔드에 'user_name' 필드가 없으므로 제거) -->
                  <div class="info-section">
                    <h5 class="section-title">사용자 정보</h5>
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label for="gender" class="form-label">성별</label>
                        <select class="form-select" id="gender" v-model="device.gender" required>
                          <option value="">선택</option>
                          <option value="M">남성</option>
                          <option value="F">여성</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label for="birthDate" class="form-label">생년월일</label>
                        <input
                          type="date"
                          class="form-control"
                          id="birthDate"
                          v-model="device.birth_date"
                          required
                        />
                        <div class="form-text text-muted">YYYY-MM-DD 형식으로 입력</div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <label for="phone" class="form-label">연락처</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="phone"
                          v-model="device.phone"
                          required
                          placeholder="예: 010-1234-5678"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- 보호자 정보 -->
                  <div class="info-section">
                    <h5 class="section-title">보호자 정보</h5>
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <label for="guardianName" class="form-label">보호자 이름</label>
                        <input
                          type="text"
                          class="form-control"
                          id="guardianName"
                          v-model="device.guardian_name"
                          required
                        />
                      </div>
                      <div class="col-md-4 mb-3">
                        <label for="guardianRelation" class="form-label">보호자 관계</label>
                        <input
                          type="text"
                          class="form-control"
                          id="guardianRelation"
                          v-model="device.guardian_relation"
                          required
                          placeholder="예: 부, 모, 자녀"
                        />
                      </div>
                      <div class="col-md-4 mb-3">
                        <label for="guardianPhone" class="form-label">보호자 연락처</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="guardianPhone"
                          v-model="device.guardian_phone"
                          required
                          placeholder="예: 010-9876-5432"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- 버튼 스타일 개선 -->
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
              <div v-if="message" class="message-container mt-4">
                <div
                  :class="[
                    'message-modern',
                    messageType === 'success' ? 'message-success' : 'message-error',
                  ]"
                >
                  {{ message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceService } from '@/services/deviceService'

export default {
  name: 'DeviceDetailView',
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
          birth_date: fetchedDevice.birth_date, // YYYY-MM-DD 문자열
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
/* DeviceRegistration과 동일한 스타일 적용 */
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

.info-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  border-left: 4px solid #667eea;
}

.section-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.form-control,
.form-select {
  border-radius: 10px;
  border: 2px solid #e9ecef;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.form-control:disabled {
  background-color: #f8f9fa;
  border-color: #dee2e6;
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

.message-container {
  display: flex;
  justify-content: center;
}

.message-modern {
  padding: 1rem 2rem;
  border-radius: 15px;
  color: white;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  animation: slideInUp 0.3s ease-out;
}

.message-success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.message-error {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
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

  .info-section {
    padding: 1rem;
  }
}
</style>
