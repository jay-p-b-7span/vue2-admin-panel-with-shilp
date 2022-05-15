import Vue from "vue";

import ShilpVue, { FieldValidate, FormValidate } from "shilp-vue";

Vue.use(ShilpVue, {});

Vue.component("SFieldValidate", FieldValidate);
Vue.component("SFormValidate", FormValidate);

require("shilp-vue/dist/shilp-vue.css");
