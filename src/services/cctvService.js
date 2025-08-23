import api from '@/utils/api'

export const cctvService = {
  // 🔥 지역별 CCTV 데이터 조회 (필터링 필수)
  async getCCTVsByRegion(bigPosition, smallPosition = null, skip = 0, limit = 500) {
    try {
      const params = { skip, limit }

      // big_position은 필수
      if (!bigPosition) {
        throw new Error('대분류 지역은 필수입니다.')
      }
      params.big_position = bigPosition

      // small_position은 선택적
      if (smallPosition) {
        params.small_position = smallPosition
      }

      const response = await api.get('/cctv/', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch CCTVs by region:', error)
      throw error
    }
  },

  // 🔥 지역별 CCTV 개수 조회
  async getCCTVCountByRegion(bigPosition, smallPosition = null) {
    try {
      const params = {}

      if (!bigPosition) {
        return { count: 0 }
      }
      params.big_position = bigPosition

      if (smallPosition) {
        params.small_position = smallPosition
      }

      const response = await api.get('/cctv/count/by-region', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch CCTV count:', error)
      throw error
    }
  },

  // 🔥 사용 가능한 지역 목록 조회
  async getAvailableRegions() {
    try {
      const response = await api.get('/cctv/regions/available')
      return response.data
    } catch (error) {
      console.error('Failed to fetch available regions:', error)
      throw error
    }
  },

  // 특정 ID의 CCTV 데이터 조회
  async getCCTV(cctvId) {
    try {
      const response = await api.get(`/cctv/${cctvId}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch CCTV with ID ${cctvId}:`, error)
      throw error
    }
  },

  // 🔥 기존 메서드들을 새로운 방식으로 래핑
  async getFilteredCCTVs(bigPosition, smallPosition, skip = 0, limit = 500) {
    return this.getCCTVsByRegion(bigPosition, smallPosition, skip, limit)
  },

  async getNearbyCCTVs(lat, lng, count= 6) {
    try {
      const params = { lat, lng, count }
      const response = await api.get('/cctv/nearby', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch nearby CCTVs:', error)
      throw error
    }
  },
}
