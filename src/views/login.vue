  
<template>
  <div class="box" style="width: 33.3%; margin: auto">
    <div class="field">
      <label class="label">Email Address</label>
      <div class="control">
        <input type="text" class="input" v-model="emailAddress" />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input type="password" class="input" v-model="password" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          v-bind:class="{
            button: true,
            'is-primary': true,
            'is-fullwidth': true,
            'is-loading': loading,
          }"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-primary is-fullwidth">Sign Up</button>
      </div>
    </div>
  </div>
  <div
    v-bind:class="{
      notification: true,
      'is-danger': true,
      'is-hidden': error == '',
    }"
    style="width: 33.3%; margin: auto; margin-top: 10px"
  >
    <button class="delete" @click="clearError"></button>
    {{ this.error }}
  </div>
</template>
<script>
import { login } from "../services/authentication";

const loginSuccessful = (e) => () => {
  e.loading = false;
  e.$router.push({ name: "Dashboard" });
};

const loginFailed = (e) => (err) => {
  e.error = err?.message;
  e.loading = false;
  e.password = "";
  return;
};

export default {
  data() {
    return {
      emailAddress: "",
      error: "",
      loading: false,
      password: "",
    };
  },
  methods: {
    clearError() {
      this.error = "";
    },
    login() {
      this.loading = true;

      const data = {
        emailAddress: this.emailAddress,
        password: this.password,
      };

      const success = loginSuccessful(this);
      const error = loginFailed(this);
      login(data.emailAddress, data.password).then(success).catch(error);
    },
  },
};
</script>