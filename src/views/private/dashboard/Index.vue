<template>
  <div>
    <vp-list
      :per-page="10"
      :filters="{}"
      :columns="columns"
      endpoint="products"
      :search="false"
      ref="list"
      title="Products"
    ></vp-list>
    <!-- class="h-100 grid-cols-10 col-start-4 w-screen" -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: "_index", label: "#" },
        "name",
        { name: "brand_logo", label: "Brand Logo" },
        "status",
        "price",
        { name: "actions", rowClick: false },
      ],
    };
  },
  mounted() {
    // Basic  Usage of Modal with data passing.
    // this.$root.$emit("modal-open", "change-status", { status: "Inactive" });
  },
};
</script>

<style></style>
