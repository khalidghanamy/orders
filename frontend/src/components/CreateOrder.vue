<template>
    <div class="w-50 m-auto py-5">
      <h3 class="mb-3">Create Order</h3>
      <form>
        <div class="row d-flex">
          <div class="mb-3 col-12 mx-auto">
            <label class="form-label my-form-label">Title</label>
            <input
              type="text"
              class="form-control"
              :class="this.errors.title"
              @change="validateTitle()"
              v-model="order.title"
            />
            <div class="invalid-feedback">Invalid Title</div>
          </div>
        </div>
  
        <div class="row d-flex">
          <div class="mb-3 col-12 mx-auto">
            <label class="form-label my-form-label">Price</label>
            <input
              type="number"
              class="form-control"
              :class="this.errors.price"
              @change="validatePrice()"
              v-model="order.price"
            />
            <div class="invalid-feedback">Invalid Price</div>
          </div>
        </div>
  
        <div class="row d-flex">
          <div class="mb-3 col-12 mx-auto">
            <label class="form-label my-form-label">Owner</label>
            <input
              type="text"
              class="form-control"
              :class="this.errors.ownerId"
              @change="validateOwner()"
              v-model="order.ownerId"
            />
            <!-- <select
              class="form-select"
              @change="validateOwner()"
              :class="this.errors.ownerId"
              v-model="order.ownerId"
            >
              <option value=""></option>
            </select> -->
            <div class="invalid-feedback">Invalid Owner</div>
          </div>
        </div>
  
        <button
          type="submit"
          class="btn mt-3 w-100 text-light"
          style="background-color: darkslateblue"
          @click.prevent="submit()"
          :disabled="
            errors.title ||
            errors.price ||
            errors.ownerId
          "
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
        order: {
          title: "",
          price: "",
          ownerId: "",
        },
        errors: {
          title: "required",
          price: "required",
          ownerId: "required",
        },
      };
    },
    methods: {
      async submit() {
        try {
          this.order.ownerId = '639b7783461ee890ad2029c1';  // xustomerId
          const result = await instance.post("/orders/createOrder", this.order);
          if (result) {
            notify({
              title: result.data.message,
            });
            this.order.title = '';
            this.order.price = '';
            this.order.ownerId = '';
          }
        } catch (err) {
          notify({
            title: err.response.data.message || "Internal Server Error",
          });
        }
      },
      validateTitle() {
        if (!this.order.title) {
          this.errors.title = "is-invalid";
        } else {
          this.errors.title = null;
        }
      },
      validatePrice() {
        if (!this.order.price) {
          this.errors.price = "is-invalid";
        } else {
          this.errors.price = null;
        }
      },
      validateOwner() {
        if (this.order.ownerId) {
          this.errors.ownerId = null;
        } else {
          this.errors.ownerId = "is-invalid";
        }
      },
    },
    created: async function () {
      //
    },
  };
  </script>
  <style scoped></style>
  