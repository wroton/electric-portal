<template>
  <div
    v-bind:class="{
      modal: true,
      'is-clipped': true,
      'is-active': isActive,
    }"
  >
    <div class="modal-background" @mouseup="tryHide()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ selectedId ? "Edit" : "Create" }} Administrator
        </p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input type="text" class="input" maxlength="200" v-model="name" />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="has-text-left" style="color: red">
          {{ error }}
        </div>
        <div class="has-text-right" style="display: block; flex-grow: 1">
          <button class="button" @click="tryHide()" :disabled="saving">
            Cancel
          </button>
          <button
            v-bind:class="{
              button: true,
              'is-success': true,
              'is-loading': saving,
            }"
            @click="save()"
            :disabled="!canSave"
          >
            Save
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import http from "../services/http";

export default {
  computed: {
    canSave() {
      return this.name && this.name.replace(/\s/g, "").length > 0;
    },
  },
  data() {
    return {
      error: "",
      name: "",
      saving: false,
    };
  },
  methods: {
    save() {
      // Double check can save just in case this gets executed some other way.
      if (!this.canSave) {
        return;
      }

      // Now saving.
      this.error = "";
      this.saving = true;

      // Create the request.
      const request = {
        id: this.selectedId ? this.selectedId : undefined,
        name: this.name,
      };

      // Determine the correct method.
      const method = this.selectedId ? http.put : http.post;

      // Create or edit the admin.
      method("administrators", request)
        .then((res) => {
          this.saving = false;
          this.saved(res.data);
        })
        .catch((err) => {
          this.saving = false;
          this.error = err?.response?.data ? err.response.data : err;
        });
    },
    tryHide() {
      // Don't hide if saving.
      if (this.saving) {
        return;
      }

      this.hide();
    },
  },
  props: ["isActive", "hide", "selectedId", "saved"],
};
</script>