<script>
import axios from "axios";
import { store, api } from "../store/index";

export default {
  data() {
    return {
      recipe: {},
      cuisines: [],
      difficulties: [],
      diets: [],

      ingredients: [""],
      steps: [""],

      FormData: {
        title: "",
        selectedCuisine: "",
        selectedDifficulty: "",
        selectedDiet: "",
        image: "",
        ingredients: "",
        steps: "",
      },
    };
  },

  methods: {
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        this.cuisines = response.data;
      });
    },
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        this.difficulties = response.data;
      });
    },
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        this.diets = response.data;
      });
    },

    addIngredient() {
      this.ingredients.push("");
    },
    addStep() {
      this.steps.push("");
    },
  },

  created() {
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
  },
};
</script>

<template>
  <div class="container">
    <form action="">
      <h3 class="card-title my-3">Recipe Detail</h3>
      <div class="card p-3 mt-3 bg-body-tertiary">
        <div class="form-group">
          <label for="recipe-name">Recipe Name</label>
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Add recipe name"
            id="recipe-name"
          />
        </div>
        <div class="form-group">
          <label for="recipe-image">Recipe Image</label>
          <input type="file" />
        </div>
      </div>
      <div class="card p-3 mt-3 bg-body-tertiary">
        <div class="row">
          <!-- ingredients  -->
          <div class="form-group col-6">
            <label for="recipe-ingredients">Main Ingredients</label>
            <div v-for="(ingredient, index) in ingredients" :key="index">
              <input
                type="text"
                class="form-control rounded-pill mt-2"
                :placeholder="'Add ingredient ' + (index + 1)"
                :value="ingredient"
                @input="updateIngredient(index, $event.target.value)"
              />
            </div>
            <div
              class="btn btn-secondary rounded-pill w-100 mt-3"
              @click="addIngredient()"
            >
              +
            </div>
          </div>

          <!-- steps  -->
          <div class="form-group col-6">
            <label for="recipe-ingredients">Recipe steps</label>
            <div v-for="(step, index) in steps" :key="index">
              <input
                type="text"
                class="form-control rounded-pill mt-2"
                :placeholder="'Add step ' + (index + 1)"
                :value="step"
                @input="updateStep(index, $event.target.value)"
              />
            </div>
            <div
              class="btn btn-secondary rounded-pill w-100 mt-3"
              @click="addStep()"
            >
              +
            </div>
          </div>

          <!-- recipe cuisine  -->
          <div class="form-group col-4">
            <label for="cuisine" class="form-label mt-3 mb-0">
              Select cuisine
            </label>
            <select
              v-model="FormData.selectedCuisine"
              id="cuisine"
              name="cuisine"
              class="form-select rounded-pill"
              aria-label="Default select example"
            >
              <option :value="0" class="d-none">Choose cuisine</option>
              <option :value="null">None</option>
              <option :value="cuisine.id" v-for="cuisine in cuisines">
                {{ cuisine.name }}
              </option>
            </select>
          </div>
          <!-- recipe difficulty  -->
          <div class="form-group col-4">
            <label for="difficulty" class="form-label mt-3 mb-0">
              Select difficulty
            </label>
            <select
              v-model="FormData.selectedDifficulty"
              id="difficulty"
              name="difficulty"
              class="form-select rounded-pill"
              aria-label="Default select example"
            >
              <option :value="0" class="d-none">Choose difficulty</option>
              <option :value="null">None</option>

              <option :value="difficulty.id" v-for="difficulty in difficulties">
                {{ difficulty.name }}
              </option>
            </select>
          </div>

          <!-- recipe diets  -->
          <div class="form-group col-4">
            <label for="difficulty" class="form-label mt-3 mb-0">
              Select diet
            </label>
            <select
              v-model="FormData.selectedDiet"
              id="diet"
              name="diet"
              class="form-select rounded-pill"
              aria-label="Default select example"
            >
              <option :value="0" class="d-none">Choose diet type</option>
              <option :value="null">None</option>

              <option :value="diet.id" v-for="diet in diets">
                {{ diet.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: none;
  border-radius: 2rem;
}
</style>
