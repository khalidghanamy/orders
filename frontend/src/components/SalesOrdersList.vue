<template>
  <div class="container p-5 wrapper">
    <h3 class="mb-4 pb-2">Sales Orders</h3>
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
          <!-- <th scope="col">Owner</th> -->
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order._id">
          <td>{{ order.title }}</td>
          <td>{{ order.price }}</td>
          <td>{{ order.status }}</td>
          <!-- <td>{{ order.ownerId }}</td> -->
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Update Order
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn text-light btn-danger"
              data-bs-dismiss="modal"
              @click.prevent="updateOrder('rejected')"
            >
              Reject
            </button>
            <button
              type="button"
              class="btn text-light btn-primary"
              data-bs-dismiss="modal"
              @click.prevent="updateOrder('accepted')"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { instance } from "../axios/axios";
import { notify } from "@kyvg/vue3-notification";

export default {
  data() {
    return {
      orderIndex: null,
      orders: [
        {
          title: "",
          price: "",
          status: "",
          // ownerId: "",
        },
      ],
    };
  },
  methods: {
    async updateOrder(status) {
      try {
        const userId = "639b77d2461ee890ad2029c5";
        const orderId = "639b7877461ee890ad2029ca";
        await instance.put(`/orders/update-order-status/${userId}/${orderId}`, {
          status,
        });
        notify({
          title: "Done",
        });
        this.$router.go();
      } catch (err) {
        notify({
          title: err.response.data.message || "Internal Server Error",
        });
      }
    },
  },
  created: async function () {
    const result = await instance.post("/orders/get-orders-by-status", {
      status: 'reviewed'
    });
    this.orders = result.data.orders;
  },
};
</script>
<style></style>
