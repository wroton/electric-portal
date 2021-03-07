<template>
  <div>
    <nav class="navbar is-fixed" role="navigation" aria-label="main navigation">
      <div class="container is-fluid">
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
          <div class="navbar-start">
            <router-link class="navbar-item" to="jobs">Jobs</router-link>
            <router-link class="navbar-item" to="about">About</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link class="button is-primary" to="login"
                  >Login</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">
      <router-view />
    </div>
  </div>
</template>

<style>
</style>