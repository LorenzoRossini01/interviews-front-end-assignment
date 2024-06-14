<script>
// Importa lo store per gestire lo stato globale
import { store } from "../store/index";

export default {
  data() {
    return {
      store, // Stato globale dell'applicazione
    };
  },

  // Props passate al componente
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    cuisines: {
      type: Array,
      required: true,
    },
    diets: {
      type: Array,
      required: true,
    },
    difficulties: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    // Restituisce l'URL completo dell'immagine della ricetta
    recipeImage() {
      return "http://localhost:8080" + this.recipe.image;
    },

    // Restituisce il nome della cucina associata alla ricetta
    cuisineName() {
      const cuisine = this.cuisines.find((c) => c.id === this.recipe.cuisineId);
      return cuisine ? "#" + cuisine.name : "Unknown";
    },

    // Restituisce il nome della dieta associata alla ricetta
    dietName() {
      const diet = this.diets.find((d) => d.id === this.recipe.dietId);
      return diet ? diet.name : "Unknown";
    },

    // Restituisce il nome della difficoltà associata alla ricetta
    difficultyName() {
      const difficulty = this.difficulties.find(
        (d) => d.id === this.recipe.difficultyId
      );
      return difficulty ? difficulty.name : "Unknown";
    },

    // Filtra i commenti associati alla ricetta corrente
    filteredComments() {
      return this.comments.filter(
        (comment) => comment.recipeId === this.recipe.id
      );
    },

    // Calcola la valutazione media dei commenti
    averageRating() {
      const ratings = this.filteredComments.map((comment) => comment.rating);
      if (ratings.length === 0) return 0;
      const sum = ratings.reduce((a, b) => a + b, 0);
      return (sum / ratings.length).toFixed(1);
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="row g-2 d-flex">
      <!-- Colonna per l'immagine della ricetta -->
      <div class="col-12 col-lg">
        <div class="img-wrapper">
          <img class="card-img-top" :src="recipeImage" :alt="recipe.name" />
        </div>
      </div>

      <div class="col-12 col-lg">
        <div class="row d-none d-lg-flex h-100">
          <!-- Colonna per i dettagli della ricetta  -->
          <div class="col-8">
            <div class="detail-wrapper d-flex justify-content-between">
              <h3 class="h2">{{ recipe.name }}</h3>
              <p class="h4-lg">{{ dietName }}</p>
              <p class="h2">
                Only
                <strong>{{ recipe.ingredients.length }}</strong> Ingredients
              </p>
              <span class="badge rounded-pill">
                {{ cuisineName }}
              </span>
            </div>
          </div>
          <!-- colonna per altre informazioni della ricetta e link al dettaglio  -->
          <div class="col-4 ms-auto">
            <div class="control-wrapper d-flex justify-content-center">
              <span class="text-end mt-auto"
                ><strong>Difficulty: </strong>{{ difficultyName }}</span
              >
              <div class="rating-container mt-2">
                <span class="rating text-end me-2" v-if="averageRating >= 4.5"
                  >Highly rated</span
                >
                <span
                  class="badge rounded-pill"
                  :style="{
                    backgroundColor: averageRating >= 4.5 && 'orangered',
                    color: averageRating >= 4.5 && 'white',
                    borderColor: averageRating >= 4.5 && 'white',
                  }"
                >
                  {{ averageRating }}
                </span>
              </div>
              <router-link
                :to="{
                  name: 'recipes.show',
                  params: { id: recipe.id, page: currentPage },
                }"
                class="btn btn-orange rounded-pill mt-3"
                >View Details</router-link
              >
            </div>
          </div>
        </div>

        <div class="row d-lg-none">
          <!-- Colonna per i dettagli della ricetta  -->
          <div class="col-6">
            <div class="detail-wrapper d-flex flex-column gap-3">
              <h3 class="h4">{{ recipe.name }}</h3>
              <p>{{ dietName }}</p>
              <p>
                Only
                <strong>{{ recipe.ingredients.length }}</strong> Ingredients
              </p>
              <span><strong>Difficulty: </strong>{{ difficultyName }}</span>
            </div>
          </div>
          <!-- colonna per altre informazioni della ricetta e link al dettaglio  -->
          <div class="col-6">
            <div class="control-wrapper d-flex flex-column gap-3">
              <div class="rating-container mt-2">
                <span class="rating me-2" v-if="averageRating >= 4.5"
                  >Highly rated</span
                >
                <span
                  class="badge rounded-pill"
                  :style="{
                    backgroundColor: averageRating >= 4.5 && 'orangered',
                    color: averageRating >= 4.5 && 'white',
                    borderColor: averageRating >= 4.5 && 'white',
                  }"
                >
                  {{ averageRating }}
                </span>
              </div>
              <span class="badge rounded-pill">
                {{ cuisineName }}
              </span>

              <router-link
                :to="{
                  name: 'recipes.show',
                  params: { id: recipe.id, page: currentPage },
                }"
                class="btn btn-orange rounded-pill mt-auto"
                >View Details</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 2rem;
  height: auto;
  -webkit-box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
  box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: 1rem;
  .row {
    height: auto;
    .col-12,
    .col-lg {
      height: auto;
    }
    p,
    .rating {
      font-size: 1.5rem;
      margin: 0;
      color: rgb(175, 175, 175);
    }
    .rating-container {
      display: flex;
      align-items: flex-start;
    }
    .img-wrapper {
      width: 100%;
      aspect-ratio: 1/1;
      overflow: hidden;
      border-radius: 1rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .detail-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .recipe-title {
        font: 2.5rem;
      }
    }
    .badge {
      border: 1px solid rgb(25, 25, 25);
      color: rgb(25, 25, 25);
      margin-top: auto;
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
    }

    .btn-orange {
      padding-inline: 1rem;
    }

    .control-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      button {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 768px) {
}
</style>
