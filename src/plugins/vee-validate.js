import Vue from "vue";

/**
 * Vee Validate
 */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";

const rules = { required, email, min, max };

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule], // add its message
  });
}

extend("positiveNonZeroInteger", {
  validate: (value) => {
    if (value <= 0) {
      return "Value must be positive";
    }
    if (value % 1 !== 0 || (value.includes && value.includes("."))) {
      return "Value shouldn't be decimal";
    }
    return true;
  },
});

extend("positiveNonZeroFloat", {
  validate: (value) => {
    if (parseFloat(value) <= 0) {
      return "Value must be positive";
    }
    return true;
  },
});

extend("positiveFloat", {
  validate: (value) => {
    if (value < 0) {
      return "Value must be positive";
    }
    return true;
  },
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
