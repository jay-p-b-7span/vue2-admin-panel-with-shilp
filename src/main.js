import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// All PLugins
import "./plugins/index";
// All Styles
import "./style/index.scss";

// Global Components
import "./global";
Vue.config.productionTip = false;

// Custom Directives
import "@/directives/index";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
