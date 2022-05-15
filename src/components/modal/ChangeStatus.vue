<template>
  <Modal id="change-status" v-slot="{ close, data }">
    <Shell title="Change Status" :close="close">
      <template #default>
        <div class="p-4">
          <s-field label="Status">
            <s-textbox v-model="data.status" disabled />
          </s-field>
        </div>
      </template>

      <template #footer>
        <s-button label="Change" color="primary" theme="solid" />
        <s-button label="Close" color="grey" theme="outline" />
      </template>
    </Shell>
  </Modal>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Modal: require("./Index").default,
    Shell: require("./Shell.vue").default,
  },
};
</script>

<style></style>
