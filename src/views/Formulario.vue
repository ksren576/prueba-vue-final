<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="pizza.id"
          placeholder="ID"
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="pizza.name"
          placeholder="Nombre"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="pizza.price"
          placeholder="Precio"
        />
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="pizza.stock"
          placeholder="Stock"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="pizza.img"
          placeholder="Imagen (URL)"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <textarea
          class="form-control"
          v-model="pizza.desc"
          rows="3"
          placeholder="Descripción"
        ></textarea>
      </div>
    </div>
    <h3 class="mt-3">Ingredientes</h3>
    <div class="row mt-3">
      <div class="col">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="queso"
            value="queso"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="queso">Queso</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="jamon"
            value="jamon"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="jamon">Jamon</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="salame"
            value="salame"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="salame">Salame</label>
        </div>
      </div>
      <div class="col">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="tomate"
            value="tomate"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="tomate">Tomate</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="aceitunas"
            value="aceitunas"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="aceitunas">Aceitunas</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="pimenton"
            value="pimenton"
            v-model="pizza.ing"
          />
          <label class="custom-control-label" for="pimenton">Pimenton</label>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <router-link
          class="btn btn-outline-secondary"
          to="/inventario"
          tag="button"
          >Volver</router-link
        >
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button @click="guardar" class="btn btn-success" :disabled="loading">
          Guardar datos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Formulario",
  data() {
    return {
      loading: false,
      pizza: {
        name: "",
        price: "",
        stock: "",
        img: "",
        id: "",
        desc: "",
        ing: [],
      },
    };
  },
  methods: {
    ...mapActions(["agregarPizza"]),
    async guardar() {
      this.loading = true;
      await this.agregarPizza(this.pizza);
      this.loading = false;
    },
  },
};
</script>