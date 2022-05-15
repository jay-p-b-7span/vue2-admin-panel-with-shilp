<template>
  <button
    class="slideover-button"
    :class="theme && `slideover-button--${theme}`"
  >
    <span>{{ label }}</span>
    <Icon class="slideover-button__icon" v-if="icon" :name="icon" />
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,
    theme: String,
  },
};
</script>

<style lang="scss">
.slideover-button {
  @apply flex flex-nowrap items-center justify-between text-xs h-9 hover:bg-gray-50 w-full px-3 font-bold text-gray-500;
  &:disabled {
    @apply cursor-not-allowed opacity-70;
  }
}
.slideover-button__icon {
  @apply w-4 h-4 text-gray-400;
}
.slideover-button--danger {
  @apply text-danger-500;
  .slideover-button__icon {
    @apply text-danger-400;
  }
}
.slideover-button--warning {
  @apply text-warning-500;
  .slideover-button__icon {
    @apply text-warning-400;
  }
}
</style>
