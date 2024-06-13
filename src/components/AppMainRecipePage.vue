<script>
// Importa axios e altre risorse necessarie
import axios from "axios";
import { store, api } from "../store/index";

// Importa i componenti necessari
import RecipeList from "./RecipeList.vue";
import RecipeFilter from "./RecipeFilter.vue";

export default {
  data() {
    return {
      store, // Stato globale dell'applicazione
      recipes: [], // Lista delle ricette
      comments: [], // Lista dei commenti
      cuisines: [], // Lista delle cucine
      difficulties: [], // Lista delle difficoltà
      diets: [], // Lista delle diete
      filtersActive: false, // Stato dei filtri (attivi o no)

      // Pagina corrente, impostata inizialmente dai parametri della route
      currentPage: this.$route.params.page
        ? parseInt(this.$route.params.page)
        : 1, // Pagina corrente

      recipesPerPage: 4, // Numero di ricette per pagina
      totalPages: 0, // Numero totale di pagine

      selectedOrder: 0, // Ordine selezionato
      searchedTerm: this.$route.query.q ? this.$route.query.q : "", // Termini di ricerca
      selectedCuisine: "", // Cucina selezionata
      selectedDifficulty: "", // Difficoltà selezionata
      selectedDiet: "", // Dieta selezionata
    };
  },

  // Props passate al componente
  props: {
    HeadersearchedTerm: {
      type: String,
      required: true,
    },
  },

  components: {
    RecipeList,
    RecipeFilter,
  },

  computed: {},

  methods: {
    // Metodo per recuperare le ricette dall'API
    fetchRecipes() {
      const url = api.recipes;
      let params = {
        q: this.searchedTerm ?? `${this.searchedTerm}`,
        cuisineId: this.selectedCuisine ?? this.selectedCuisine,
        dietId: this.selectedDiet ?? this.selectedDiet,
        difficultyId: this.selectedDifficulty ?? this.selectedDifficulty,
      };
      // console.log(params);

      // Rimuove i parametri nulli o vuoti
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === "") {
          delete params[key];
        }
      });

      axios.get(url, { params }).then((response) => {
        // console.log(response);
        let allRecipes = response.data;

        // Ordina le ricette in base all'ordine selezionato
        if (this.selectedOrder === 1) {
          allRecipes.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (this.selectedOrder === 2)
          allRecipes.sort((a, b) => b.name.localeCompare(a.name));

        if (this.selectedOrder === 3)
          allRecipes.sort((a, b) => a.difficultyId - b.difficultyId);

        if (this.selectedOrder === 4)
          allRecipes.sort((a, b) => b.difficultyId - a.difficultyId);

        if (this.selectedOrder === 5) allRecipes.sort((a, b) => a.id - b.id);

        if (this.selectedOrder === 6) allRecipes.sort((a, b) => b.id - a.id);

        // Calcola il numero totale di pagine
        const totalRecipes = allRecipes.length;
        this.totalPages = Math.ceil(totalRecipes / this.recipesPerPage);

        // Applica la paginazione ai risultati ordinati
        const start = (this.currentPage - 1) * this.recipesPerPage;
        const end = start + this.recipesPerPage;
        this.recipes = allRecipes.slice(start, end);

        // Aggiorna l'URL con il numero di pagina corrente
        this.updateRoute();
      });
    },

    // Metodo per andare alla pagina successiva
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchRecipes();
      }
    },

    // Metodo per andare alla pagina precedente
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchRecipes();
      }
    },

    // Metodo per andare a una pagina specifica
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchRecipes();
      }
    },

    // Metodo per recuperare i commenti dall'API
    fetchComments() {
      axios.get(api.comments).then((response) => {
        // console.log(response);
        this.comments = response.data;
      });
    },

    // Metodo per recuperare le cucine dall'API
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        // console.log(response);
        this.cuisines = response.data;
      });
    },

    // Metodo per recuperare le difficoltà dall'API
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        // console.log(response);
        this.difficulties = response.data;
      });
    },

    // Metodo per recuperare le diete dall'API
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        // console.log(response);
        this.diets = response.data;
      });
    },

    // Metodo per gestire l'apertura della card per i filtri
    handleFilterClick() {
      this.filtersActive = !this.filtersActive;
    },

    // Metodo per ottenere l'ordinamento selezionato
    getSelectedOrder(value) {
      this.selectedOrder = value;
    },

    // Metodo per ottenere i filtri selezionati
    getSelectedFilters(filters) {
      // console.log(filters);
      this.searchedTerm = filters[0];
      this.selectedCuisine = filters[1];
      this.selectedDifficulty = filters[2];
      this.selectedDiet = filters[3];
      if (
        this.searchedTerm == null ||
        this.selectedCuisine == null ||
        this.selectedDifficulty == null ||
        this.selectedDiet == null
      ) {
        store.hasBeenFiltered = false;
      } else {
        store.hasBeenFiltered = true;
      }
      this.fetchRecipes();
    },

    // Metodo per aggiornare l'URL con il numero di pagina corrente
    updateRoute() {
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.params, page: this.currentPage },
      });
    },
  },

  watch: {
    // Watcher per rimettere alla prima pagina se l'ordine o i filtri cambiano
    selectedOrder() {
      this.currentPage = 1;
      this.fetchRecipes();
    },
    selectedCuisine() {
      this.currentPage = 1;
      this.fetchRecipes();
    },
    selectedDiet() {
      this.currentPage = 1;
      this.fetchRecipes();
    },
    selectedDifficulty() {
      this.currentPage = 1;
      this.fetchRecipes();
    },

    // Watcher per il termine di ricerca nella header
    HeadersearchedTerm(newTerm) {
      this.searchedTerm = newTerm;
      this.fetchRecipes();
    },
  },

  created() {
    this.fetchRecipes();
    this.fetchComments();
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
    store.hasBeenFiltered = false;
    this.updateRoute();
  },
};
</script>

<template>
  <main>
    <div class="container py-3">
      <div class="row justify-content-center g-3">
        <div :class="filtersActive ? 'col-8' : 'col-12'">
          <RecipeList
            :recipes="recipes"
            :comments="comments"
            :cuisines="cuisines"
            :diets="diets"
            :difficulties="difficulties"
            :filtersActive="filtersActive"
            :currentPage="currentPage"
            @openFilterCard="handleFilterClick()"
            @sendSelectedOrder="getSelectedOrder"
          />
          <div
            class="pagination-container d-flex justify-content-between align-items-center"
          >
            <router-link
              :to="{
                name: 'recipes.create',
                params: {
                  page: currentPage,
                },
              }"
              class="btn btn-orange rounded-pill d-flex justify-content-center align-items-center"
            >
              <i class="fa-solid fa-plus me-3"></i>
              Add Recipe
            </router-link>
            <div class="pagination" v-if="totalPages > 1">
              <button @click="previousPage" :disabled="currentPage === 1">
                Previous
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="{ active: page === currentPage }"
              >
                {{ page }}
              </button>

              <button @click="nextPage" :disabled="currentPage === totalPages">
                Next
              </button>
            </div>
          </div>
        </div>
        <div :class="filtersActive ? 'col-4' : ''">
          <RecipeFilter
            :recipes="recipes"
            :comments="comments"
            :cuisines="cuisines"
            :diets="diets"
            :difficulties="difficulties"
            v-if="filtersActive"
            @closeFilterCard="handleFilterClick()"
            @selectFilters="getSelectedFilters"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #ddd;
    cursor: pointer;

    &.active {
      background-color: orangered;
      color: #fff;
    }

    &:disabled {
      background-color: #bbb;
      cursor: not-allowed;
    }
  }
}
</style>
