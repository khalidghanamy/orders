<template>
  <div class="container p-5 wrapper">
    <h3 class="mb-4 pb-2">Customer Orders</h3>
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
              v-if="order.status && order.status === 'accepted'"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click.prevent="myOrder = order"
            >
              View
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Order</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body mx-5 my-2">
            <div>
              <span class="title">Title</span>:&nbsp;<span class="data">{{
                myOrder.title
              }}</span>
            </div>
            <div>
              <span class="title">Price</span>:&nbsp;<span class="data">{{
                myOrder.price
              }}</span>
            </div>
            <div>
              <span class="title">Status</span>:&nbsp;<span class="data">{{
                myOrder.status
              }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn text-light btn-primary"
              data-bs-dismiss="modal"
              @click.prevent="print()"
            >
              Print
            </button>
            <button
              type="button"
              class="btn text-light btn-danger"
              data-bs-dismiss="modal"
            >
              Close
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
import { jsPDF } from "jspdf";

export default {
  data() {
    return {
      myOrder: {
        title: "",
        price: "",
        status: "",
      },
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
    print() {
      const doc = new jsPDF();

      doc.text("Customer Order:", 20, 20);
      doc.text(`Title: ${this.myOrder.title}`, 25, 35);
      doc.text(`Price: ${this.myOrder.price}`, 25, 45);
      doc.text(`Status: ${this.myOrder.status}`, 25, 55);
      doc.save("a4.pdf");
    },
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
    const customerId = "639b7783461ee890ad2029c1";
    const result = await instance.get(
      `/orders/get-customer-orders/${customerId}`
    );
    this.orders = result.data.orders;
  },
};
</script>
<style>
.title {
  font-size: 20px;
  font-weight: bold;
}
.data {
  font-size: 20px;
}
</style>
