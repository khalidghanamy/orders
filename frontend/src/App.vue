<template>
  <div>
    <notifications position="bottom right"/>
    <HeaderComponent />
    <div class="components-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import NotFoundComponentVue from "./components/NotFoundComponent.vue";
import HomeComponent from "./components/Home.vue";
import HeaderComponent from "./components/Header.vue";

export default {
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  components: {
    HomeComponent,
    HeaderComponent,
    NotFoundComponentVue,
  },
};
</script>

<style>
body {
  background-color: lightgray;
}
.components-wrapper {
  background-color: white;
  margin: 13px auto;
  border-radius: 3px;
  box-shadow: 1px 1px 10px;
  width: 85%;
}
</style>
