<script>
import axios from "axios";
import { store, api } from "../store/index";
import RecipeList from "./RecipeList.vue";
import RecipeFilter from "./RecipeFilter.vue";

export default {
  data() {
    return {
      recipes: [],
      comments: [],
      cuisines: [],
      difficulties: [],
      diets: [],
      filtersActive: false,

      currentPage: 1, // Pagina corrente
      recipesPerPage: 4, // Numero di ricette per pagina

      selectedOrder: 0,
    };
  },

  components: {
    RecipeList,
    RecipeFilter,
  },

  computed: {
    //Ordina l'array delle ricette in base al valore di selectedOrder
    sortedRecipes() {
      let sorted = [...this.recipes];

      if (this.selectedOrder === 1) {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (this.selectedOrder === 2) {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (this.selectedOrder === 3) {
        sorted.sort((a, b) => a.difficultyId - b.difficultyId);
      }
      if (this.selectedOrder === 4) {
        sorted.sort((a, b) => b.difficultyId - a.difficultyId);
      }

      if (this.selectedOrder === 5) {
        sorted.sort((a, b) => a.id - b.id);
      }
      if (this.selectedOrder === 6) {
        sorted.sort((a, b) => b.id - a.id);
      }

      const start = (this.currentPage - 1) * this.recipesPerPage;
      const end = start + this.recipesPerPage;
      return sorted.slice(start, end);
    },
    // Calcola il numero totale di pagine
    totalPages() {
      return Math.ceil(this.recipes.length / this.recipesPerPage);
    },
  },

  methods: {
    fetchRecipes() {
      axios.get(api.recipes).then((response) => {
        // console.log(response.data);
        this.recipes = response.data;
      });
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Metodo per andare alla pagina precedente
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Metodo per andare a una pagina specifica
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    fetchComments() {
      axios.get(api.comments).then((response) => {
        // console.log(response);
        this.comments = response.data;
      });
    },
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        // console.log(response);
        this.cuisines = response.data;
      });
    },
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        // console.log(response);
        this.difficulties = response.data;
      });
    },
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        // console.log(response);
        this.diets = response.data;
      });
    },

    handleFilterClick() {
      this.filtersActive = !this.filtersActive;
    },

    getSelectedOrder(value) {
      this.selectedOrder = value;
    },
  },

  created() {
    this.fetchRecipes();
    this.fetchComments();
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
  },
};
</script>

<template>
  <div class="container py-3">
    <div class="row justify-content-center g-3">
      <div :class="filtersActive ? 'col-8' : 'col-12'">
        <RecipeList
          :recipes="sortedRecipes"
          :comments="comments"
          :cuisines="cuisines"
          :diets="diets"
          :difficulties="difficulties"
          :filtersActive="filtersActive"
          @openFilterCard="handleFilterClick()"
          @sendSelectedOrder="getSelectedOrder"
        />
        <div class="pagination-container d-flex justify-content-end">
          <div class="pagination">
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
        />
      </div>
    </div>
  </div>
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
