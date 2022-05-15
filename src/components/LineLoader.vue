<template>
  <div class="line-loader">
    <div class="line-loader__item"></div>
  </div>
</template>

<style lang="scss">
.line-loader {
  background: var(--color--primary--lighter);
  height: 2px;
  width: 100%;
  overflow: hidden;
}
.line-loader__item {
  position: relative;
  width: 100%;
  height: 100%;
}
.line-loader__item:before {
  content: "";
  position: absolute;
  height: 100%;
  animation: line1 1.5s infinite ease-out;
  background: var(--color--primary);
}
.line-loader__item:after {
  content: "";
  position: absolute;
  height: 100%;
  animation: line2 1.5s infinite ease-in;
  background: var(--color--primary--light);
}
@keyframes line1 {
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}
@keyframes line2 {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}
</style>
