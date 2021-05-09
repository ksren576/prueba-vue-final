<template>
  <div class="card" style="width: 22rem">
    <img :src="urlImagen" class="card-img-top" alt="" />
    <div class="card-body">
      <h1 class="card-title text-capitalize">{{ titulo }}</h1>
      <p class="card-text">{{ texto }}</p>
      <button @click="onClick(id)" class="btn btn-success">
        Agregar a carrito
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    titulo: String,
    texto: String,
    urlImagen: String,
    onClick: Function,
    id: String,
  },
};
</script>
