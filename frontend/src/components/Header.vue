<template>
  <nav class="navbar border-shadow" style="background-color: darkslateblue;">
    <div class="container-fluid">
      <div class="d-flex align-items-baseline">
        <RouterLink to="/" class="navbar-brand text-light mx-5"
          >Home</RouterLink
        >
        <RouterLink
          to="/createOrder"
          class="text-light nav-link active mx-3"
          >Create Order</RouterLink
        >
        <RouterLink
          to="/createUser"
          class="text-light nav-link active mx-3"
          >Create User</RouterLink
        >
        <RouterLink
          to="/ordersList"
          class="text-light nav-link active mx-3"
          >Reviewer Orders List</RouterLink
        >
        <RouterLink
          to="/salesOrdersList"
          class="text-light nav-link active mx-3"
          >Sales Orders List</RouterLink
        >
        <RouterLink
          to="/customerOrdersList"
          class="text-light nav-link active mx-3"
          >Customer Orders List</RouterLink
        >
      </div>
      <div class="d-flex align-items-baseline">
      </div>
    </div>
  </nav>
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      username: "",
      isLoggedIn: false,
    };
  },
  methods: {
    async logout() {
      const username = localStorage.getItem("username");
      if (username) localStorage.removeItem("username");
      const bloodBankId = localStorage.getItem("bloodBankId");
      if (bloodBankId) localStorage.removeItem("bloodBankId");
      const hospitalId = localStorage.getItem("hospitalId");
      if (hospitalId) localStorage.removeItem("hospitalId");
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        notify({
          title: "You are logged out successfully",
        });
      }

      this.$router.push("/login");
      this.isLoggedIn = false;
    },
    isBloodBankUser() {
      return (
        !!localStorage.getItem("bloodBankId") &&
        localStorage.getItem("bloodBankId") !== "null"
      );
    },
    isHospitalUser() {
      return (
        !!localStorage.getItem("hospitalId") &&
        localStorage.getItem("hospitalId") !== "null"
      );
    },
  },
  created() {
    this.emitter.on("user-is-logged-in", (e) => {
      this.username = e.username;
      this.isLoggedIn = true;
    });
    this.username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (token) this.isLoggedIn = true;
  },
};
</script>
<style>
</style>
