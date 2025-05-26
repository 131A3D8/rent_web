<template>
  <view class="container">
    <!-- 加载指示器 -->
    <view v-if="loading" class="loading-indicator">加载中...</view>

    <!-- 正常内容 -->
    <view v-else>
      <!-- 查询按钮 -->
      <button @click="fetchData" type="default">刷新数据</button>

      <!-- 排序控制 -->
      <view class="sort-control">
        <text>排序方式：</text>
        <picker mode="selector" range-key="label" :range="sortOptions" @change="handleSortChange">
          <text>{{ sortOptions[sortIndex].label }}</text>
        </picker>
        <button @click="toggleOrder">{{ orderText }}</button>
      </view>

      <!-- 筛选租金区间 -->
      <view class="filter">
        <input v-model="minRent" placeholder="最低租金" type="digit" />
        <text> - </text>
        <input v-model="maxRent" placeholder="最高租金" type="digit" />
        <button @click="applyFilter">筛选</button>
        <button @click="clearFilter">清除</button>
      </view>

      <!-- 数据展示 -->
      <scroll-view scroll-y style="height: 60vh;">
        <view v-for="(item, index) in displayedList" :key="index" class="item-card">
          <text>名称：{{ item.rentingname || '暂无信息' }}</text>
          <text>租金：{{ item.rent }} 元</text>
          <text>地址：{{ item.address || '暂无信息' }}</text>
          <text>距离：{{ item.distance }} 米</text>
          <text>电话：{{ item.phone || '暂无信息' }}</text>
        </view>
      </scroll-view>

      <!-- 跳转按钮 -->
      <button @click="navigateToAddRent" type="primary">发布房源信息</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rentingList: [],     // 原始数据
      filteredList: [],    // 筛选后的数据
      minRent: '',         // 最小租金
      maxRent: '',         // 最大租金
      sortKey: 'rent',     // 默认排序字段
      sortOrder: 1,        // 1=升序, -1=降序
      sortIndex: 0,        // 排序选项索引
      sortOptions: [
        { label: '按租金升序', value: 'rent_asc' },
        { label: '按租金降序', value: 'rent_desc' }
      ],
      username: '',        // 用户名
      loading: true        // 加载状态
    };
  },
  computed: {
    orderText() {
      return this.sortOrder === 1 ? '升序' : '降序';
    },
    displayedList() {
      return this.filteredList.length > 0 ? this.filteredList : this.rentingList;
    }
  },
  onLoad(options) {
    // 从路由参数中获取 username
    if (options.username) {
      this.username = decodeURIComponent(options.username);
    }
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const res = await new Promise((resolve, reject) => {
          uni.request({
            url: 'http://localhost:8080/renting/All',
            method: 'GET',
            success: resolve,
            fail: reject
          });
        });

        console.log('完整响应:', res);

        if (res.statusCode === 200 && Array.isArray(res.data)) {
          this.rentingList = res.data;
          this.applyFilter(); // 刷新后重新应用筛选
        } else {
          uni.showToast({ title: '数据加载失败', icon: 'none' });
          console.error('状态码非200或数据不是数组:', res);
        }
      } catch (err) {
        uni.showToast({ title: '网络错误', icon: 'none' });
        console.error('请求失败:', err);
      } finally {
        this.loading = false; // 加载完成后隐藏加载指示器
      }
    },

    handleSortChange(e) {
      this.sortIndex = e.detail.value;
      const selected = this.sortOptions[this.sortIndex];
      if (selected.value.includes('_asc')) {
        this.sortKey = 'rent';
        this.sortOrder = 1;
      } else {
        this.sortKey = 'rent';
        this.sortOrder = -1;
      }
      this.applyFilter(); // 重新排序
    },

    toggleOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
      this.applyFilter();
    },

    applyFilter() {
      let list = [...this.rentingList];

      // 如果有设定租金范围，则进行筛选
      if (this.minRent || this.maxRent) {
        const min = Number(this.minRent);
        const max = Number(this.maxRent);

        if (!isNaN(min)) {
          list = list.filter(item => Number(item.rent) >= min);
        }
        if (!isNaN(max)) {
          list = list.filter(item => Number(item.rent) <= max);
        }
      }

      // 排序
      list.sort((a, b) => {
        const valA = Number(a[this.sortKey]);
        const valB = Number(b[this.sortKey]);
        return this.sortOrder * (valA - valB);
      });

      this.filteredList = list;
    },

    clearFilter() {
      this.minRent = '';
      this.maxRent = '';
      this.applyFilter(); // 清除筛选条件后重新获取所有数据
    },

    navigateToAddRent() {
      // 使用uni.navigateTo进行页面跳转，并传递username参数
      uni.navigateTo({
        url: `/pages/user/addrent?username=${encodeURIComponent(this.username)}`
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20rpx;
}

.loading-indicator {
  text-align: center;
  font-size: 32rpx;
  margin-top: 50%;
}

.sort-control, .filter {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.sort-control text, .filter text {
  margin-right: 15rpx;
}

.sort-control picker, .filter input {
  border: 1px solid #ccc;
  padding: 10rpx;
  margin-right: 15rpx;
  flex: 1;
}

.item-card {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.1);
}

.item-card text {
  display: block;
  margin-bottom: 10rpx;
}
</style>