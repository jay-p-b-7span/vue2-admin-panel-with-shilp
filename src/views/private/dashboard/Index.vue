<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$root.$emit("modal-open", "change-status");
  },
};
</script>

<style></style>
