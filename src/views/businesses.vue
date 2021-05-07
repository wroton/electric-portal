<template>
  <div class="columns">
    <div class="column">
      <h1 class="title is-4">Businesses</h1>
    </div>
    <div class="column has-text-right">
      <div class="field">
        <div class="control">
          <button class="button primary" @click="this.setupActive = true">
            Create Business
          </button>
        </div>
      </div>
    </div>
  </div>
  <table class="table is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th class="has-text-left">Name</th>
        <th class="hax-text-left">City</th>
        <th class="has-text-left">State</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="is-clickable"
        v-for="business in this.businesses"
        v-bind:key="business.id"
        @click="this.selectBusiness(business)"
      >
        <td class="has-text-left">{{ business.name }}</td>
        <td class="has-text-left">{{ business.city }}</td>
        <td class="has-text-left">{{ business.state }}</td>
      </tr>
    </tbody>
  </table>
  <setup
    :business="selectedBusiness"
    :isActive="setupActive"
    :hide="() => (this.setupActive = false)"
    :saved="saved"
  />
</template>
<script>
import businesses from "../services/businesses";
import setup from "../components/business-setup";

export default {
  components: {
    setup,
  },
  data() {
    return {
      businesses: [],
      selectedBusiness: undefined,
      setupActive: false,
    };
  },
  methods: {
    saved(business) {
      // If there is no business, do nothing else.
      if (!business) {
        return;
      }

      // If this is a new business, add to the beginning of the list.
      if (!this.selectedBusiness) {
        this.businesses.unshift(business);
        return;
      }

      // If this is an existing business, replace the existing row's data.
      this.businesses.map((b) => {
        if (b.id !== business.id) {
          return b;
        }

        return {
          ...b,
          ...business,
        };
      });

      // Hide the modal.
      this.selectBusiness = undefined;
      this.setupActive = false;
    },
    selectBusiness(business) {
      this.selectedBusiness = business;
      this.setupActive = true;
    },
  },
  async mounted() {
    try {
      // Get all accessible businesses. Reset businesses if none were given.
      let response = await businesses.list();
      if (!response?.data) {
        this.businesses = [];
        return;
      }

      this.businesses = response.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>