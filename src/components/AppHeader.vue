<script>
import { store, api } from "../store/index";
export default {
  data() {
    return {
      store,
      searchedTerm: "",
    };
  },

  emits: ["updateSearch"],

  methods: {
    submitSearch() {
      // Emetti un evento per notificare il componente padre dell'aggiornamento della ricerca
      this.$emit("updateSearch", this.searchedTerm);
    },
  },
};
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container">
      <router-link :to="{ name: 'recipes.index' }" class="h2"
        >RecipeBook</router-link
      >
      <form class="d-flex" role="search" @submit.prevent="submitSearch()">
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
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  height: 80px;
}
</style>
