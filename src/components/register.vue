
<script setup>
import { ref } from 'vue'
import { registerAPI } from '@/api/user.js'

// 定义 emits
const emit = defineEmits(['switch-to-login', 'register-success'])

// 响应式数据
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// 方法
const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = '密码不一致'
    return
  }

  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await registerAPI({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    })
    
    if (response.data.code === 200) {
      successMessage.value = '注册成功！'
      setTimeout(() => {
        emit('register-success')
        switchToLogin()
      }, 1000)
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || '注册失败'
    } else if (error.request) {
      errorMessage.value = '网络错误，请检查连接'
    } else {
      errorMessage.value = '注册失败'
    }
  } finally {
    loading.value = false
  }
}

const switchToLogin = () => {
  form.value = { username: '', email: '', password: '', confirmPassword: '' }
  errorMessage.value = ''
  successMessage.value = ''
  emit('switch-to-login')
}
</script>


<template>
   <div id="register-page">
      <!-- 注册表单标题 -->
    <div class="register-title">
            <h2>账号注册</h2>
        </div>
 <!-- 注册表单 -->
<form id="register-form" @submit.prevent="handleSubmit">
   <!-- 账号/邮箱输入框组 -->
   
<div class="form-group">
    <label for="usere">用户名:</label>
    <input type="text" id ="username" v-model="form.username" placeholder="请输入你的新用户名" required >
</div>
<div class="form-group">
   <label for="useremail">邮箱:</label>
    <input type="email" id ="useremail" v-model="form.email" placeholder="请输入你的邮箱" required >
    <br>
    <small>请使用有效的邮箱地址，便于后续找回密码</small>
 <!-- 辅助提示文字 -->
</div>
<div class="form-group">
    <label for="register-password">设置密码:</label>
    <input type="password" 
    id="register-password"
    name="registerPassword" 
     v-model="form.password"
    placeholder="请设置密码(至少6位 )" 
    minlength="6" 
    required
    >
    <br>
    <div class="form-group">
    <label for="confirm-password">确认密码:</label>
    <input type="password" 
    id="confirm-password" 
      name="confirmPassword"
      v-model="form.confirmPassword"
       placeholder="请再次输入密码"  
      minlength="6" 
      required
      >
        <br>
       <small>两次输入的密码必须一致</small>
       </div>
       <div v-if="errorMessage" style="color: red;">
        {{ errorMessage }}
      </div>
      
      <div v-if="successMessage" style="color: green;">
        {{ successMessage }}
      </div>
   <div class="form-button">
    <button type="submit" :disabled="loading">{{ loading ? '注册中...' : '注册' }}</button>
    </div>
    
<div  class="login-link">
    <p>已有账号？ <router-link :to="{ name: 'Index' }">返回登录</router-link></p>
</div>
</div>
</form>
  </div>
  </template>

  <style scoped>

  #register-page {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加精致的阴影 */
    width: 100%;
    max-width: 400px;
    box-sizing: border-box; /* 确保 padding 不会影响宽度 */
    transition: all 0.3s ease-in-out;
}
.register-title h2 {
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
input[type="password"],
input[type="email"] {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-size: 1rem;
}
input[type="text"]:focus,
input[type="password"]:focus,
input[type="email"]:focus {
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

/* --- 辅助文字和链接 --- */
.form-group small {
    display: block;
    margin-top: 0.5rem;
    color: #888;
    font-size: 0.875rem;
}
.login-link {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
}
.login-link a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
}
.login-link a:hover {
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