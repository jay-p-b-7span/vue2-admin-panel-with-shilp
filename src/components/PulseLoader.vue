<template>
  <div class="loader-container" id="pulse-loader">
    <div
      class="loader-child first-child"
      :class="`pulse-loader--${color} w-${size} h-${size}`"
    ></div>
    <div
      class="loader-child second-child"
      :class="`pulse-loader--${color} w-${size} h-${size}`"
    ></div>
    <div
      class="loader-child third-child"
      :class="`pulse-loader--${color} w-${size} h-${size}`"
    ></div>

    <div
      class="loader-child fourth-child"
      :class="`pulse-loader--${color} w-${size} h-${size}`"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: [Number, String],
      default: 4,
    },
  },
};
</script>

<style lang="scss">
.loader-container {
  position: relative;

  .loader-child {
    display: inline-block;
    margin: 2px;
    border-radius: 50%;
    animation: 1.2s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.12s infinite normal
      both running pulse-loader-animation;

    &.second-child {
      animation-delay: 0.24s;
    }
    &.third-child {
      animation-delay: 0.36s;
    }
    &.fourth-child {
      animation-delay: 0.48s;
    }
  }

  @each $color, $value in $shilp-colors {
    .pulse-loader--#{$color} {
      background: var(--color--#{$color});
    }
  }
}

// .loader-child.second-child {
//   animation-delay: 0.24s;
// }

// .loader-child.third-child {
//   animation-delay: 0.36s;
// }

// .loader-child.fourth-child {
//   animation-delay: 0.48s;
// }

@keyframes pulse-loader-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  45% {
    transform: scale(0.1);
    opacity: 0.7;
  }

  80% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
