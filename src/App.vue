<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./layout/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  },
  mounted() {
    this.$store.dispatch("cargarProductos");
  },
};
</script>


<style>
</style>
