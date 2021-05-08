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
          {{ business ? "Edit" : "Create" }} Business
        </p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input type="text" class="input" maxlength="200" v-model="name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Address Line 1</label>
          <div class="control">
            <input
              type="text"
              class="input"
              maxlength="200"
              v-model="addressLine1"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Address Line 2</label>
          <div class="control">
            <input
              type="text"
              class="input"
              maxlength="200"
              v-model="addressLine2"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input type="text" class="input" maxlength="200" v-model="city" />
          </div>
        </div>
        <div class="field">
          <label class="label">State</label>
          <div class="control">
            <input type="text" class="input" maxlength="200" v-model="state" />
          </div>
        </div>
        <div class="field">
          <label class="label">Zip Code</label>
          <div class="control">
            <input
              type="text"
              class="input"
              maxlength="200"
              v-model="zipCode"
            />
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
              'is-danger': true,
              'is-loading': saving,
            }"
            @click="del()"
            v-if="this.business?.id !== undefined"
          >
            Delete
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

function goodString(x) {
  return x && x.replace(/\s/g, "").length > 0;
}

export default {
  computed: {
    b: () => this.business,
    canSave() {
      return (
        goodString(this.name) &&
        goodString(this.addressLine1) &&
        goodString(this.city) &&
        goodString(this.state) &&
        goodString(this.zipCode)
      );
    },
  },
  data() {
    return {
      error: "",
      addressLine1: undefined,
      addressLine2: undefined,
      city: undefined,
      name: undefined,
      state: undefined,
      zipCode: undefined,
      saving: false,
      deleting: false,
    };
  },
  methods: {
    del() {
      if (this.deleting || this.saving) {
        return;
      }

      this.deleting = true;
      http
        .delete(`businesses/${this.business.id}`)
        .then(() => {
          this.deleting = false;
          this.error = "";
          this.deleted();
        })
        .catch(() => {
          this.deleting = false;
          this.deleted();
        });
    },
    save() {
      if (this.deleting || this.saving) {
        return;
      }

      this.error = "";
      this.saving = true;

      const request = {
        id: this.business?.id ? this.business.id : undefined,
        addressLine1: this.addressLine1,
        addressLine2: goodString(this.addressLine2) ? this.addressLine2 : null,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        name: this.name,
      };

      const method = this.business?.id ? http.put : http.post;

      this.saving = true;

      method("businesses", request)
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
      if (this.saving) {
        return;
      }

      this.hide();
    },
  },
  props: {
    business: Object,
    deleted: Function,
    hide: Function,
    isActive: Boolean,
    saved: Function,
  },
  watch: {
    business() {
      this.id = this.business?.id;
      this.name = this.business?.name;
      this.addressLine1 = this.business?.addressLine1;
      this.addressLine2 = this.business?.addressLine2;
      this.city = this.business?.city;
      this.state = this.business?.state;
      this.zipCode = this.business?.zipCode;
    },
  },
};
</script>