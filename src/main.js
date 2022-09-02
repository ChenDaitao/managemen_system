import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/scss/base.scss";
import ElementUI, { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
Vue.config.productionTip = false;
Vue.use(ElementUI);
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";

/* 登录之后的每个请求都需要加token  */
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
