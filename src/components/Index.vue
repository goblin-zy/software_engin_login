<script setup>
import { ref } from 'vue'
import { loginAPI } from '@/api/user.js'
import router from '../router'

// 定义 emits
const emit = defineEmits(['switch-to-register', 'login-success'])

// 响应式数据
const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

// 方法
const handleSubmit = async () => {
  if (!form.value.username || !form.value.password) {
    errorMessage.value = '请填写完整信息'
    return
  }

  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await loginAPI(form.value)
    
    if (response.data.code === 200) {
      console.log('登录成功：')
      localStorage.setItem('token', response.data.data.token)
      emit('login-success', response.data.data.user)
      
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || '登录失败'
    } else if (error.request) {
      errorMessage.value = '网络错误，请检查连接'
    } else {
      errorMessage.value = '登录失败'
    }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div id="login-page">
        <!-- 
            网站Logo区域
            显示"软工集市"文字标识
        -->

  <div class="logo-container">
            <h1>软工集市</h1>
        </div>

<form  id="login-form"  @submit.prevent="handleSubmit">
    
      <!-- 登录表单区域,使用<form>标签包裹，便于后续表单提交处理-->
      
       <div class="form-group">

      <label for="login-username">账号:</label>
      <!--type="text" 表示文本输入，id与label的for属性对应，placeholder显示提示文字，required表示该字段为必填项-->

      <input type="text" id="login-username" name="username" v-model="form.username" placeholder="请输入账号" required>
       </div>
      <br>
      <!-- 密码输入框组 -->
       <div class="form-group">
         <label for="login-password">密码:</label>
         <input type="password" id="login-password" name="password" v-model="form.password" placeholder="请输入密码" required>
       </div>
      <br>
       <div v-if="errorMessage" style="color: red;">
        {{ errorMessage }}
      </div>
      <div class="form-button"><button type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
      </div>
       <!-- 注册链接区域 -->
        <div class="register-link">
      <p>还没有账号？<router-link :to="{ name: 'Register' }">注册</router-link></P>
      </div>
  </form>
    </div>
    </template>

    <style scoped>
    #login-page{
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加精致的阴影 */
    width: 100%;
    max-width: 400px;
    box-sizing: border-box; /* 确保 padding 不会影响宽度 */
    transition: all 0.3s ease-in-out;
}
  .logo-container h1{
    text-align: center;
    color: #1c1c1e;
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 600;
}
.form-group {
    margin-bottom: 1.5rem;
}
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
}
input[type="text"],
input[type="password"]{
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-size: 1rem;
}
input[type="text"]:focus,
input[type="password"]:focus{
    outline: none;
    border-color: #007bff; /* 焦点颜色 */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
.form-button {
    margin-top: 2rem;
}
.form-button button {
    width: 100%;
    padding: 12px;
    background-color: #007bff; /* 主题蓝色 */
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}


.form-button button:hover {
    background-color: #0056b3; /* 悬停时颜色变深 */
    transform: translateY(-2px); /* 轻微上浮效果 */
}
.form-group small {
    display: block;
    margin-top: 0.5rem;
    color: #888;
    font-size: 0.875rem;
}
.register-link
 {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.95rem;
}
 .register-link a{
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
}
.register-link a:hover{
    text-decoration: underline;
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