<template>
  <div class="device-registration-page">
    <!-- Replaced hero section with HeroSection component -->
    <HeroSection />

    <div class="form-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="registration-card">
              <!-- Replaced progress section with ProgressSection component -->
              <ProgressSection :progressPercentage="progressPercentage" />

              <div class="card-body-modern">
                <form @submit.prevent="registerDevice">
                  <!-- Replaced device info section with DeviceInfoSection component -->
                  <DeviceInfoSection
                    :macAddress="newDevice.mac_address"
                    :isValidMacAddress="isValidMacAddress"
                    @update:macAddress="updateMacAddress"
                  />

                  <!-- Replaced user info section with UserInfoSection component -->
                  <UserInfoSection
                    :userInfo="{
                      name: newDevice.name,
                      gender: newDevice.gender,
                      birthDate: newDevice.birth_date,
                      phone: newDevice.phone,
                    }"
                    @update:userInfo="updateUserInfo"
                  />

                  <!-- Replaced guardian info section with GuardianInfoSection component -->
                  <GuardianInfoSection
                    :guardianInfo="{
                      name: newDevice.guardian_name,
                      relation: newDevice.guardian_relation,
                      phone: newDevice.guardian_phone,
                    }"
                    @update:guardianInfo="updateGuardianInfo"
                  />

                  <!-- Replaced form actions with FormActionsSection component -->
                  <FormActionsSection
                    :isSubmitting="isSubmitting"
                    :isFormValid="isFormValid"
                    @reset="resetForm"
                  />
                </form>

                <div
                  v-if="message"
                  :class="['message-modern', messageType === 'success' ? 'success' : 'error']"
                >
                  <i
                    :class="[
                      'fas',
                      messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle',
                    ]"
                  ></i>
                  {{ message }}
                </div>

                <!-- Replaced help section with HelpSection component -->
                <HelpSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from '@/components/device/registration/HeroSection.vue'
import ProgressSection from '@/components/device/registration/ProgressSection.vue'
import DeviceInfoSection from '@/components/device/registration/DeviceInfoSection.vue'
import UserInfoSection from '@/components/device/registration/UserInfoSection.vue'
import GuardianInfoSection from '@/components/device/registration/GuardianInfoSection.vue'
import FormActionsSection from '@/components/device/registration/FormActionsSection.vue'
import HelpSection from '@/components/device/registration/HelpSection.vue'
import { deviceService } from '@/services/deviceService'

