import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import welcome from "../components/WelcomeCmp";

const routes = [
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
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: welcome },
      {
        path: "/users",
        component: () =>
          import(/*ebpackChunkName:"home"  */ "../components/UserCmp"),
      },
      {
        path: "/rights",
        component: () =>
          import(/*ebpackChunkName:"home"  */ "../components/power/RightsCmp"),
      },
      {
        path: "/roles",
        component: () =>
          import(/*ebpackChunkName:"home"  */ "../components/power/RolesCmp"),
      },
    ],
    component: () => import(/*ebpackChunkName:"home"  */ "../views/HomeView"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
//前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  if (!window.sessionStorage.getItem("token")) return next("/login");
  next();
});
export default router;
