import Vue from "vue";
import bus from "@/bus";

Vue.component("ItemForm", require("@/components/form/ItemForm").default);
Vue.component("Modal", require("@/components/Modal").default);
Vue.component("SubNav", require("@/components/SubNav").default);
Vue.component("VpList", require("@/components/vp-list/Index").default);
Vue.component("Slideover", require("@/components/slideover/Index").default);

/**
 * Auto Register Icons
 */
const icons = require.context("./icons/", true, /\.vue$/i);
icons.keys().map((key) => {
  const path = key.split("/");
  const name = path[path.length - 1].split(".")[0];
  return Vue.component("Icon" + name, icons(key).default);
});

Vue.prototype.$slideover = {
  open: (id) => bus.$emit("slideover-open", id),
  close: (id) => bus.$emit("slideover-close", id),
  toggle: (id) => bus.$emit("slideover-toggle", id),
};
