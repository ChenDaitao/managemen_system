/*
 * @Date: 2022-11-13 22:32:16
 * @LastEditTime: 2022-11-19 20:35:07
 * @Description:
 */
import axios from "./interceptors";

// https://lianghj.top:8888/api/private/v1/
const URLConfig = {
  baseUrl: "/api/private/v1",
  sysMgt: "",
};

class Apis {
  constructor() {
    this.baseUrl = URLConfig.baseUrl;
    this.sysMgtUrl = URLConfig.sysMgt;
  }

  getUrl(url, params, config) {
    return this.get(url, params, config);
  }
  // 请求封装
  get(url, param, config) {
    // let _ts = randomWord(8);
    let params = Object.assign({}, param /* { _ts: _ts } */);
    let configs = Object.assign({}, config, { params: params });
    return axios.get(url, configs);
  }
  async post(url, params, config) {
    return axios.post(url, params, config);
  }
  delete(url, config) {
    return axios.delete(url, config);
  }
  put(url, params, config) {
    return axios.put(url, params, config);
  }
}
export default Apis;
