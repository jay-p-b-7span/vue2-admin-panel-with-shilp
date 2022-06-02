<template>
  <div
    class="w-full h-full flex flex--middle flex--center flex--fit flex--nowrap"
  >
    <!-- <no-data-found /> -->

    <div id="loader-container" v-pulse-loader="true">HELLLO</div>

    <!-- <pulse-loader /> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    // Basic  Usage of Modal with data passing.
    // this.$root.$emit("modal-open", "change-status", { status: "Inactive" });
  },
};
</script>

<style></style>
