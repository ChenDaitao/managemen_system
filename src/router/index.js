import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import welcome from "../components/WelcomeCmp";
import users from "../components/UserCmp";

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
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: welcome },
      {
        path: "/users",
        component: users,
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

export default router;
