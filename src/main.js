import Vue from "vue";
import db from "./firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./filters";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  db,
  render: (h) => h(App),
}).$mount("#app");
