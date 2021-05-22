import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import db from "./firebase";

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
    },
    agregarPizza(state, pizza) {
      state.productos = [
        ...state.productos,
        pizza,
      ]
    },
    eliminarProducto(state, docId) {
      state.productos = state.productos.filter((el) => el.docId !== docId);
    }
  },
  actions: {
    async cargarProductos(context) {
      if (context.state.productos.length === 0) {
        // Primero debemos evaluar si existen datos en la coleccion
        const query = await db.collection('productos').get();

        if (query.size === 0) {
          // Este if nos sirve para realizar la carga en la base de datos
          const result = await axios.get(
            "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria"
          );

          const productos = result.data.map((item) => ({ ...item, stock: 10 }));

          const promises = productos.map((item) => db.collection('productos').add(item)); // crea una promesa de guardado en la base de datos por cada producto
          await Promise.all(promises); // esto espera que se resuelvan todas las promesas del arreglo
        }

        const datos = await db.collection('productos').get();
        const productosDb = [];

        datos.forEach((doc) => {
          productosDb.push({
            docId: doc.id,
            ...doc.data(),
          })
        })

        context.commit(
          "cargarProductos",
          productosDb,
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
    },
    async agregarPizza(context, pizza) {
      const pizzaFormateada = {
        ...pizza,
        stock: Number(pizza.stock),
        price: Number(pizza.price),
        ing: pizza.ing.map((el) => ({ name: el })),
      }
      await db.collection("productos").add(pizzaFormateada);
      context.commit("agregarPizza", pizzaFormateada);
    },
    async eliminarProducto(context, docId) {
      await db.collection("productos").doc(docId).delete();
      context.commit("eliminarProducto", docId);
    }
  },
});

export default store;
