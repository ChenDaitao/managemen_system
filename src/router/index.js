/*
 * @Author: chenxiaolin 690208900@qq.com
 * @Date: 2022-08-27 21:22:11
 * @LastEditors: chenxiaolin 690208900@qq.com
 * @LastEditTime: 2022-09-01 22:47:02
 * @FilePath: \ppmanage\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  /* 页面重定向 */
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName:"login" */ "../views/LoginView"),
  },
  {
    path: "/home",
    component: () => import(/*ebpackChunkName:"home"  */ "../views/HomeView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
