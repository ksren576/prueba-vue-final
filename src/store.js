import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    productos: [],
    ventas: [],
    carrito: [],
  },
  getters: {},
  mutations: {
    cargarProductos(state, productos = []) {
      state.productos = [...productos];
    },
    sumarAlCarrito(state, id) {
      state.carrito = state.carrito.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }
        return item;
      });
    },
    agregarAlCarrito(state, producto) {
      state.carrito = [...state.carrito, producto];
    },
    vaciarCarrito(state) {
      state.carrito = [];
    },
    agregarVenta(state, carrito) {
      state.ventas = [
        ...state.ventas,
        ...carrito.map((el) => {
          const subtotal = el.cantidad * el.price;
          delete el.price;
          const fechaCompra = new Date()
          return {
            ...el,
            subtotal,
            fechaCompra,
          }
        })
      ]
    },
    descontarInventario(state, carrito) {
      state.productos = state.productos.map((el) => {
        carrito.forEach((itemCarrito) => {
          if (el.id === itemCarrito.id) {
            el.stock -= itemCarrito.cantidad;
          }
        })

        return el;
      });
    }
  },
  actions: {
    async cargarProductos(context) {
      if (context.state.productos.length === 0) {
        const result = await axios.get(
          "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria"
        );
        context.commit(
          "cargarProductos",
          result.data.map((item) => ({ ...item, stock: 10 }))
        );
      }
    },
    agregarAlCarritoAction(context, idProducto) {
      const { name, id, price } = context.state.productos.find(
        (item) => item.id === idProducto
      );
      const existeEnCarrito = context.state.carrito.some(
        (item) => item.id === id
      );

      if (existeEnCarrito) {
        context.commit("sumarAlCarrito", id);
      } else {
        context.commit("agregarAlCarrito", {
          name,
          id,
          price,
          cantidad: 1,
        });
      }
    },
    vaciarCarrito(context) {
      context.commit("vaciarCarrito");
    },
    ejecutarVenta(context) {
      const carrito = context.state.carrito;
      context.commit("agregarVenta", carrito);
      context.commit("descontarInventario", carrito);
      context.commit("vaciarCarrito");
    }
  },
});

export default store;
