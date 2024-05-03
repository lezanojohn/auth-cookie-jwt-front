<template>
  <v-overlay :value="true" absolute>
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "FullScreenLoading",
};
</script>

<style>
/* Puedes agregar estilos adicionales si necesitas */
</style>
