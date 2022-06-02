<template>
  <div
    class="w-full h-full flex flex--middle flex--center flex--fit flex--nowrap"
  >
    <!-- <no-data-found /> -->

    <div
      id="loader-container"
      v-pulse-loader="{
        overlay: true,
        isVisible: isPulseLoaderVisible,
      }"
    >
      HELLLO
    </div>

    <s-button
      label="Toggle PulseLoader"
      color="primary"
      @click.native="isPulseLoaderVisible = !isPulseLoaderVisible"
    />

    <!-- <pulse-loader /> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isPulseLoaderVisible: false,
    };
  },
  mounted() {
    // Basic  Usage of Modal with data passing.
    // this.$root.$emit("modal-open", "change-status", { status: "Inactive" });
  },
};
</script>

<style></style>
