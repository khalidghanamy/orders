import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";
import CreateOrderComponent from "../components/CreateOrder.vue";
import CreateUserComponent from "../components/CreateUser.vue";
import OrdersListComponent from "../components/OrdersList.vue";
import SalesOrdersListComponent from "../components/SalesOrdersList.vue";
import CustomerOrdersListComponent from "../components/CustomerOrdersList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
    },
    {
      path: "/createOrder",
      name: "createOrder",
      component: CreateOrderComponent,
    },
    {
      path: "/createUser",
      name: "createUser",
      component: CreateUserComponent,
    },
    {
      path: "/ordersList",
      name: "ordersList",
      component: OrdersListComponent,
    },
    {
      path: "/salesOrdersList",
      name: "salesOrdersList",
      component: SalesOrdersListComponent,
    },
    {
      path: "/customerOrdersList",
      name: "customerOrdersList",
      component: CustomerOrdersListComponent,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundComponent,
    },
  ],
});

router.beforeEach((to, from) => {
  //
});

export default router;
