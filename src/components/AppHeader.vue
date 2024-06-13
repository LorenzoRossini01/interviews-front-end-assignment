<script>
// Importazione delle dipendenze e oggetti necessari
import { store, api } from "../store/index";

export default {
  data() {
    return {
      store, // Accesso allo store globale (presumibilmente Vuex)
      searchedTerm: "", // Termine di ricerca per le ricette in input dall'utente
    };
  },

  // Eventi emessi dal componente (per comunicare con il componente genitore)
  emits: ["updateSearch"],

  methods: {
    // Metodo chiamato quando l'utente invia il form di ricerca
    submitSearch() {
      // Emetti un evento per notificare il componente padre dell'aggiornamento della ricerca
      this.$emit("updateSearch", this.searchedTerm);

      // Aggiorna lo stato globale per indicare se è stata applicata una ricerca
      if (this.searchedTerm) {
        store.hasBeenFiltered = true;
      } else {
        store.hasBeenFiltered = false;
      }

      // Naviga alla pagina delle ricette con il parametro di query per il termine di ricerca
      this.$router.push({
        name: "recipes.index",
        query: { q: this.searchedTerm },
      });
    },
  },
};
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link
        :to="{ name: 'recipes.index', props: { page: 1 } }"
        class="h2"
        >RecipeBook</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <form
          class="d-flex mt-3 mt-lg-0"
          role="search"
          @submit.prevent="submitSearch()"
        >
          <input
            v-model="searchedTerm"
            class="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search for recipes"
            aria-label="Search"
            @keyup.enter="submitSearch()"
          />
          <button class="btn btn-orange rounded-pill" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  height: 80px;
}
</style>
