<template>
  <div class="sign">
    <div class="sign__left">
      <h2>You're a step away from</h2>
      <h2>taking your business</h2>
      <h1>Online.</h1>
      <ul>
        <li>— Create business page</li>
        <li>— Create a store & sell on WhatsApp</li>
        <li>— Collect payments with popular payment gateways</li>
        <li>— CRM & Customer support tools</li>
        <li>— Create polls on WhatsApp</li>
      </ul>
    </div>

    <div class="sign__right">
      <div class="sign__box">
        <a href="/">
          <img src="/img/logo-dark.png" width="260px" alt />
        </a>

        <slot />

        <div class="py-4 bt-lightest field-group g-3">
          <s-field
            v-if="['signup', 'forgot-password', 'help'].includes(action)"
            inline
            label="Have an account?"
          >
            <s-button
              icon="vmdi-login-variant"
              align="right"
              color="warning"
              theme="link"
              :to="{ name: 'login' }"
              label="Login"
            />
          </s-field>

          <s-field
            v-if="['login', 'help'].includes(action)"
            inline
            label="Don't have an account?"
          >
            <s-button
              icon="AccountCircle"
              align="right"
              color="warning"
              theme="link"
              :to="{ name: 'signup' }"
              label="Create Account"
            />
          </s-field>

          <s-field
            inline
            v-if="['login', 'help'].includes(action)"
            label="Forgot Password?"
          >
            <s-button
              icon="vmdi-lock-reset"
              label="Reset"
              color="primary"
              align="right"
              theme="link"
              :to="{ name: 'forgot-password' }"
            />
          </s-field>

          <s-field inline v-if="action != 'help'" label="Having issues?">
            <s-button
              align="right"
              icon="HelpCircle"
              color="primary"
              theme="link"
              :to="{ name: 'help' }"
              label="Get Help"
            />
          </s-field>

          <s-field label="Version" inline>
            <p class="text-bold">{{ version }}</p>
          </s-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { version } from "../../package.json";

export default {
  props: {
    action: String,
  },

  data() {
    return {
      version,
    };
  },
};
</script>

<style lang="scss">
.sign {
  height: 100vh;
  width: 100vw;
}
.sign__left {
  //background-color: --color("primary");
  background: rgb(48, 79, 254);
  background: linear-gradient(
    180deg,
    rgba(48, 79, 254, 1) 0%,
    rgba(98, 0, 234, 1) 33%,
    rgba(144, 8, 171, 1) 66%,
    rgba(197, 17, 98, 1) 100%
  );

  color: #fff;
  padding: 10px;
  overflow: auto;
  h2 {
    font-size: 16px;
    color: #fff;
  }
  h1 {
    font-size: 24px;
  }
  ul {
    list-style: none;
    font-size: 16px;
    padding: 0;
    li {
      padding: 5px 0;
    }
  }
}
.sign__right {
  overflow: auto;
}

.sign__right {
  padding: 20px;
}
@media screen and (min-width: 768px) {
  .sign {
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;
    overflow: hidden;
  }
  .sign__left {
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    padding: 20px;
    h2 {
      font-size: 24px;
    }
    h1 {
      font-size: 64px;
    }
    ul {
      list-style: none;
      font-size: 16px;
    }
  }
  .sign__right {
    display: flex;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;
  }
  .sign__box {
    width: 320px;
    margin: auto;
  }
}
</style>
