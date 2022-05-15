<template>
  <Slideover id="list-settings" title="List Settings" :size="300">
    <div class="p-4 my-4">
      <VListPerPage :parent="instance" v-slot="{ options, value, change }">
        <s-field label="Per Page">
          <s-select :value="value" @input="change($event)" :options="options" />
        </s-field>
      </VListPerPage>

      <s-field label="Columns">
        <VListAttributes
          class="divide-y border"
          :parent="instance"
          v-slot="{ attr, update }"
        >
          <label
            class="flex flex--fit flex--nowrap flex--between flex--center py-2 cursor-pointer px-3 hover:bg-gray-100"
            :key="`attr-${attr.name}`"
            :class="attr.visible ? 'text-gray-500' : 'text-gray-400'"
          >
            <span class="text-xs font-semibold">
              {{ attr.label }}
            </span>
            <s-icon
              :name="
                attr.visible ? 'IconMdiEyeOutline' : 'IconMdiEyeOffOutline'
              "
            />

            <input
              class="absolute w-0.5 h-0.5 opacity-5"
              type="checkbox"
              :checked="attr.visible"
              @input="update(attr.name, 'visible', $event.target.checked)"
            />
          </label>
        </VListAttributes>
      </s-field>
    </div>
  </Slideover>
</template>

<script>
export default {
  props: {
    instance: Object,
  },
};
</script>
