<template>
  <view class="container">
    <view class="register-box">
      <view class="form-group">
        <input v-model="username" placeholder="请输入用户名" class="input" />
      </view>
      <view class="form-group">
        <input v-model="password" type="password" placeholder="请输入密码" class="input" password />
      </view>
      <button @click="register" class="btn">注册</button>

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
    async register() {
      if (!this.username || !this.password) {
        this.message = '用户名和密码不能为空';
        return;
      }

      try {
        const res = await uni.request({
          url: 'http://localhost:8080/user/add',
          method: 'POST',
          data: {
            username: this.username,
            password: this.password
          },
          header: {
            'content-type': 'application/json'
          }
        });

        // 正常响应处理
        const { data } = res;

        if (data === "添加成功") {
          this.message = '注册成功';
          uni.showToast({ title: '注册成功', icon: 'success' });
          setTimeout(() => {
            uni.navigateTo({ url: '/pages/login/loginUser' });
          }, 1000);
        } else if (data === "添加失败") {
          this.message = '注册失败，请检查输入的信息';
        } else {
          this.message = '未知错误';
        }

      } catch (err) {
        console.error('请求失败:', err);
        this.message = '网络请求失败，请重试';
      }
    }
  }
};
</script>

<style>
/* 容器设置为flex布局，使内容垂直和水平居中 */
.container {
	background-image: url('static/register.png'); /* 替换为你的图片URL */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 设置高度为视窗高度 */
  background-color: #f0f0f0; /* 可选背景颜色 */
  opacity: 0.7;
}

/* 注册框容器 */
.register-box {
  width: 80%; /* 根据屏幕大小自适应宽度 */
  max-width: 400px; /* 最大宽度 */
  padding: 40rpx;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影效果 */
  border-radius: 10px;
}

.form-group {
  margin-bottom: 30rpx;
}

/* 调整输入框样式 */
.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 25rpx; /* 增加内边距 */
  font-size: 32rpx; /* 增大字体大小 */
  box-sizing: border-box;
  height: auto; /* 根据内容自动调整高度 */
  border-radius: 6rpx; /* 圆角 */
}

.btn {
  width: 100%;
  background-color: #07c160;
  color: white;
  padding: 25rpx; /* 增加按钮内边距 */
  font-size: 32rpx; /* 增大按钮文字大小 */
  border: none;
  border-radius: 6rpx; /* 圆角 */
}

.message {
  margin-top: 20rpx;
  color: red;
  display: block;
  text-align: center;
  font-size: 28rpx; /* 调整提示信息字体大小 */
}
</style>