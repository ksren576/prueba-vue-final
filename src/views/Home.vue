<template>
  <div class="container mt-5">
    <h1>Pizzas <em>La Bella Mía</em></h1>
    <div class="row mt-3">
      <div
        v-for="(item, indice) in productos"
        :key="indice + 'producto'"
        class="col-4 mt-5"
      >
        <Card
          :titulo="item.name"
          :texto="item.desc"
          :urlImagen="item.img"
          :id="item.id"
          :onClick="agregarAlCarrito"
          :stock="item.stock"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Card,
  },
  methods: {
    agregarAlCarrito(id) {
      this.$store.dispatch("agregarAlCarritoAction", id);
    },
  },
  computed: mapState({
    productos(state) {
      return state.productos.filter((item) => item.stock > 0);
    },
  }),
};
</script>
