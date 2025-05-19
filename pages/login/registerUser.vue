<template>
  <view class="content">
    <text class="title">用户注册</text>
    <!-- 这里可以添加注册表单 -->
<!-- <form @submit.prevent="handleSubmit">
      <input type="text" v-model="username" placeholder="用户名" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button type="submit" class="button">注册</button>
    </form>-->
	<div class = "register-container">
		<button class=""></button>
	</div>
  </view>
  <div class="background-container"></div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // 处理注册逻辑
      console.log('用户名:', this.username);
      console.log('密码:', this.password);
      // 可以在这里发送请求到服务器
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

.background-container {
  background-image: url('static/2.jpg'); /* 图片URL */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中显示 */
  height: 100vh; /* 容器高度占满整个视口 */
  width: 100vw; /* 容器宽度占满整个视口 */
  position: fixed; /* 固定定位，覆盖整个视口 */
  top: 0;
  left: 0;
  z-index: -1; /* 确保在 content 之下 */
}
</style>