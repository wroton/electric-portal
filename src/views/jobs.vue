  
<template>
  <div>
    <div v-for="job in jobs" :key="job.id">
      <div>
        {{ job.title }}
      </div>
    </div>
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
  mounted() {
    http
      .get("/jobs")
      .then((response) => (this.jobs = response.data))
      .catch((error) => console.log(error));
  },
};
</script>