<template>
  <div class="mb-2">
    <div class="flex flex--middle flex--fit">
      <s-button
        v-if="backRoute"
        color="grey"
        theme="link"
        icon="IconIcOutlineArrowCircleLeft"
        class="mr-2"
        :to="backRoute"
      />
      <component :is="tag" class="text-p1-300">{{ title }}</component>
    </div>
    <div class="text-grey">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    tag: {
      type: String,
      default: "h3",
    },
    backRoute: {
      type: Object,
    },
  },
};
</script>
