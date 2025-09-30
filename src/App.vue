<script setup>
import router from './router'
const handleLoginSuccess = (user) => {
  console.log('父组件确认登录成功，用户信息：', user)
   try {
    // 路由跳转代码（比如跳转到首页）
    router.push({ name: 'newW' }); // 重点检查：目标路由是否存在？
  } catch (err) {
    console.error('路由跳转失败：', err); // 捕获并打印错误
  }
};
console.log('🔧 环境配置:', {
  mode: import.meta.env.MODE,
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  isMock: import.meta.env.VITE_ENABLE_MOCK === 'true'
})
</script>

<template>
  <div id="app">
    <!-- 路由出口：动态显示匹配的组件 -->
    <router-view @login-success="handleLoginSuccess"></router-view>
    <footer>
        <p>© 2024 软工集市 版权所有</p>
    </footer>
  </div>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
#app {
  height: 100vh; /* 占满整个视口高度 */
  overflow: auto; /* 允许内容溢出时滚动 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
footer {
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    color: #999;
    font-size: 0.875rem;
}
</style>
