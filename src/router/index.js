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
    redirect: { name: "dashboard" },
    component: require("@/views/private/Hydrate.vue").default,
    meta: {
      public: false,
    },
    children: privateRoutes,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      public: true,
    },
    component: require("@/views/public/Login.vue").default,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.public === true) {
    next();
  } else {
    const token = localStorage.getItem("admin-token");
    if (token) {
      document.title =
        to.meta && to.meta.label
          ? to.meta.label + " | Admin Panel"
          : "Admin Panel";
      next();
    } else {
      next({ name: "login" });
    }
  }
});

export default router;
