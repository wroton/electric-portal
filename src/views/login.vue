  
<template>
  <div class="box" style="width: 33.3%; margin: auto">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input type="text" class="input" v-model="username" />
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
        <button class="button is-primary is-fullwidth" @click="login">
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
</template>
<script>
import http from "../services/http";

const loginSuccessful = (e) => (response) => {
  if (response.status != 200) {
    e.error = e;
    e.password = "";
    return;
  }

  
};

const loginFailed = (e) => (error) => {
  console.log(e);
  console.log(error);
};

export default {
  data() {
    return {
      error: "",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const data = {
        username: this.username,
        password: this.password,
      };

      const success = loginSuccessful(this);
      const error = loginFailed(this);
      http.post("api/1/token", data).then(success).catch(error);
    },
  },
};
</script>