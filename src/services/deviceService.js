import api from '../utils/api'

export const deviceService = {
  // 모든 기기 목록 조회
  async getAllDevices() {
    try {
      console.log('📡 기기 목록 조회 요청 시작...')
      const response = await api.get('/device/')
      console.log('✅ 기기 목록 조회 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ 기기 목록 조회 실패:', error)
      throw error
    }
  },

  // MAC 주소로 기기 조회
  async getDeviceByMac(macAddress) {
    try {
      console.log(`📡 MAC 주소로 기기 조회 요청 시작... MAC: ${macAddress}`)
      const response = await api.get(`/device/${macAddress}`)
      console.log('✅ MAC 주소로 기기 조회 성공:', response.data)
      // Return the device data directly, not wrapped in a data property
      return response.data
    } catch (error) {
      console.error('❌ MAC 주소로 기기 조회 실패:', error)
      if (error.response?.status === 404) {
        throw new Error(`MAC 주소 ${macAddress}에 해당하는 기기를 찾을 수 없습니다.`)
      } else if (error.response?.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
      throw error
    }
  },

  // 새 기기 등록
  async createDevice(deviceData) {
    try {
      console.log('📡 기기 등록 요청 시작...', deviceData)

      const payload = {
        mac_address: deviceData.mac_address,
        name: deviceData.name, // 기기 이름으로 사용
        gender: deviceData.gender,
        birth_date: deviceData.birth_date,
        phone: deviceData.phone,
        guardian_name: deviceData.guardian_name,
        guardian_relation: deviceData.guardian_relation,
        guardian_phone: deviceData.guardian_phone,
      }

      console.log('📤 전송할 데이터:', payload)

      // 백엔드 라우터에 맞춰 POST 엔드포인트는 "/device"로 유지
      const response = await api.post('/device', payload)

      console.log('✅ 기기 등록 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ 기기 등록 실패:', error)

      // 에러 정보 상세 로깅
      if (error.response) {
        console.error('응답 상태:', error.response.status)
        console.error('응답 데이터:', error.response.data)
        console.error('응답 헤더:', error.response.headers)
      } else if (error.request) {
        console.error('요청 정보:', error.request)
      } else {
        console.error('에러 메시지:', error.message)
      }

      throw error
    }
  },

  // 기기 삭제
  async deleteDevice(macAddr) {
    try {
      console.log(`📡 기기 삭제 요청 시작... ID: ${macAddr}`)
      const response = await api.delete(`/device/${macAddr}`)
      console.log('✅ 기기 삭제 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ 기기 삭제 실패:', error.response?.data || error.message)
      throw error
    }
  },

  // 특정 기기 조회
  async getDevice(deviceId) {
    try {
      console.log(`📡 기기 조회 요청 시작... ID: ${deviceId}`)
      const response = await api.get(`/device/${deviceId}`)
      console.log('✅ 기기 조회 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ 기기 조회 실패:', error)
      if (error.response?.status === 404) {
        throw new Error(`ID ${deviceId}에 해당하는 기기를 찾을 수 없습니다.`)
      } else if (error.response?.status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
      throw error
    }
  },

  // 기기 업데이트
  async updateDevice(deviceId, deviceData) {
    try {
      console.log(`📡 기기 업데이트 요청 시작... ID: ${deviceId}`, deviceData)

      const payload = {
        mac_address: deviceData.mac_address,
        name: deviceData.name, // 기기 이름으로 사용
        gender: deviceData.gender,
        birth_date: deviceData.birth_date,
        phone: deviceData.phone,
        guardian_name: deviceData.guardian_name,
        guardian_relation: deviceData.guardian_relation,
        guardian_phone: deviceData.guardian_phone,
      }

      const response = await api.put(`/device/${deviceId}`, payload)
      console.log('✅ 기기 업데이트 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ 기기 업데이트 실패:', error.response?.data || error.message)
      throw error
    }
  },
}

export default deviceService
