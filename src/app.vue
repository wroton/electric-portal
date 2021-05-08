<template>
  <div>
    <nav
      class="navbar is-fixed"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container" style="padding-bottom: 10px">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>
        </div>
        <div class="navbar-menu" v-if="this.showMenu()">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <router-link class="navbar-item" to="/jobs" v-if="this.hasUser"
              >Jobs</router-link
            >
            <router-link class="navbar-item" to="/clients" v-if="this.hasUser"
              >Clients</router-link
            >
            <router-link
              class="navbar-item"
              to="/technicians"
              v-if="this.hasUser"
              >Technicians</router-link
            >
            <router-link
              class="navbar-item"
              to="/administrators"
              v-if="this.hasUser"
              >Administrators</router-link
            >
            <router-link class="navbar-item" to="/schedule" v-if="this.hasUser"
              >Schedule</router-link
            >
            <router-link
              class="navbar-item"
              to="/businesses"
              v-if="this.hasUser"
              >Businesses</router-link
            >
            <router-link class="navbar-item" to="/settings" v-if="this.hasUser"
              >Settings</router-link
            >
            <div class="navbar-item" v-if="!this.hasUser">
              <div class="buttons">
                <router-link class="button primary" to="/login"
                  >Login</router-link
                >
              </div>
            </div>
            <div class="navbar-item" v-if="this.hasUser">
              <div class="buttons">
                <router-link class="button primary" to="/profile"
                  >Profile</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import { getUser, hookUser } from "../src/services/authentication";

export default {
  data() {
    let user = getUser();
    return {
      hasUser: user !== undefined && user !== null,
    };
  },
  methods: {
    showMenu(e) {
      return e?.currentRoute?._value?.meta?.hideMenu !== true;
    },
  },
  mounted() {
    // Set the user existence state when the user object changes.
    hookUser((u) => (this.hasUser = u !== undefined && u !== null));
  },
};
</script>

<style>
.primary {
  background-color: #353535;
  color: white;
  border-color: transparent;
}

.primary:hover {
  background-color: #000000;
  color: white;
  border-color: transparent;
}
</style>