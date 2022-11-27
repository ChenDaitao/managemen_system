/*
 * @Date: 2022-11-13 22:32:36
 * @LastEditTime: 2022-11-19 21:57:42
 * @Description: 请求拦截
 */

import axios from "axios";

const service = axios.create({
  timeout: 500000,
});
// // 通过axios请求拦截器添加token，保证拥有获取数据的权限
service.interceptors.request.use((config) => {
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

export default service;
