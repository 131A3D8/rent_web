<template>
  <div class="background-container"></div>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>登录</h2>
      <div class="input-group">
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="isLoading">{{ isLoading ? '正在登录...' : '登录' }}</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <router-link to="/pages/login/registerUser" class="register-link">注册</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      console.log("Login button clicked, starting fetch request..."); // 调试信息：按钮点击
      this.isLoading = true;
      this.errorMessage = '';
      try {
        console.log("Preparing to send fetch request..."); // 调试信息：准备发送请求
        const response = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "username": this.username, "password": this.password })
        });
        console.log("Response received:", response); // 调试信息：响应接收
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Data parsed:", data); // 调试信息：数据解析
        // 登录成功，可以存储 token 或其他信息
        localStorage.setItem('token', data.token);
        // 跳转到用户页面
        this.$router.push('/pages/user/user');
      } catch (error) {
        console.error("Error logging in:", error); // 调试信息：错误处理
        this.errorMessage = "登录失败，请检查用户名和密码";
      } finally {
        this.isLoading = false;
        console.log("Login process completed."); // 调试信息：登录过程完成
      }
    }
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('static/login.png'); /* 替换为你的图片URL */
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1; /* 确保在背景之上 */
  width: 300px; /* 设置固定的宽度以便更好地控制布局 */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  caret-color: #00be7f;
}

.input-group label {
  margin-right: 10px;
  flex-shrink: 0;
}

.input-group input {
  flex-grow: 1;
  height: 40px; /* 增加输入框的高度 */
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #000000;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register-link {
  display: block;
  text-align: right;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>



