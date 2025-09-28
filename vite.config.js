import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; // 引入 Node.js 内置的 path 模块
// https://vite.dev/config/
export default defineConfig({
  build:{
    rollipupOptions:{
      input:{
        index:path.resolve(__dirname, '/index.html'),
        register:path.resolve(__dirname, '/register.html'), 

  },}},
  plugins: [vue()],
  resolve: {
    alias: {
      // 确保有这行配置：@ 指向 src 目录
      '@': path.resolve(__dirname, './src')  
    }
  },
  base:'/road_of_Tarnished/', // 设置基础路径为相对路径，确保在不同环境下资源路径正确
})
