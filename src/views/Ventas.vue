<template>
  <div class="container mt-5">
    <h2>Ventas</h2>
    <table v-if="ventas.length > 0" class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Fecha de compra</th>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio Total</th>
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, indice) in ventas" :key="'ventas' + indice">
          <th scope="row">{{ indice + 1 }}</th>
          <td>{{ item.fechaCompra.toLocaleString() }}</td>
          <td>{{ item.id }}</td>
          <td class="text-capitalize">{{ item.name }}</td>
          <td>{{ item.subtotal | toCurrency }}</td>
          <td>{{ item.cantidad }}</td>
        </tr>
      </tbody>
    </table>
    <h3 v-else class="text-center mt-5">No hay ventas registradas</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Ventas",
  computed: mapState({
    ventas(state) {
      return state.ventas;
    },
  }),
};
</script>