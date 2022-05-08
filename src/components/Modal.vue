<template>
  <s-modal
    v-bind="$attrs"
    overlay="dark"
    #default="scope"
    :full-height="fullHeight"
    @close="$emit('close')"
    @open="$emit('open')"
  >
    <div
      class="w-modal bg-light radius-4 p-4"
      :class="{ 'w-modal--full-height': fullHeight }"
    >
      <!-- HEADER -->
      <header class="flex flex--middle pb-2 text-p1-300">
        <h3 class="flex__fluid">{{ title }}</h3>
        <s-button
          v-if="close"
          class="flex__fit"
          icon="IconMdiCloseCircleOutline"
          theme="muted"
          color="grey"
          shape="circle"
          @click.native="$root.$emit('shilp-modal-close')"
        />
      </header>

      <!-- Sub Header  -->
      <h4 class="text-grey">
        <slot name="message"></slot>
      </h4>
      <!-- CONTENT -->
      <div class="w-modal__content">
        <slot :id="$attrs.id" :data="scope" />
      </div>

      <!-- FOOTER -->
      <footer v-if="hasFooter" class="flex p-3 t flex--middle flex--nowrap">
        <div class="flex__fluid">
          <slot name="footer-note"></slot>
        </div>

        <div class="flex__fit ml-auto">
          <slot name="footer-actions">
            <s-button
              v-if="reset && $listeners.reset"
              color="grey"
              theme="muted"
              @click.native="$emit('reset')"
              :label="resetLabel"
            />
            <s-button
              v-if="save && $listeners.save"
              class="ml-2"
              color="primary"
              @click.native="$emit('save')"
              :icon="saveIcon"
              :label="saveLabel"
              :loader="saving"
            />
          </slot>
        </div>
      </footer>
    </div>
  </s-modal>
</template>

<script>
export default {
  props: {
    title: String,
    saving: { type: Boolean, default: false },
    fullHeight: { type: Boolean, default: false },
    reset: { type: Boolean, default: true },
    save: { type: Boolean, default: true },
    saveLabel: {
      type: String,
      default: "Save",
    },
    resetLabel: {
      type: String,
      default: "Reset",
    },
    saveIcon: {
      type: String,
      default: null,
    },
    close: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasFooter() {
      return (
        this.$listeners.save ||
        this.$listeners.reset ||
        this.$scopedSlots["footer-note"] ||
        this.$scopedSlots["footer-actions"]
      );
    },
  },
};
</script>

<style lang="scss"></style>
