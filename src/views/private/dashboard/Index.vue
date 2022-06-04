<template>
  <div class="flex flex--fit flex--column g-4 flex--middle h-full flex--center">
    <!-- <no-data-found /> -->

    <div
      id="loader-container"
      v-pulse-loader="{
        isVisible: isPulseLoaderVisible,
        color: 'success',
        overlay: true,
      }"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis explicabo
      accusantium odio iste molestias numquam expedita quas libero eligendi modi
      fugit voluptate, sapiente quisquam consequuntur totam dolorum itaque cum
      esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
      explicabo accusantium odio iste molestias numquam expedita quas libero
      eligendi modi fugit voluptate, sapiente quisquam consequuntur totam
      dolorum itaque cum esse?Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quis explicabo accusantium odio iste molestias numquam expedita quas
      libero eligendi modi fugit voluptate, sapiente quisquam consequuntur totam
      dolorum itaque cum esse?
    </div>

    <!-- <s-button
      label="Toggle PulseLoader"
      color="primary"
      @click.native="isPulseLoaderVisible = !isPulseLoaderVisible"
    /> -->

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
