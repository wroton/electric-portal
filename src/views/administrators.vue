<template>
  <div class="columns">
    <div class="column">
      <h1 class="title is-4">Administrators</h1>
    </div>
    <div class="column has-text-right">
      <div class="field">
        <div class="control">
          <button class="button primary" @click="this.setupActive = true">
            Create Administrator
          </button>
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
  <setup
    :id="selectedId"
    :isActive="setupActive"
    :hide="() => (this.setupActive = false)"
    :saved="saved"
  />
</template>
<script>
import http from "../services/http";
import setup from "../components/administrator-setup";

export default {
  components: {
    setup,
  },
  data() {
    return {
      admins: [],
      selectedId: undefined,
      setupActive: false,
    };
  },
  methods: {
    saved(admin) {
      // If there is no admin, do nothing else.
      if (!admin) {
        return;
      }

      // If this is a new admin, add to the beginning of the list.
      if (!this.selectedId) {
        this.admins.unshift(admin);
        return;
      }

      // If this is an existing admin, replace the existing row's data.
      this.admins.map((a) => {
        if (a.id !== admin.id) {
          return a;
        }

        return {
          ...a,
          ...admin,
        };
      });

      // Hide the modal.
      this.selectedId = undefined;
      this.setupActive = false;
    },
    selectAdmin(id) {
      this.selectedId = id;
      this.setupActive = true;
    },
  },
  async mounted() {
    try {
      // Get all accessible admins. Reset admins if none were given.
      let response = await http.get("administrators");
      if (!response.data) {
        this.admins = [];
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>