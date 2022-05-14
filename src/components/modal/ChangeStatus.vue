<template>
  <Modal id="change-status" v-slot="{ close }">
    <Shell title="Change Status" :close="close">
      <div class="p-4">
        <s-field label="Status">
          <s-textbox v-model="status" disabled />
        </s-field>
      </div>
    </Shell>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      status: "Active",
    };
  },
  components: {
    Modal: require("./Index").default,
    Shell: require("./Shell.vue").default,
  },
};
</script>

<style></style>
