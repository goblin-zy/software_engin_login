import { createApp } from 'vue'
import'./style/global.css'
import App from './App.vue'
import router from './router'
import { worker } from './mock/browser';
// main.js（修复 URL 构造逻辑）
async function fixMSW() {
  if ('serviceWorker' in navigator && import.meta.env.DEV) {
    // 1. 先注销所有旧的 SW（避免缓存干扰）
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach(reg => reg.unregister());
    console.log('已注销旧的 Service Worker');

    // 2. 手动注册正确的 SW（路径必须和文件位置一致）
    const swUrl = '/road_of_Tarnished/mockServiceWorker.js'; // 相对路径更可靠
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: '/road_of_Tarnished/'
    });
    console.log('✅ 新 SW 注册成功，路径：', swUrl);

    // 3. 启动 MSW 时，强制指定 SW 路径和已注册实例（双重保险）
    await worker.start({
      serviceWorker: {
        registration: registration, // 绑定已注册的实例
        url: swUrl, // 再次明确告诉 MSW 脚本路径
        scope: '/road_of_Tarnished/'
      },
      skipWaiting: true,
      quiet: true // 禁用 MSW 自身的路径提示（避免混淆）
    });
    console.log('✅ MSW 终于启动成功');
  }
}

// 执行并挂载应用
fixMSW().then(() => {
  createApp(App).use(router).mount('#app');
}).catch(err => {
  console.error('❌ 最终失败：', err);
});