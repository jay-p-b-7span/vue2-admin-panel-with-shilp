<template>
  <div id="app">
    <s-notification-container width="280px" />
    <s-confirm />

    <router-view></router-view>
    <portal-target id="modal-container" name="modal-container" />

    <change-status-modal />
  </div>
</template>

<script>
export default {
  components: {
    ChangeStatusModal: require("@/components/modal/ChangeStatus.vue").default,
  },
};
</script>
<style lang="scss"></style>
