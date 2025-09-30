import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('🎯 当前环境:', mode)
  console.log('🔧 API地址:', env.VITE_API_BASE_URL)
  
  return {
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, '/index.html'),
          register: path.resolve(__dirname, '/register.html'), 
        },
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')  
      }
    },
    base: '/road_of_Tarnished/',
    
    // 开发服务器配置
    server: {
      port: 5173,
      proxy: {
        // 开发环境代理，解决CORS问题
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    
    // 环境变量定义
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    }
  }
})