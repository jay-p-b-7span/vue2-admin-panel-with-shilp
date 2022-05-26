<template>
  <s-button
    badge
    theme="muted"
    :label="label"
    :color="color"
    icon="IconMdiSquareRounded"
    shape="pill"
    :size="size"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: "String",
      required: true,
    },
    color: {
      type: "String",
      required: true,
    },
    size: {
      type: "String",
      default: "sm",
    },
  },
};
</script>

<style></style>
