<template>
  <auth-layout>
    <template #default>
      <!-- Username -->
      <item-form title="Login to Admin panel" :fields="fields" :gap="2">
        <template #default="{ form }">
          <!-- Username  -->
          <s-field-validate rules="required" name="Username" label="Username">
            <s-textbox
              v-model="form.username"
              type="text"
              placeholder="Enter User Name"
            />
          </s-field-validate>

          <!-- Password -->
          <s-field-validate
            rules="required"
            name="Password"
            :password-toggle="true"
            label="Password"
          >
            <s-textbox
              v-model="form.password"
              type="password"
              placeholder="Enter Password"
            />
          </s-field-validate>
        </template>

        <template #footer="{ saving }">
          <div class="footer-actions">
            <s-button
              class="flex-none text-center"
              align="center"
              icon="IconMdiLogin"
              fluid
              color="primary"
              label="Login"
              :loader="saving"
              @click.native="goToDashboard"
            />
          </div>
        </template>
      </item-form>
    </template>
  </auth-layout>
</template>

<script>
export default {
  components: {
    AuthLayout: require("@/layout/Auth.vue").default,
  },
  data() {
    return {
      fields: ["username", "password"],
    };
  },
  methods: {
    goToDashboard() {
      localStorage.setItem("admin-token", "tokenvalue");
      this.$router.push({ name: "hydrate" });
      // Axios post request comes here
    },
  },
};
</script>

<style></style>
