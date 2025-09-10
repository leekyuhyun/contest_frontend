import api from '@/utils/api'

/**
 * AI 분석 히스토리 데이터를 페이지별, 기기별로 가져오는 서비스
 */
export const historyService = {
  /**
   * @param {number} page - 요청할 페이지 번호
   * @param {number} pageSize - 페이지당 아이템 수
   * @param {string|null} macAddress - 필터링할 기기의 MAC 주소 (선택 사항)
   * @returns {Promise<Object>} - 페이지네이션된 히스토리 데이터
   */
  async getHistory(page = 1, pageSize = 10, macAddress = null) {
    try {
      const params = {
        page: page,
        page_size: pageSize,
      }
      // macAddress가 있으면 파라미터에 추가
      if (macAddress) {
        params.mac_address = macAddress
      }

      console.log(`📡 AI 분석 히스토리 요청...`, params)
      const response = await api.get('/ai-prediction', { params })
      console.log('✅ 히스토리 데이터 수신 성공:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ AI 분석 히스토리 요청 실패:', error)
      return { items: [], total: 0, page: 1, page_size: pageSize }
    }
  },
}
