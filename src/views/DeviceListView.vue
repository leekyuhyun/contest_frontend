<template>
  <div class="registration-container">
    <div class="container-fluid px-4">
      <div class="row justify-content-center">
        <!-- 컨테이너를 더 넓게 변경하고 여백 조정 -->
        <div class="col-12">
          <div class="card card-modern">
            <div class="card-body card-body-modern">
              <h2 class="text-center mb-4 registration-title">등록된 스마트 기기 목록</h2>

              <!-- 로딩 상태 -->
              <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">기기 목록을 불러오는 중...</p>
              </div>

              <!-- 기기 목록 테이블 -->
              <div v-else-if="devices.length > 0">
                <div class="table-responsive">
                  <!-- 테이블 스타일 개선 및 컬럼 너비 조정 -->
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
                      <tr v-for="device in devices" :key="device.id">
                        <td class="fw-bold text-center">{{ device.id }}</td>
                        <td class="fw-semibold text-primary text-center">{{ device.name }}</td>
                        <td class="text-center">
                          <code class="bg-light px-2 py-1 rounded">{{ device.mac_address }}</code>
                        </td>
                        <td class="text-center">
                          <span
                            :class="['badge', device.gender === 'M' ? 'bg-info' : 'bg-warning']"
                          >
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
                            <router-link
                              :to="{
                                name: 'device-detail',
                                params: { deviceId: device.id },
                              }"
                              class="btn btn-sm btn-outline-info"
                            >
                              상세 보기
                            </router-link>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              @click="removeDevice(device.id)"
                              :disabled="isDeleting[device.id]"
                            >
                              {{ isDeleting[device.id] ? '삭제 중...' : '삭제' }}
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 빈 상태 -->
              <div v-else class="text-center text-muted py-3">
                <p>아직 등록된 기기가 없습니다.</p>
                <router-link to="/register-device" class="btn btn-outline-primary mt-3">
                  새 기기 등록하기
                </router-link>
              </div>

              <!-- 메시지 -->
              <div
                v-if="message"
                :class="[
                  'alert mt-3',
                  messageType === 'success' ? 'alert-success' : 'alert-danger',
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
</template>

<script>
import { deviceService } from '../services/deviceService'

export default {
  name: 'DeviceListView',
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
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || '기기 목록을 불러오는 데 실패했습니다.'
        this.setMessage(errorMessage, 'danger')
      } finally {
        this.isLoading = false
      }
    },
    async removeDevice(deviceId) {
      if (confirm(`기기 ID: ${deviceId}을(를) 정말로 삭제하시겠습니까?`)) {
        this.$set(this.isDeleting, deviceId, true)
        this.message = ''
        try {
          await deviceService.deleteDevice(deviceId)
          this.setMessage(`기기 ID: ${deviceId}이(가) 삭제되었습니다.`, 'success')
          await this.fetchDevices() // 목록 새로고침
        } catch (error) {
          const errorMessage = error.response?.data?.message || '기기 삭제에 실패했습니다.'
          this.setMessage(errorMessage, 'danger')
        } finally {
          this.$set(this.isDeleting, deviceId, false)
        }
      }
    },
    formatDateTime(dateTimeString) {
      if (!dateTimeString) return '-'
      return new Date(dateTimeString).toLocaleString('ko-KR')
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

.btn-group .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

/* 반응형 개선 */
@media (max-width: 1200px) {
  .device-table {
    font-size: 0.8rem;
  }

  .btn-group .btn {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
}
</style>
