<template>
  <div id="app">
    <s-notification-container width="280px" />
    <s-confirm />

    <router-view></router-view>

    <s-modal-container />
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Admin Panel";
  },
};
</script>
<style lang="scss"></style>
