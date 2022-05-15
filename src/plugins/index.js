import "./shilp-vue";
import "./axios";
import "./vee-validate";
import PortalVue from "portal-vue";
import Vue from "vue";
import "./v-list";
Vue.use(PortalVue);

/*
 * Vue Select
 */

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

// ToolTip
import vTooltip from "v-tooltip";
Vue.use(vTooltip, {
  defaultBoundariesElement: document.body,
});
