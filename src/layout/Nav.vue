<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <!--a class="navbar-brand" href="#">Navbar</a>-->
      <router-link class="navbar-brand" to="/"
        >Pizzería La Bella Mía</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav mr-auto">
          <router-link class="nav-link" exact-active-class="active" to="/"
            >Inicio</router-link
          >
          <router-link
            class="nav-link"
            exact-active-class="active"
            to="/inventario"
            >Inventario</router-link
          >
          <router-link class="nav-link" exact-active-class="active" to="/ventas"
            >Ventas</router-link
          >
        </div>
        <div class="text-white">
          <router-link class="btn btn-light" to="/carrito"
            >{{ tamanoCarrito + " " }}<i class="fas fa-shopping-cart"></i
          ></router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",
  computed: {
    ...mapState({
      tamanoCarrito(state) {
        return state.carrito.reduce((acc, el) => acc + el.cantidad, 0);
      },
    }),
  },
};
</script>
