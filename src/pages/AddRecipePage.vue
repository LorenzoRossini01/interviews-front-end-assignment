<script>
// Importa i componenti necessari
import AppHeader from "../components/AppHeader.vue";
import AppMainAddRecipe from "../components/AppMainAddRecipe.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {};
  },

  components: {
    AppHeader, // Componente per l'header dell'applicazione
    AppMainAddRecipe, // Componente per aggiungere una nuova ricetta
    AppFooter, // Componente per il footer dell'applicazione
  },
};
</script>

<template>
  <AppHeader />
  <AppMainAddRecipe />
  <AppFooter />
</template>

<style scoped lang="scss"></style>
