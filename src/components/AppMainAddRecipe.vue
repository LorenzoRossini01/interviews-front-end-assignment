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
      recipesIds: [],

      ingredients: [""],
      steps: [""],

      FormData: {
        id: "",
        title: "",
        selectedCuisine: "",
        selectedDifficulty: "",
        selectedDiet: "",
        image: "",
        ingredients: "",
        steps: "",
      },

      imageUploaded: false,
      previewImage: "",
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
    fetchRecipesId() {
      axios.get(api.recipes).then((response) => {
        const recipes = response.data;
        this.recipesIds = recipes.map((recipe) => recipe.id);
      });
    },

    handleImageUpload() {
      const image = event.target.files[0];
      this.imageUploaded = true;
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.FormData.image = image;
          this.previewImage = e.target.result;
          console.log(this.FormData.image);
          console.log(this.previewImage);
        };
        reader.readAsDataURL(image);
      }
    },

    addIngredient() {
      this.ingredients.push("");
    },
    addStep() {
      this.steps.push("");
    },

    updateIngredient(index, value) {
      this.ingredients[index] = value;
    },
    updateStep(index, value) {
      this.steps[index] = value;
    },

    addRecipe() {
      this.FormData.ingredients = this.ingredients.join(",");
      this.FormData.steps = this.steps.join(". ");
      this.FormData.id = this.recipesIds[this.recipesIds.length - 1] + 1;

      let props = {
        // id: parseInt(this.recipesIds[this.recipesIds.length - 1]) + 1,
        name: this.FormData.title,
        ingredients: this.FormData.ingredients,
        instructions: this.FormData.steps,
        cuisineId: this.FormData.selectedCuisine,
        dietId: this.FormData.selectedDiet,
        difficultyId: this.FormData.selectedDifficulty,
        image: this.FormData.image,
      };
      console.log(props);
      axios
        .post(api.recipes, props, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "recipes.index" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
    this.fetchRecipesId();
  },
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="addRecipe()">
      <h3 class="card-title my-3">Recipe Detail</h3>
      <div class="card p-3 mt-3 bg-body-tertiary">
        <div class="form-group">
          <label for="recipe-name">Recipe Name</label>
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Add recipe name"
            id="recipe-name"
            v-model="FormData.title"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="input-image-container">Cover Image</label>
          <div class="input-image-container" id="input-image-container">
            <img
              :src="previewImage"
              :class="!FormData.image ? 'd-none' : ''"
              alt=""
            />
            <input
              type="file"
              name="image"
              id="image"
              class="inputfile"
              @change="handleImageUpload()"
              required
            />
            <label
              for="image"
              :class="imageUploaded ? 'text-white border-white' : ''"
              >Choose a Photo</label
            >
          </div>
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
                :value="ingredients[index]"
                @input="updateIngredient(index, $event.target.value)"
                required
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
                required
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
              required
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
              required
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
              required
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
      <button type="submit" class="btn btn-orange rounded-pill mt-3">
        Publish
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: none;
  border-radius: 2rem;
}

label {
  font-weight: 600;
}

input {
  border: 1px solid rgb(213, 213, 213);
}

.input-image-container {
  width: 100%;
  height: 250px;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid rgb(213, 213, 213);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    &:focus {
      outline: 1px dotted #000;
    }
  }
  label {
    font-size: 1rem;
    font-weight: 700;
    border: 1px solid black;
    padding: 1rem 2.5rem;
    border-radius: var(--bs-border-radius-pill);
    display: inline-block;
    backdrop-filter: blur(0.5rem);
    position: absolute;
    cursor: pointer;
    &:hover {
      background-color: orangered;
      color: white;
      border: white;
    }
  }
}

// .inputfile:focus + label,
// .inputfile + label:hover {
//   background-color: red;
// }

// .inputfile:focus .input-image-container {
//   outline: 1px dotted #000;
// }
</style>
