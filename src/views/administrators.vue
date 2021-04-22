<template>
  <div class="columns">
    <div class="column">
      <h1 class="title is-4">Administrators</h1>
    </div>
    <div class="column has-text-right">
      <div class="field">
        <div class="control">
          <button class="button primary">Create Administrator</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th class="has-text-left">Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="admin in this.admins" v-bind:key="admin.id">
        <td class="has-text-left">{{ admin.name }}</td>
        <td class="has-text-right">Test</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import http from "../services/http";

export default {
  data() {
    return {
      admins: [],
    };
  },
  async mounted() {
    try {
      // Get all accessible admins. Reset admins if none were given.
      let response = await http.get("admins");
      if (!response.data) {
        this.jobs = [];
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>