export default {
  name: 'DeviceRegistration',
  components: {
    HeroSection,
    ProgressSection,
    DeviceInfoSection,
    UserInfoSection,
    GuardianInfoSection,
    FormActionsSection,
    HelpSection,
  },
  data() {
    return {
      newDevice: {
        mac_address: '',
        name: '',
        gender: '',
        birth_date: '',
        phone: '',
        guardian_name: '',
        guardian_relation: '',
        guardian_phone: '',
      },
      isSubmitting: false,
      message: '',
      messageType: '',
    }
  },
  computed: {
    isFormValid() {
      return (
        this.newDevice.mac_address &&
        this.isValidMacAddress &&
        this.newDevice.name &&
        this.newDevice.gender &&
        this.newDevice.birth_date &&
        this.newDevice.phone &&
        this.isValidPhoneNumber(this.newDevice.phone) &&
        this.newDevice.guardian_name &&
        this.newDevice.guardian_relation &&
        this.newDevice.guardian_phone &&
        this.isValidPhoneNumber(this.newDevice.guardian_phone)
      )
    },
    progressPercentage() {
      const fields = [
        this.newDevice.mac_address,
        this.newDevice.name,
        this.newDevice.gender,
        this.newDevice.birth_date,
        this.newDevice.phone,
        this.newDevice.guardian_name,
        this.newDevice.guardian_relation,
        this.newDevice.guardian_phone,
      ]
      const filledFields = fields.filter(field => field && field.trim() !== '').length
      return Math.round((filledFields / fields.length) * 100)
    },
    isValidMacAddress() {
      if (!this.newDevice.mac_address) return false
      const macRegex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/
      return macRegex.test(this.newDevice.mac_address)
    },
  },
  methods: {
    updateMacAddress(value) {
      let cleanValue = value.replace(/[^0-9A-Fa-f]/g, '')
      if (cleanValue.length > 12) cleanValue = cleanValue.substring(0, 12)
      const formatted = cleanValue.replace(/(.{2})(?=.)/g, '$1:')
      this.newDevice.mac_address = formatted.toUpperCase()
    },
    updateUserInfo(userInfo) {
      this.newDevice.name = userInfo.name
      this.newDevice.gender = userInfo.gender
      this.newDevice.birth_date = userInfo.birthDate

      // Format phone number
      let phone = userInfo.phone.replace(/[^0-9]/g, '')
      if (phone.length > 11) phone = phone.substring(0, 11)
      if (phone.length >= 7) {
        phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      } else if (phone.length >= 4) {
        phone = phone.replace(/(\d{3})(\d{4})/, '$1-$2')
      }
      this.newDevice.phone = phone
    },
    updateGuardianInfo(guardianInfo) {
      this.newDevice.guardian_name = guardianInfo.name
      this.newDevice.guardian_relation = guardianInfo.relation

      // Format guardian phone number
      let phone = guardianInfo.phone.replace(/[^0-9]/g, '')
      if (phone.length > 11) phone = phone.substring(0, 11)
      if (phone.length >= 7) {
        phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      } else if (phone.length >= 4) {
        phone = phone.replace(/(\d{3})(\d{4})/, '$1-$2')
      }
      this.newDevice.guardian_phone = phone
    },
    isValidPhoneNumber(phone) {
      if (!phone) return false
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
      return phoneRegex.test(phone)
    },
    async registerDevice() {
      if (!this.validateForm()) {
        this.setMessage('모든 필수 필드를 올바르게 입력해주세요.', 'danger')
        return
      }
      this.isSubmitting = true
      this.message = ''
      try {
        console.log('등록 요청 데이터:', this.newDevice)
        const response = await deviceService.createDevice(this.newDevice)
        console.log('등록 성공 응답:', response)
        this.setMessage(
          `🎉 "${response.name}"님의 기기 (MAC: ${response.mac_address})가 성공적으로 등록되었습니다!`,
          'success'
        )
        this.resetForm()
        setTimeout(() => {
          this.$router.push('/device-list')
        }, 3000)
      } catch (error) {
        console.error('등록 실패 에러:', error)
        let errorMessage = '기기 등록에 실패했습니다.'
        if (error.response?.data?.detail) {
          if (typeof error.response.data.detail === 'string') {
            errorMessage = error.response.data.detail
          } else if (Array.isArray(error.response.data.detail)) {
            errorMessage = error.response.data.detail
              .map(err => err.msg || err.message || err)
              .join(', ')
          }
        } else if (error.message) {
          errorMessage = `네트워크 오류: ${error.message}`
        }
        this.setMessage(errorMessage, 'danger')
      } finally {
        this.isSubmitting = false
      }
    },
    validateForm() {
      if (!this.isValidMacAddress) {
        console.log('MAC 주소 형식 오류:', this.newDevice.mac_address)
        return false
      }
      if (
        !this.isValidPhoneNumber(this.newDevice.phone) ||
        !this.isValidPhoneNumber(this.newDevice.guardian_phone)
      ) {
        console.log('전화번호 형식 오류:', this.newDevice.phone, this.newDevice.guardian_phone)
        return false
      }
      const birthDate = new Date(this.newDevice.birth_date)
      const today = new Date()
      if (birthDate > today) {
        console.log('생년월일 오류: 미래 날짜')
        return false
      }
      return this.isFormValid
    },
    resetForm() {
      this.newDevice = {
        mac_address: '',
        name: '',
        gender: '',
        birth_date: '',
        phone: '',
        guardian_name: '',
        guardian_relation: '',
        guardian_phone: '',
      }
      this.message = ''
      this.messageType = ''
    },
    setMessage(msg, type) {
      this.message = msg
      this.messageType = type
      const timeout = type === 'success' ? 5000 : 10000
      setTimeout(() => {
        this.message = ''
        this.messageType = ''
      }, timeout)
    },
  },
}
</script>

<style scoped>
.device-registration-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.form-section {
  padding: 2rem 0 4rem;
}

.registration-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideInUp 0.8s ease-out;
}

.card-body-modern {
  padding: 3rem;
}

.message-modern {
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
}

.message-modern.success {
  background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
  color: #22543d;
  border: 1px solid #9ae6b4;
}

.message-modern.error {
  background: linear-gradient(135deg, #fed7d7, #feb2b2);
  color: #742a2a;
  border: 1px solid #feb2b2;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
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
