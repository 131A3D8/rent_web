<template>
  <div class="background-container"></div>
  <view class="container">
    <view class="login-box">
      <view class="form-group">
        <input v-model="username" placeholder="请输入用户名" class="input" />
      </view>
      <view class="form-group">
        <input v-model="password" type="password" placeholder="请输入密码" class="input" password />
      </view>
      <button @click="login" class="btn">登录</button>

      <!-- 提示信息 -->
      <text v-if="message" class="message">{{ message }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.message = '用户名和密码不能为空';
        return;
      }

      try {
        const res = await uni.request({
          url: 'http://localhost:8080/user/login',
          method: 'POST',
          data: {
            username: this.username,
            password: this.password
          },
          header: {
            'content-type': 'application/json'
          }
        });

        // 处理响应
        const { data } = res;

        if (data === "登录成功") {
          this.message = '登录成功';
          uni.showToast({ title: '登录成功', icon: 'success' });
          
          // 跳转到 rentuser 页面并携带 username 参数
          uni.navigateTo({
            url: `/pages/user/rentuser?username=${encodeURIComponent(this.username)}`
          });

        } else if (data === "登录失败") {
          this.message = '登录失败，请检查用户名或密码';
        } else {
          this.message = '未知错误';
        }
      } catch (err) {
        console.error(err);
        this.message = '网络请求失败，请重试';
      }
    }
  }
};
</script>

<style>
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 80%;
  max-width: 400px;
  padding: 40rpx;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.form-group {
  margin-bottom: 30rpx;
}

.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 25rpx;
  font-size: 32rpx;
  box-sizing: border-box;
  height: auto;
  border-radius: 6rpx;
}

.btn {
  width: 100%;
  background-color: #07c160;
  color: white;
  padding: 25rpx;
  font-size: 32rpx;
  border: none;
  border-radius: 6rpx;
}

.message {
  margin-top: 20rpx;
  color: red;
  display: block;
  text-align: center;
  font-size: 28rpx;
}
</style>