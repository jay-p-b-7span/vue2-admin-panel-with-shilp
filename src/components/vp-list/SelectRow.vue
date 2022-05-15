<template>
  <div
    class="vpr-table-select"
    :class="{ 'vpr-table-select--selected': state != 'none' }"
  >
    <p class="vpr-table-select__index">{{ index }}</p>
    <button class="vpr-table-select__check">
      <s-icon :name="$options.icons[state]" @click.native="$emit('change')" />
    </button>
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
