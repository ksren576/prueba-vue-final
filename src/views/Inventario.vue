<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6">
        <h2>Inventario</h2>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <router-link
          class="btn btn-outline-primary"
          to="/formulario"
          tag="button"
          >Crear nuevo producto</router-link
        >
      </div>
    </div>
    <table v-if="productos.length > 0" class="table mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="item.stock === 0 ? 'table-danger' : ''"
          v-for="(item, indice) in productos"
          :key="'inventario' + indice"
        >
          <th scope="row">{{ indice + 1 }}</th>
          <td>{{ item.id }}</td>
          <td class="text-capitalize">{{ item.name }}</td>
          <td>{{ item.price | toCurrency }}</td>
          <td>{{ item.stock }}</td>
          <td class="text-center">
            <button
              @click="eliminar(item.docId)"
              class="btn btn-danger btn-sm"
              title="Eliminar"
            >
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 v-else class="text-center mt-5">No hay productos en inventario</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Inventario",
  methods: {
    ...mapActions(["eliminarProducto"]),
    eliminar(docId) {
      this.eliminarProducto(docId);
    },
  },
  computed: mapState({
    productos(state) {
      return state.productos;
    },
  }),
};
</script>