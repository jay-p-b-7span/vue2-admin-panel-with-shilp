<template>
  <s-nav class="sub-nav" fluid stack align="left" size="lg">
    <slot />
  </s-nav>
</template>

<style lang="scss">
.sub-nav {
  .button {
    --button--hover-bg: #{--color("grey", "lightest")};
    --button--color: #{--color("grey")};
    --button--hover-color: #{--color("grey")};
    //margin-top: --space(1);
    //border-radius: 0;
  }
  .nav__item--exact-active .button,
  .nav__item--active:not(.is-root) .button {
    --button--color: #{--color("primary")};
    --button--hover-color: #{--color("primary")};
    --button--bg: #{--color("primary", "lightest")};
    --button--hover-bg: #{--color("primary", "lightest")};
    font-weight: bold;
  }

  .nav__item {
    + .nav__item {
      margin-top: --space(1);
    }
  }
}
</style>
