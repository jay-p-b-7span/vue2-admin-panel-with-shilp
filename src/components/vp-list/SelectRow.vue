<template>
  <div
    class="vpr-table-select"
    :class="{ 'vpr-table-select--selected': state != 'none' }"
  >
    <p class="vpr-table-select__index">{{ index }}</p>
    <s-button
      class="vpr-table-select__check"
      @click.native="$emit('change')"
      :icon="$options.icons[state]"
    />
  </div>
</template>

<script>
const icons = {
  all: "IconMdiCheckboxMarked",
  some: "IconMdiCheckboxIndeterminate",
  none: "IconMdiCheckboxBlankOutline",
};
export default {
  icons,
  props: {
    index: [String, Number],
    state: String,
  },
};
</script>
