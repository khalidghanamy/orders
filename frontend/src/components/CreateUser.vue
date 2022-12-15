<template>
  <div class="w-50 m-auto py-5">
    <h3 class="mb-3">Create User</h3>
    <form>
      <div class="row d-flex">
        <div class="mb-3 col-12 mx-auto">
          <label class="form-label my-form-label">Name</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.name"
            @change="validateName()"
            v-model="user.name"
          />
          <div class="invalid-feedback">Invalid Name</div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="mb-3 col-12 mx-auto">
          <label class="form-label my-form-label">Role</label>
          <!-- <input
            type="text"
            class="form-control"
            :class="this.errors.roles"
            @change="validateRole()"
            v-model="user.roles"
          /> -->
          <select
              class="form-select"
              @change="validateRole()"
              :class="this.errors.roles"
              v-model="user.roles"
            >
              <option v-for="role in roles" :value="role">{{role}}</option>
            </select>
          <div class="invalid-feedback">Invalid Role</div>
        </div>
      </div>

      <button
        type="submit"
        class="btn mt-3 w-100 text-light"
        style="background-color: darkslateblue"
        @click.prevent="submit()"
        :disabled="errors.name || errors.roles"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { instance } from "../axios/axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      // roles: { customer: "customer", reviewer: "reviewer", sales: "sales" },
      roles: ["customer","reviewer", "sales" ],
      user: {
        name: "",
        roles: "",
      },
      errors: {
        name: "required",
        roles: "required",
      },
    };
  },
  methods: {
    async submit() {
      try {
        const result = await instance.post("/users/createUser", this.user);
        if (result) {
          notify({
            title: result.data.message,
          });
          this.user.name = "";
          this.user.roles = "";
        }
      } catch (err) {
        notify({
          title: err.response.data.message || "Internal Server Error",
        });
      }
    },
    validateName() {
      if (!this.user.name) {
        this.errors.name = "is-invalid";
      } else {
        this.errors.name = null;
      }
    },
    validateRole() {
      if (!this.user.roles) {
        this.errors.roles = "is-invalid";
      } else {
        this.errors.roles = null;
      }
    },
  },
  created: async function () {
    //
  },
};
</script>
<style scoped></style>
