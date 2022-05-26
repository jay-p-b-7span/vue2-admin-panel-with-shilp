<template>
  <s-icon :name="name" :class="`w-${size} h-${size} text-${color}`" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: "6",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style></style>
