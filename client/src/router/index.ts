import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home/index.vue"),
    children: [
      {
        path: "/",
        name: "Students",
        component: () =>
          import(/* webpackChunkName: "Students" */ "../views/Students/index.vue"),
      },
      {
        path: "/new",
        name: "NewStudent",
        component: () =>
          import(
            /* webpackChunkName: "NewStudent" */ "../views/NewStudent/index.vue"
          ),
      },
      {
        path: "/student/:ra",
        name: "EditStudent",
        component: () =>
          import(
            /* webpackChunkName: "NewStudent" */ "../views/NewStudent/index.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
