import { createApp } from 'vue'
import './style/global.css'
import App from './App.vue'
import router from './router'

async function initApp() {
  // 只在明确启用MOCK时才启动MSW
  const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true'
  
  if (enableMock && import.meta.env.DEV) {
    console.log('🧪 启动Mock模式...')
    try {
      const { worker } = await import('./mock/browser')
      
      // 注销所有旧的Service Worker
      const registrations = await navigator.serviceWorker.getRegistrations()
      registrations.forEach(reg => reg.unregister())
      
      await worker.start({
        serviceWorker: {
          url: '/road_of_Tarnished/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass'
      })
      console.log('✅ MSW已启动（Mock模式）')
    } catch (error) {
      console.warn('❌ MSW启动失败', error)
    }
  } else {
    console.log('🚀 使用真实后端API')
    // 确保注销所有Service Worker
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      registrations.forEach(reg => reg.unregister())
      console.log('✅ 已注销所有Service Worker')
    }
  }

  // 创建并挂载应用
  createApp(App).use(router).mount('#app')
}

initApp().catch(console.error)