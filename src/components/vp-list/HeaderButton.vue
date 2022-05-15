<template>
  <button
    class="flex flex--fit flex--nowrap flex--middle flex--center cursor-pointer group"
    :class="{ 'w-12': !label, 'px-4': label }"
  >
    <span class="block relative">
      <s-icon
        class="w-5 h-5 hover:text-grey-darker relative z-10"
        :class="{ 'text-warning-400': ping, 'text-gray-400': !ping }"
        :name="icon"
      />
      <span
        v-if="ping"
        class="w-full h-full rounded-full bg-warning-light animate-ping absolute left-0 top-0"
      ></span>
    </span>
    <span class="ml-2 text-grey-dark hover:text-grey-darker" v-if="label">
      {{ label }}
    </span>
  </button>
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
