import axios from 'axios'

// 从环境变量获取配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true'

console.log('🔧 API配置:', {
  baseURL: API_BASE_URL,
  enableMock: ENABLE_MOCK,
  mode: import.meta.env.MODE
})

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 添加日志
api.interceptors.request.use(
  (config) => {
    if (ENABLE_MOCK) {
      console.log('🧪 使用Mock模式:', config.url)
    } else {
      console.log('🚀 发送真实请求:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL
      })
    }
    return config
  },
  (error) => {
    console.error('❌ 请求配置错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('✅ 请求成功:', {
      url: response.config.url,
      status: response.status
    })
    return response
  },
  (error) => {
    console.error('❌ 请求失败:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    })
    
    if (error.response) {
      error.userMessage = error.response.data?.message || '请求失败'
    } else if (error.request) {
      error.userMessage = `无法连接到服务器: ${API_BASE_URL}，请检查后端服务是否启动`
    } else {
      error.userMessage = '请求配置错误'
    }
    
    return Promise.reject(error)
  }
)

// 登录接口
export const loginAPI = (userData) => {
  return api.post('/api/login', userData)
}

// 注册接口
export const registerAPI = (userData) => {
  return api.post('/api/register', userData)
}

// 修改密码接口
export const changePasswordAPI = (passwordData) => {
  return api.post('/api/change-password', passwordData)
}

// 导出配置信息（用于调试）
export const apiConfig = {
  baseURL: API_BASE_URL,
  enableMock: ENABLE_MOCK,
  mode: import.meta.env.MODE
}

export default api