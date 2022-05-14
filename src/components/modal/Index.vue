<template>
  <Portal v-if="isOpen" to="modal-container" slim>
    <div :id="id" class="v__modal" :class="classList">
      <div class="v__modal__overlay"></div>
      <div class="v__modal__wrapper" @click.self="overlayClose">
        <slot :close="close" :data="scope"></slot>
      </div>
    </div>
  </Portal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null,
    },
    closeOnOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
      scope: null,
    };
  },

  computed: {
    classList() {
      const classes = [];
      if (this.isOpen) classes.push(`modal--show`);
      return classes;
    },
  },

  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 27 && this.closeOnEsc) {
        this.close();
      }
    });
    this.$root.$on("modal-open", (id, scope) => {
      this.scope = scope;
      this.open(id);
    });
    this.$root.$on("modal-close", (id) => {
      this.scope = null;
      this.close(id);
    });
  },

  methods: {
    open(id) {
      if (!id) return;
      if (this.id === id) {
        this.isOpen = true;
        this.$emit("open", this.scope);
      } else {
        this.isOpen = false;
      }
    },
    close(id) {
      let shouldClose = false;
      if (id) {
        if (this.id === id) {
          shouldClose = true;
        }
      } else {
        shouldClose = true;
      }
      if (shouldClose) {
        this.isOpen = false;
        this.$emit("close");
      }
    },
    overlayClose() {
      if (this.closeOnOverlay) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
// below v__ prefix is given because it was conflicting with shilp classes
.v__modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
}
.v__modal__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
.v__modal__wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
