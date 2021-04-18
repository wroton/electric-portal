  
<template>
  <div>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-left">Title</th>
          <th class="has-text-left">Client</th>
          <th class="has-text-left">Technician</th>
          <th class="has-text-centered">Arrival Time</th>
          <th class="has-text-right">Estimate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in this.jobs" v-bind:key="job.id">
          <td class="has-text-left">{{ job.title }}</td>
          <td class="has-text-left">{{ job.clientName }}</td>
          <td class="has-text-left">{{ job.technicianName }}</td>
          <td class="has-text-centered">{{ job.startTime }}</td>
          <td class="has-text-right">{{ job.estimate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import http from "../services/http";

export default {
  data() {
    return {
      jobs: [],
    };
  },
  async mounted() {
    try {
      // Get all accessible jobs. Reset jobs if none were given.
      let response = await http.get("jobs");
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