<template>
  <!-- NAV -->
  <div class="web-nav px-2 h-100">
    <div class="flex flex--center flex--fit p-3">
      <img src="@/assets/logo.svg" height="auto" width="100" />
    </div>
    <s-button-group
      stack
      size="lg"
      align="left"
      :shape="collapsed ? 'square' : null"
      class="web-nav__items flex flex--column"
    >
      <s-button
        label="Dashboard"
        icon="vmdi-view-dashboard"
        :to="{ name: 'dashboard' }"
        v-tooltip="tooltip('Dashboard')"
      />
      <s-button
        label="PMS"
        icon="vmdi-domain"
        @click.native="check('pms')"
        v-tooltip="tooltip('PMS')"
        v-if="!superAdmin"
      />
      <s-button
        label="Inquiry"
        :to="{ name: 'inquiry' }"
        icon="vmdi-account-question"
        v-tooltip="tooltip('Inquiry')"
        v-if="superAdmin"
      />
      <s-button
        label="Projects"
        @click.native="check('project')"
        icon="vmdi-folder-multiple"
        v-tooltip="tooltip('Projects')"
        v-if="!superAdmin"
      />
      <!-- <s-button
        label="Project Members"
        icon="vmdi-account-group"
        :to="{ name: 'project-members' }"
        v-tooltip="tooltip('Project Members')"
        
      /> -->
      <s-button
        label="Documents"
        icon="vmdi-file-document"
        @click.native="check('document')"
        v-tooltip="tooltip('Documents')"
        v-if="!superAdmin"
      />
      <s-button
        label="Correspondence"
        @click.native="check('letter')"
        icon="vmdi-email-newsletter"
        v-tooltip="tooltip('Letters')"
        v-if="!superAdmin"
      />
      <s-button
        label="RFI"
        icon="vmdi-account-group"
        @click.native="check('rfi')"
        v-tooltip="tooltip('RFI')"
        v-if="!superAdmin"
      />
      <s-button
        label="Invoices"
        @click.native="check('invoice')"
        icon="vmdi-receipt"
        v-tooltip="tooltip('Invoices')"
        v-if="!superAdmin"
      />
      <s-button
        label="Progress Reports"
        @click.native="check('progress-report')"
        icon="vmdi-chart-box"
        v-tooltip="tooltip('Progress Reports')"
        v-if="!superAdmin"
      />
      <s-button
        label="Users"
        @click.native="userRouteHandler"
        :active="userNavActive"
        icon="vmdi-account-multiple"
        v-tooltip="tooltip('Users')"
        v-if="!superAdmin"
      />
      <s-button
        icon="vmdi-cogs"
        label="Company Settings"
        @click.native="check('company-settings')"
        v-tooltip="tooltip('Company Settings')"
        v-if="!superAdmin"
      />
      <!-- <s-button
        class="mt-auto bg-primary-darkest"
        icon="vmdi-account-circle"
        color="primary"
        :label="userName"
        shape="rectangle"
        :to="{ name: 'profile' }"
        v-tooltip="tooltip(userName)"
      /> -->
      <s-button
        class="mt-auto"
        icon="vmdi-account-circle"
        :label="userName"
        :to="{ name: 'profile' }"
        v-tooltip="tooltip(userName)"
      />
      <!-- :to="{ name: 'logout' }" -->
      <s-button
        label="Logout"
        icon="vmdi-login-variant"
        @click.native="logoutHandler"
        v-tooltip="tooltip('Logout')"
      />
      <s-button
        label="Collapse"
        :icon="collapseIcon"
        @click.native="collapseHandler"
      />
    </s-button-group>
    <project-modal />
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },
  computed: {
    collapseIcon() {
      if (this.collapsed) {
        return "IconMdiChevronRight";
      }
      return "IconMdiChevronLeftCircleOutline";
    },
  },
  methods: {
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
.web-nav {
  background-color: var(--color--primary);
  grid-column: 1 / 2;
  overflow: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
}
.web-nav--collapsed {
  .button__label {
    display: none;
  }
  .olvy-unread-indicator {
    position: absolute !important;
    bottom: 6px !important;
    right: 6px !important;
    top: auto !important;
  }
}
.web-nav__items {
  flex: 1 1 auto;
  .button {
    --button--color: rgba(255, 255, 255);
    --button--hover-color: rgba(255, 255, 255, 0.699);
    flex: 0 0 auto;
  }
  .button--active,
  .button--exact-active {
    position: relative;
    --button--bg: var(--color--primary--dark);
    --button--hover-bg: var(--color--primary--dark);
    color: #fff;
  }
  .button--highlight {
    --button--color: #{--color("warning", "light")};
    --button--hover-color: #{--color("warning")};
  }
}
.web-nav__campaign {
  background-color: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.5) !important;
  text-decoration: none !important;
  &:hover {
    color: rgba(255, 255, 255, 1) !important;
  }
}
.web-nav__campaign__label {
  font-size: 12px;
  margin-bottom: --space(1);
}
.nav-user-profile {
  .button__label {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .user-image {
    margin-right: 10px;
    .media__wrap {
      img {
        border-radius: 50%;
      }
    }
  }
}
</style>
