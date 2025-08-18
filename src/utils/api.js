import axios from 'axios'

// API 기본 설정 - 환경 변수 사용
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000', // FastAPI 서버 URL에 맞게 설정
  timeout: 30000, // Updated timeout value to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (필요시 토큰 추가 등)
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
