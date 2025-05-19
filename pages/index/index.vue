<template>
  <div class="background-container"></div>
  <div class="login-container">
    <h2>校园租房test</h2>
    <button @click="guestLogin" class="button">我是游客</button>
    <button @click="userLogin" class="button">登录</button>
    <button @click="userRegister" class="button">注册</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  setup() {
    const guestLogin = () => {
      uni.navigateTo({
        url: '/pages/guest/guest'
      });
    };

    const userLogin = () => {
      uni.navigateTo({
        url: '/pages/login/loginUser'
      });
    };

    const userRegister = () => {
      uni.navigateTo({
        url: '/pages/login/registerUser'
      });
    };

    return {
      guestLogin,
      userLogin,
      userRegister
    };
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('static/indexpicture.png'); /* 替换为你的图片URL */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中显示 */
  height: 100vh; /* 容器高度占满整个视口 */
  width: 100vw; /* 容器宽度占满整个视口 */
  position: fixed; /* 固定定位，覆盖整个视口 */
  top: 0;
  left: 0;
  z-index: -1; /* 确保在 login-container 之下 */
}

.login-container {
  background-color: white;
  opacity: 0.5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  height: 250px;
  position: absolute; /* 绝对定位 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 水平和垂直居中 */
  z-index: 1; /* 确保在 background-container 之上 */
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
</style>