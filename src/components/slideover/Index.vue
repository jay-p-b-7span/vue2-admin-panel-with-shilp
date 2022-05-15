<template>
  <Portal to="slideover-container" slim>
    <div
      :id="id"
      class="slideover"
      :class="[`slideover--${position}`, { 'slideover--open': isOpen }]"
      :style="{ width: size + 'px' }"
    >
      <div
        class="flex flex--fit flex--nowrap flex--middle flex--between border-grey-lighter border-b"
      >
        <p class="text-grey text-sm font-semibold px-4">
          {{ title }}
        </p>
        <s-button
          icon="IconMdiCloseCircleOutline"
          @click.native="close(id)"
          shape="circle"
          theme="muted"
          color="grey"
        />
      </div>

      <!-- Loading -->
      <div
        class="flex flex--center flex--middle h-8 w-8"
        v-if="loading"
        v-shilp-loader="loading"
      ></div>

      <!-- Slots -->
      <template v-else>
        <div class="flex-grow overflow-auto">
          <slot />
        </div>

        <div v-if="$scopedSlots.footer" class="border-t p-2">
          <slot name="footer" />
        </div>
      </template>
    </div>
  </Portal>
</template>

<script>
import bus from "@/bus";
export default {
  props: {
    id: String,
    size: {
      type: Number,
      default: 200,
    },
    position: {
      type: String,
      default: "right",
    },
    title: String,
    loading: Boolean,
  },
  data() {
    return {
      isOpen: false,
      scope: null,
      autoClose: true,
    };
  },
  mounted() {
    bus.$on("slideover-open", (id, scope) => {
      this.open(id);
      this.scope = scope;
    });
    bus.$on("slideover-close", (id) => {
      this.close(id);
      this.scope = null;
    });
    bus.$on("slideover-toggle", (id) => {
      this.toggle(id);
    });
  },
  methods: {
    open(id) {
      if (!id) return;
      if (this.id == id) {
        this.isOpen = true;
        this.$emit("open");
      } else {
        this.isOpen = false;
      }
    },
    close(id) {
      let shouldClose = false;
      if (id) {
        if (this.id == id) {
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
    toggle(id) {
      if (this.id == id) {
        bus.$emit("slideover-close");
        if (this.isOpen) {
          this.close(id);
        } else {
          this.open(id);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.slideover {
  width: 200px;
  position: fixed;
  background: white;
  display: flex;
  flex-direction: column;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  top: 0;
  bottom: 0;
  z-index: 50;
}
.slideover--left {
  --tw-translate-x: -100%;
  left: 0;

  &.slideover--open {
    box-shadow: 30px 0px 30px 0 rgba(0, 0, 0, 0.1);
    --tw-translate-x: 0px;
  }
}
.slideover--right {
  --tw-translate-x: 100%;
  right: 0;

  &.slideover--open {
    box-shadow: -30px 0px 30px 0 rgba(0, 0, 0, 0.1);
    --tw-translate-x: 0px;
  }
}
</style>
