import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import privateRoutes from "./private";
const routes = [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/",
    name: "hydrate",
    component: require("@/views/private/Hydrate.vue").default,
    meta: {
      public: false,
    },
    children: privateRoutes,
  },
  {
    path: "login",
    name: "login",
    component: require("@/views/public/Login.vue").default,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
