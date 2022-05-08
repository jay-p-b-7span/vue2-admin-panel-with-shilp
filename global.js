import Vue from "vue";

Vue.component("ItemForm", require("@/components/form/ItemForm").default);
Vue.component("Modal", require("@/components/Modal").default);
Vue.component("StatusInput", require("@/components/StatusInput").default);

/**
 * Auto Register Icons
 */
const icons = require.context("./icons/", true, /\.vue$/i);
icons.keys().map((key) => {
  const path = key.split("/");
  const name = path[path.length - 1].split(".")[0];
  return Vue.component("Icon" + name, icons(key).default);
});
