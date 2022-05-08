import Vue from "vue";

import listConfig from "./shilp-vue-list";
import ShilpVue, {
  FieldValidate,
  FormValidate,
  ListPlugin,
  ListTable,
} from "shilp-vue";

Vue.use(ShilpVue, {});

Vue.use(ListPlugin, listConfig);
Vue.component("SFieldValidate", FieldValidate);
Vue.component("SFormValidate", FormValidate);
Vue.component("SpListTable", ListTable);
