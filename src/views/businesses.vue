<template>
  <div class="columns">
    <div class="column">
      <h1 class="title is-4">Businesses</h1>
    </div>
    <div class="column has-text-right">
      <div class="field">
        <div class="control">
          <button class="button primary" @click="this.create()">
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
        v-for="business in page"
        v-bind:key="business.id"
        @click="selectBusiness(business)"
      >
        <td class="has-text-left">{{ business.name }}</td>
        <td class="has-text-left">{{ business.city }}</td>
        <td class="has-text-left">{{ business.state }}</td>
      </tr>
    </tbody>
  </table>
  <div class="is-flex is-flex-direction-row is-justify-content-flex-end">
    <a class="button" title="Previous Page" @click="previous()">Previous</a>
    <input class="input page-index" type="text" :value="pageSelection" />
    <a class="button" title="Next Page" @click="next()">Next</a>
  </div>
  <setup
    :business="selectedBusiness"
    :deleted="deleted"
    :hide="() => (setupActive = false)"
    :isActive="setupActive"
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
  computed: {
    nextDisabled() {
      return this.pageIndex >= this.pageCount;
    },
    page() {
      if (this.businesses.length < 1) {
        return [];
      }

      let startIndex = this.pageIndex * 10;
      return this.businesses.slice(startIndex, startIndex + 10);
    },
    pageCount() {
      return Math.ceil(this.businesses.length / 10);
    },
    previousDisabled() {
      return this.pageIndex == 0;
    },
  },
  data() {
    return {
      businesses: [],
      selectedBusiness: undefined,
      pageIndex: 0,
      pageSelection: "1",
      setupActive: false,
    };
  },
  methods: {
    create() {
      this.selectedBusiness = undefined;
      this.setupActive = true;
    },
    deleted() {
      // Remove the business.
      let businesses = this.businesses.filter(
        (x) => x.id !== this.selectedBusiness.id
      );

      // Set the new business array and hide the modal.
      this.businesses = businesses;
      this.selectedBusiness = undefined;
      this.setupActive = false;
    },
    next() {
      if (this.nextDisabled) {
        return;
      }

      // Resolve.
      let start = (this.pageIndex + 1) * 10;
      console.log(this.businesses.slice(start, start + 10));
      businesses.resolve(this.businesses, start, 10);

      this.pageIndex += 1;
      this.pageSelection = String(this.pageIndex);
    },
    previous() {
      if (this.previousDisabled) {
        return;
      }

      this.pageIndex -= 1;
      this.pageSelection = String(this.pageIndex);
    },
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
      this.selectedBusiness = undefined;
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
      if (!response) {
        this.businesses = [];
        return;
      }

      this.businesses = response;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
<style scoped>
.page-index {
  max-width: 50px;
  margin: 0 10px;
  text-align: center;
}
</style>