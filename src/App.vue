<template>
  <div id="app">
    <s-notification-container width="280px" />
    <s-confirm />

    <router-view></router-view>

    <s-modal-container />
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Admin Panel";
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
