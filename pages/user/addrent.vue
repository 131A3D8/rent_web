<template>
  <view class="container">
    <!-- 加载指示器 -->
    <view v-if="loading" class="loading-indicator">加载中...</view>

    <!-- 正常内容 -->
    <view v-else class="main-content">
      <!-- 显示用户名 -->
      <view class="username-display">
        当前用户：{{ formData.rentingname }}
      </view>

      <!-- 表单容器 -->
      <view class="form-container">
        <!-- 租金 -->
        <view class="form-group">
          <text>租金：</text>
          <input v-model.number="formData.rent" placeholder="请输入租金" type="digit" class="styled-input" />
        </view>

        <!-- 地址 -->
        <view class="form-group">
          <text>地址：</text>
          <input v-model="formData.address" placeholder="请输入地址" class="styled-input" />
        </view>

        <!-- 距离 -->
        <view class="form-group">
          <text>距离（米）：</text>
          <input v-model.number="formData.distance" placeholder="请输入距离" type="digit" class="styled-input" />
        </view>

        <!-- 电话 -->
        <view class="form-group">
          <text>联系电话：</text>
          <input v-model="formData.phone" placeholder="请输入电话号码" type="number" class="styled-input" />
        </view>

        <!-- 提示信息 -->
        <text v-if="message" class="message">{{ message }}</text>

        <!-- 提交按钮 -->
        <button @click="submitForm" class="btn">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        rentingname: '', // 接收自上一页的 username
        rent: null,
        address: '',
        distance: null,
        phone: ''
      },
      message: '',
      loading: true
    };
  },
  onLoad(options) {
    if (options.username) {
      this.formData.rentingname = decodeURIComponent(options.username);
    } else {
      uni.showToast({ title: '缺少用户名', icon: 'none' });
    }
    setTimeout(() => {
      this.loading = false;
    }, 300); // 模拟数据加载完成
  },
  methods: {
    validateForm() {
      const { rent, address, distance, phone } = this.formData;
      if (rent === null || !address || distance === null || !phone) {
        this.message = '请填写所有字段';
        return false;
      }
      if (isNaN(rent) || isNaN(distance)) {
        this.message = '租金和距离必须为数字';
        return false;
      }
      return true;
    },
    async submitForm() {
      this.message = '';
      if (!this.validateForm()) return;

      try {
        const [_, res] = await uni.request({
          url: 'http://localhost:8080/renting/Add',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: this.formData
        });

        // 处理响应
        const { statusCode, data } = res;

        if (statusCode >= 200 && statusCode < 300) { // 更广泛的HTTP成功范围
          if(data === "数据添加成功") {
            uni.showToast({ title: '添加成功', icon: 'success' });
            setTimeout(() => {
              uni.redirectTo({
                url: '/pages/user/user?username=' + encodeURIComponent(this.formData.rentingname)
              });
            }, 1000);
          } else {
            console.warn('未知的成功响应:', data);
            this.message = '服务器响应异常，请联系管理员';
          }
        } else {
          console.error(`请求失败，状态码：${statusCode}, 响应数据：`, data);
          this.message = '网络请求失败，请重试';
        }
      } catch (err) {
        console.error('请求发生错误:', err);
        this.message = '数据添加可能完成,请查询';
		setTimeout(() => {
		  uni.redirectTo({
		    url: '/pages/user/rentuser?username=' + encodeURIComponent(this.formData.rentingname)
		  });
		}, 1000);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 40rpx;
  background-color: #f5f5f5;
}

/* 加载指示器 */
.loading-indicator {
  text-align: center;
  font-size: 32rpx;
  margin-top: 50%;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

/* 用户名展示区 */
.username-display {
  font-size: 30rpx;
  color: #333;
  padding: 20rpx;
  background-color: #e6f7ff;
  border-radius: 12rpx;
  border-left: 6rpx solid #1890ff;
}

/* 表单容器 - 新增的“框” */
.form-container {
  background-color: #ffffff;
  padding: 40rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 60rpx;
}

/* 表单项 */
.form-group {
  margin-bottom: 40rpx;
  display: flex;
  flex-direction: column;
}

/* 输入框样式 */
.styled-input {
  width: 100%;
  padding: 20rpx;
  border: 1px solid #ccc;
  border-radius: 8rpx;
  font-size: 32rpx;
  outline: none;
  transition: all .3s ease-in-out;
}

.styled-input:focus {
  border-color: #07c160;
  box-shadow: 0 0 10rpx rgba(7, 193, 96, 0.7);
}

/* 错误提示 */
.message {
  color: red;
  display: block;
  text-align: center;
  margin-top: 20rpx;
  font-size: 28rpx;
}

/* 提交按钮 */
.btn {
  background-color: #07c160;
  color: white;
  padding: 25rpx;
  font-size: 32rpx;
  width: 100%;
  border-radius: 8rpx;
  margin-top: 20rpx;
}
</style>