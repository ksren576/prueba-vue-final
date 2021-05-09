import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import Carrito from "./views/Carrito.vue";
import Inventario from './views/Inventario.vue';
import Ventas from './views/Ventas.vue';
import Error404 from './views/Error404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/carrito",
    component: Carrito,
  },
  {
    path: "/inventario",
    component: Inventario,
  },
  {
    path: "/ventas",
    component: Ventas,
  },
  {
    path: "*",
    component: Error404,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
