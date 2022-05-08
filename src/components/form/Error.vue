<template>
  <div v-if="data" class="error">
    <div
      class="p-4 radius-3 bg-danger-lightest mb-3"
      title="There were some errors!"
      color="danger"
      theme="muted"
      fluid
    >
      <h5 class="text-danger">
        {{ parsed.message || "Awww, we're sorry" }}
      </h5>
      <div class="text-danger-darkest">
        <template v-if="typeof parsed.errors == 'object'">
          <template v-for="field in parsed.errors">
            <template v-if="Array.isArray(field)">
              <p v-for="(error, index) in field" :key="`${field}-${index}`">
                {{ error }}
              </p>
            </template>
            <template v-else>
              <p :key="`${field}`">{{ field }}</p>
            </template>
          </template>
        </template>
        <p v-else>{{ parsed.errors }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],

  computed: {
    graphQl() {
      const message =
        this.data[0].message == "validation"
          ? "Invalid Data Provided"
          : this.data[0].message || "Unknown Graph API Error!";
      const errors = this.data[0].fields;
      return {
        message,
        errors,
      };
    },

    rest() {
      if (this.data?.errors) {
        return {
          message: this.data.error,
          errors: this.data.errors,
        };
      } else if (this.data.error) {
        return {
          message: this.data.error,
        };
      } else if (this.data?.message) {
        return {
          message: this.data.message,
        };
      } else {
        return {
          message: "Unknown API Error!",
        };
      }
    },

    error() {
      return {
        message: "Oops!",
        errors: this.data.message,
      };
    },

    parsed() {
      if (this.data instanceof Error) {
        return this.error;
      }
      if (Array.isArray(this.data)) {
        return this.graphQl;
      } else {
        return this.rest;
      }
    },
  },
};
</script>
