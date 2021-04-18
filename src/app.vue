<template>
  <div>
    <nav
      class="navbar is-fixed"
      role="navigation"
      aria-label="main navigation"
      v-if="showMenu($router)"
    >
      <div class="container" style="padding-bottom: 10px;">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <router-link class="navbar-item" to="/jobs">Jobs</router-link>
            <router-link class="navbar-item" to="/technicians">Technicians</router-link>
            <router-link class="navbar-item" to="/administrators">Administrators</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link class="button is-primary" to="/login"
                  >Login</router-link
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
export default {
  methods: {
    showMenu(e) {
      return e?.currentRoute?._value?.meta?.hideMenu !== true;
    },
  },
};
</script>

<style>
</style>