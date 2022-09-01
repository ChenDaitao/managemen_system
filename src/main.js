/*
 * @Author: chenxiaolin 690208900@qq.com
 * @Date: 2022-08-27 21:22:11
 * @LastEditors: chenxiaolin 690208900@qq.com
 * @LastEditTime: 2022-08-27 23:00:38
 * @FilePath: \ppmanage\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
Vue.prototype.$http = axios;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
