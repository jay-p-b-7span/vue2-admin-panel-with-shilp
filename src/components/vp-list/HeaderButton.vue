<template>
  <s-button
    :icon="icon"
    theme="outline"
    color="grey"
    shape="square"
    class="flex flex--fit flex--nowrap flex--middle flex--center cursor-pointer h-full"
    :class="{
      'w-12': !label,
      'px-4': label,
      'text-warning-400': ping,
      'text-gray-400': !ping,
    }"
  >
    <span class="block relative">
      <span
        v-if="ping"
        class="w-full h-full rounded-full bg-warning-light animate-ping absolute left-0 top-0"
      ></span>
    </span>
    <span class="ml-2 text-grey-dark hover:text-grey-darker" v-if="label">
      {{ label }}
    </span>
  </s-button>
</template>

<script>
export default {
  props: {
    icon: String,
    ping: Boolean,
    label: String,
  },
};
</script>
