<template>
  <div class="w-screen h-screen">
    <div
      v-if="loading"
      class="flex flex--column h-100 flex--center flex--fit flex--middle"
    >
      <img src="@/assets/logo.svg" alt="" width="200" height="200" />
      <Loader />
    </div>

    <s-layout
      v-else
      push-top
      full-height
      class="wh-layout"
      top-size="50px"
      ref="mainContainer"
      :left-classlist="['br-lightest']"
      :top-classlist="['bb-lightest']"
      :right-classlist="['bl-lightest', 'p-0']"
    >
      <template #top>
        <div class="page-header h-full flex flex--middle flex--fit">
          <div class="page-header__content">
            <s-breadcrumbs class="flex__fluid" />
          </div>
          <div class="page-header__action">
            <div class="flex__fit pr-3">
              <div class="flex flex--fit flex--middle">
                <portal-target name="header" slim />
                <div class="notification-container"></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #left>
        <sidebar />
      </template>

      <template #default>
        <router-view />
      </template>
    </s-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// Replace your Api call for fetching User profile
// import { me } from "@/api/me";
export default {
  components: {
    Loader: require("@/components/Loader").default,
    Sidebar: require("@/components/Sidebar").default,
  },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    /**
     * Check for token
     * Set Axios token in header before sending the hydration call
     */
    this.startHydration();

    const token = localStorage.getItem("admin-token");
    if (!token) {
      this.$router.push({ name: "login" });
      return;
    }
  },

  computed: {
    ...mapGetters(["hydrated"]),
  },
  methods: {
    ...mapActions(["hydrate"]),
    async startHydration() {
      // Api call will come here which will get loggen in admin data
      try {
        // const profile = await me();
        // this.hydrate(profile);
        this.loading = false;
      } catch {
        this.$shilp.notify({
          title: "Failed to Login. Try again in some time.",
          type: "danger",
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
