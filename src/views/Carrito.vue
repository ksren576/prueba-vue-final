<template>
  <div class="container mt-5">
    <h2>Carrito de compras</h2>
    <table v-if="carrito.length > 0" class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Sub total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, indice) in carrito" :key="'carrito' + indice">
          <th scope="row">{{ indice + 1 }}</th>
          <td class="text-capitalize">{{ item.name }}</td>
          <td>{{ item.price | toCurrency }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ (item.cantidad * item.price) | toCurrency }}</td>
        </tr>
        <tr>
          <td class="text-right" colspan="4"><b>Total</b></td>
          <td>
            <b>{{ totalCarrito | toCurrency }}</b>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-else class="text-center mt-5">
      No hay productos en el carrito de compras
    </h3>
    <div class="row mt-5">
      <div class="col-6 d-flex justify-content-start">
        <button
          v-if="carrito.length > 0"
          @click="vaciarCarrito"
          class="btn btn-outline-danger"
        >
          Vaciar carrito
        </button>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button
          @click="realizarVenta"
          v-if="carrito.length > 0"
          class="btn btn-success"
        >
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Carrito",
  methods: {
    vaciarCarrito() {
      this.$store.dispatch("vaciarCarrito");
    },
    realizarVenta() {
      if (this.esCarritoValido) {
        const res = confirm("¿Desea realizar la compra?");
        if (res) {
          this.$store.dispatch("ejecutarVenta");
        }
      } else {
        alert("No hay stock suficiente para procesar el carrito");
      }
    },
  },
  computed: mapState({
    esCarritoValido(state) {
      return state.carrito.every((item) => {
        const producto = state.productos.find(
          (producto) => item.id === producto.id
        );
        return item.cantidad <= producto.stock;
      });
    },
    carrito(state) {
      return state.carrito;
    },
    totalCarrito(state) {
      return state.carrito.reduce(
        (acc, el) => (acc += el.price * el.cantidad),
        0
      );
    },
  }),
};
</script>