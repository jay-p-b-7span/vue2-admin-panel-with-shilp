<template>
  <div class="modal-shell" :class="`modal-shell--${size}`">
    <header class="modal-shell__header">
      <p
        v-if="title"
        class="pl-4 flex flex--fit flex--middle font-medium text-md"
      >
        {{ title }}
      </p>
      <div class="flex-grow">
        <slot name="header"> </slot>
      </div>
      <s-button
        theme="muted"
        icon="IconMdiClose"
        size="sm"
        color="grey"
        shape="circle"
        @click.native="close()"
      />
    </header>

    <!-- Loading -->
    <div v-if="loading" v-shilp-loader="loading" class="v__modal--loader"></div>

    <!-- Content -->
    <template v-else>
      <div class="modal-shell__body">
        <slot />
      </div>
      <footer v-if="footer" class="modal-shell__footer">
        <slot name="footer">
          <div>
            <slot name="footer-left"> </slot>
          </div>
          <div class="flex my-2 flex--end p-3 flex--fit">
            <slot name="footer-actions"> </slot>
          </div>
        </slot>
      </footer>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    close: {
      type: Function,
      default: null,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "md",
    },
    loading: Boolean,
  },
};
</script>

<style lang="scss">
.modal-shell {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  max-height: calc(100vh - 80px);
}
.modal-shell__header {
  padding: 5px 10px;
  height: 50px;
  border-bottom: 2px solid var(--color--grey--lighter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-shell__body {
  padding: 20px;
  overflow: auto;
  flex-grow: 1;
}

.modal-shell--sm {
  width: 320px;
  max-width: 100%;
}

.modal-shell--md {
  width: 480px;
  max-width: 100%;
}

.modal-shell--lg {
  width: 640px;
  max-width: 100%;
}

.modal-shell--fs {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 20px);
}

.modal-shell__footer {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--color--grey--lighter);
}

.v__modal--loader {
  text-align: center;
  padding: 50px;
}
</style>
