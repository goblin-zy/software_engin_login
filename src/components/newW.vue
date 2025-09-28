<script setup>
import tarnishedImg from '@/assets/image/cat.jpg';
console.log('本地图片的最终路径：', tarnishedImg);
alert("欢迎！")
</script>
<template>
  <div 
    class="bg-container" 
    :style="{ backgroundImage: `url(https://ts1.tc.mm.bing.net/th/id/R-C.208cf4ebcad01f1716c41f15cafedbba?rik=2p4aXm7g7Oaihw&riu=http%3a%2f%2fi1.073img.com%2f220224%2f17598537_110535_1.jpg&ehk=0RsAEwIBcl8eTiXkvzpcFalefO2k4bAIsf3CJrquvww%3d&risl=&pid=ImgRaw&r=0)` }"
  >
    <h1>欢迎来到集市</h1>
    <p>这里是新手村，准备好开始你的冒险了吗？</p>
    
  </div>
</template>
<style scoped>
.bg-container {
 width: 100%; /* 宽度占满父容器 */
  height: 500px; /* 足够的高度（根据需求调整） */
  background-size: cover; /* 图片自适应容器 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 禁止重复平铺 */
  border: 1px solid red; /* 临时边框，确认容器存在 */
}

</style>