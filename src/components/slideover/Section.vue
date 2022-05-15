<template>
  <section class="s-accordion">
    <header @click="isOpen = !isOpen">
      <s-icon
        class="s-accordion__arrow"
        :name="isOpen ? 'IconMdiMenuDownOutline' : 'IconMdiMenuRightOutline'"
      />
      <p class="s-accordion__title">{{ label }}</p>
      <s-icon
        v-if="help"
        class="s-accordion__help"
        name="IconMdiHelpCircleOutline"
        v-tooltip="help"
      />
    </header>
    <div class="s-accordion__content" v-if="isOpen">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    label: String,
    help: String,
    open: Boolean,
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
};
</script>

<style lang="scss">
.s-accordion {
  border-bottom-width: 1px;
  border-color: var(--color--grey--lighter);
  header {
    height: 28px;
    padding: 0 4px;
    background: var(--color--grey--lighter);
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    &:hover {
      .s-accordion__title {
        color: var(--color--grey);
      }
    }
  }
}
.s-accordion__arrow {
  flex-grow: 0;
  flex-shrink: 0;
  color: var(--color--grey);
}
.s-accordion__title {
  padding: 0 4px;
  font-size: var(--text--xs);
  color: var(--color--grey--light);
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
}
.s-accordion__content {
  border-top: 1px solid var(--color--grey--lighter);
}
.s-accordion__help {
  color: var(--color--grey--light);
  margin-left: auto;
  width: 12px;
  height: 12px;
  margin-right: 4px;
}
</style>
