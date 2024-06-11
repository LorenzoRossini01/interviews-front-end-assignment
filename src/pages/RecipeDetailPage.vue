<script>
import axios from "axios";
import { store, api } from "../store/index";

import AppHeader from "../components/AppHeader.vue";
import AppMainRecipeDetail from "../components/AppMainRecipeDetail.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {
      recipe: {},
      comments: [],
      cuisines: [],
      difficulties: [],
      diets: [],
    };
  },

  components: {
    AppHeader,
    AppMainRecipeDetail,
    AppFooter,
  },

  computed: {
    recipeId() {
      return this.$route.params.id;
    },

    baseUrl() {
      return api.recipes + "/" + this.recipeId;
    },
  },

  methods: {
    // funzione per recuperare i dettagli della ricetta
    fetchRecipeDetails() {
      axios.get(this.baseUrl).then((response) => {
        // console.log(response);
        this.recipe = response.data;
      });
    },

    // funzione per recuperare i commenti collegati alla ricetta
    fetchComments() {
      axios.get(api.comments).then((response) => {
        response.data.forEach((comment) => {
          if (comment.recipeId == this.recipeId) {
            // console.log(comment);
            this.comments.push(comment);
          }
        });
      });
    },

    // funzione per recuperare le categorie di cucina della ricetta
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        response.data.forEach((cuisine) => {
          if (cuisine.id == this.recipe.cuisineId) {
            // console.log(cuisine);
            this.cuisines.push(cuisine);
          }
        });
      });
    },

    // funzione per recuperare le difficoltà della ricetta
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        response.data.forEach((difficulty) => {
          //   console.log(difficulty);
          if (difficulty.id == this.recipe.difficultyId) {
            this.difficulties.push(difficulty);
          }
        });
      });
    },

    // funzione per recuperare le tipologie di diete della ricetta
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        response.data.forEach((diet) => {
          //   console.log(diet);
          if (diet.id == this.recipe.dietId) {
            this.diets.push(diet);
          }
        });
      });
    },
  },

  created() {
    this.fetchRecipeDetails();
    this.fetchComments();
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
  },
};
</script>

<template>
  <div class="container">
    <AppHeader />
    <AppMainRecipeDetail
      :recipe="recipe"
      :comments="comments"
      :cuisines="cuisines"
      :difficulties="difficulties"
      :diets="diets"
    />
    <AppFooter />
  </div>
</template>

<style scoped lang="scss"></style>
