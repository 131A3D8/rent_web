// 引入axios
import axios from 'axios';

// 创建axios实例
const request = axios.create({
baseURL: 'http://localhost:8280/user', // 基础路径
withCredentials: true // 表示请求可以携带cookie
});

// 导出axios实例
export default request;