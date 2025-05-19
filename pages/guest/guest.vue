<template>
  <div class="background-container"></div>
  <div class="guest-container">
    <button @click="fetchGuests" :disabled="isLoading">{{ isLoading ? '正在查询...' : '查询' }}</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <table v-if="guests.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>租金</th>
          <th>地址</th>
          <th>联系方式</th>
          <th>距离</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in guests" :key="guest.id">
          <td>{{ guest.id }}</td>
          <td>{{ guest.rentingname }}</td>
          <td>{{ guest.rent }}</td>
          <td>{{ guest.address }}</td>
          <td>{{ guest.phone }}</td>
          <td>{{ guest.distance }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!isLoading && !errorMessage">暂无数据</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guests: [],
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async fetchGuests() {
      console.log("Button clicked, starting fetch request..."); // 调试信息：按钮点击
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await fetch('http://localhost:8080/renting/All');
        console.log("Response received:", response); // 调试信息：响应接收
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Data parsed:", data); // 调试信息：数据解析
        this.guests = data;
      } catch (error) {
        console.error("Error fetching guests:", error); // 调试信息：错误处理
        this.errorMessage = "查询失败";
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.background-container {
  background-image: url('static/guestbakegroud.png'); /* 替换为你的图片URL */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中显示 */
  height: 100vh; /* 容器高度占满整个视口 */
  width: 100vw; /* 容器宽度占满整个视口 */
  position: fixed; /* 固定定位，覆盖整个视口 */
  top: 0;
  left: 0;
  z-index: -1; /* 确保在 login-container 之下 */
}

.guest-container {
  margin: 20px;
  position: relative; /* 确保子元素相对于此容器定位 */
  z-index: 1; /* 确保在背景之上 */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>



