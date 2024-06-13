<script>
import AppHeader from "../components/AppHeader.vue";
import AppMainRecipePage from "../components/AppMainRecipePage.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {
      searchedTerm: "", // Dato reattivo per il termine di ricerca
    };
  },

  components: {
    AppHeader, // Componente per l'header dell'applicazione
    AppMainRecipePage, // Componente per la pagina principale delle ricette
    AppFooter, // Componente per il footer dell'applicazione
  },

  methods: {
    updateSearchedTerm(searchedTerm) {
      this.searchedTerm = searchedTerm; // Aggiorna il termine di ricerca con quello ricevuto dall'evento
    },
  },
};
</script>

<template>
  <div class="wrapper d-flex flex-column">
    <!-- Componente per l'header con gestione dell'evento di ricerca -->
    <AppHeader @updateSearch="updateSearchedTerm" />

    <!-- Componente per la pagina principale delle ricette con il termine di ricerca passato come prop -->
    <AppMainRecipePage :HeadersearchedTerm="searchedTerm" />

    <!-- Componente per il footer dell'applicazione -->
    <AppFooter />
  </div>
</template>

<style lang="scss"></style>
