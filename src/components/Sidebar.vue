<template>
  <!-- NAV -->
  <div class="sidebar-parent-div">
    <!-- Logo -->
    <div v-show="collapsed" class="p-4">
      <img src="@/assets/small-logo.png" class="h-auto w-100" />
    </div>
    <div v-show="!collapsed" class="p-6">
      <img src="@/assets/logo.svg" width="150px" height="auto" />
    </div>

    <!-- Nav -->
    <div class="sidebar-nav" :class="{ 'sidebar-nav--collapse': collapsed }">
      <s-button-group
        size="md"
        align="left"
        :shape="collapsed ? 'square' : null"
      >
        <s-button
          icon="IconIcRoundDashboard"
          :to="{ name: 'dashboard' }"
          label="Dashboard"
        />

        <s-button
          class="mt-auto"
          icon="IconIcTwotoneAccountCircle"
          label="Account"
        />

        <s-button
          @click.native="toggleSidebar"
          :icon="collapsed ? 'IconMdiArrowRight' : 'IconMdiArrowLeft'"
          label="Collapse"
        />
      </s-button-group>
    </div>

    <p class="bg-black bg-opacity-50 text-xs text-center py-1 text-grey-light">
      <span v-if="!collapsed">Version: </span>
      <span>{{ version }}</span>
    </p>
  </div>
</template>

<script>
import { version } from "../../package.json";
export default {
  components: {},

  data() {
    return {
      version,
      collapsed: false,
    };
  },
  computed: {},
  methods: {
    toggleSidebar() {
      if (this.collapsed) {
        this.collapsed = false;
      } else {
        this.collapsed = true;
      }
      this.setAdminNavCollapsedinLocalStorage(this.collapsed);
    },
    setAdminNavCollapsedinLocalStorage(value) {
      localStorage.setItem("isAdminNavCollapsed", value);
    },
    logoutHandler() {
      localStorage.removeItem("admin-token");
      this.$router.push({ name: "login" });
    },
    tooltip(content) {
      return {
        content: content,
        disabled: !this.collapsed,
        delay: { show: 500, hide: 0 },
        placement: "right",
      };
    },
  },
};
</script>

<style lang="scss">
.sidebar-parent-div {
  background: var(--color--grey--darkest);
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
}
.sidebar-nav {
  padding: 0 12px;
  margin-top: 12px;
  flex-grow: 1;
  text-align: center;

  .button-group {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .button {
    --button--color: rgba(255, 255, 255, 0.3);
    --button--hover-color: rgba(255, 255, 255, 1);
    flex: 0 0 auto;
  }
  .button--active,
  .button--exact-active {
    position: relative;
    --button--bg: rgba(255, 255, 255, 0.08);
    --button--hover-bg: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
  .button--highlight {
    --button--color: #{--color("warning", "light")};
    --button--hover-color: #{--color("warning")};
  }
}

.sidebar-nav--collapse {
  .button-group {
    display: inline-flex;
  }
  .button__label {
    display: none;
  }
}
</style>
