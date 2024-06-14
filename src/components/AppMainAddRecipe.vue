<script>
import axios from "axios";
import { store, api } from "../store/index";

export default {
  data() {
    return {
      // Stato del componente
      recipe: {}, // Oggetto vuoto per la ricetta (potrebbe essere utilizzato per eventuali dettagli della ricetta)
      cuisines: [], // Array per le opzioni di cucina disponibili
      difficulties: [], // Array per le opzioni di difficoltà disponibili
      diets: [], // Array per le opzioni di dieta disponibili
      recipesIds: [], // Array di ID delle ricette esistenti

      ingredients: [""], // Array per gli ingredienti della ricetta (inizializzato con un elemento vuoto)
      steps: [""], // Array per i passaggi della ricetta (inizializzato con un elemento vuoto)

      FormData: {
        // Oggetto per raccogliere i dati del form da inviare
        id: "", // ID della ricetta (potrebbe essere generato automaticamente)
        title: "", // Titolo della ricetta
        selectedCuisine: "", // ID della cucina selezionata per la ricetta
        selectedDifficulty: "", // ID della difficoltà selezionata per la ricetta
        selectedDiet: "", // ID della dieta selezionata per la ricetta
        image: "", // Immagine della ricetta (da caricare)
        ingredients: "", // Stringa concatenata di ingredienti
        steps: "", // Stringa concatenata di passaggi
      },

      imageUploaded: false, // Flag per indicare se un'immagine è stata caricata
      previewImage: "", // Anteprima dell'immagine caricata (visualizzata nell'interfaccia utente)
    };
  },

  methods: {
    // Metodo per recuperare le opzioni di cucina disponibili
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        this.cuisines = response.data;
      });
    },

    // Metodo per recuperare le opzioni di difficoltà disponibili
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        this.difficulties = response.data;
      });
    },

    // Metodo per recuperare le opzioni di dieta disponibili
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        this.diets = response.data;
      });
    },

    // Metodo per recuperare gli ID delle ricette esistenti (per generare un nuovo ID univoco)
    fetchRecipesId() {
      axios.get(api.recipes).then((response) => {
        const recipes = response.data;
        this.recipesIds = recipes.map((recipe) => recipe.id);
      });
    },

    // Gestione dell'upload dell'immagine della ricetta
    handleImageUpload() {
      const image = event.target.files[0];
      this.imageUploaded = true;
      if (image) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Salvataggio dell'immagine e anteprima nell'oggetto FormData
          this.FormData.image = image;
          this.previewImage = e.target.result;
          console.log(this.FormData.image);
          console.log(this.previewImage);
        };
        reader.readAsDataURL(image); // Lettura del file come URL dati
      }
    },

    // Aggiunta di un nuovo campo per gli ingredienti nell'interfaccia utente
    addIngredient() {
      this.ingredients.push("");
    },

    // Aggiunta di un nuovo campo per i passaggi nell'interfaccia utente
    addStep() {
      this.steps.push("");
    },

    // Aggiornamento dell'array degli ingredienti quando l'utente modifica un campo
    updateIngredient(index, value) {
      this.ingredients[index] = value;
    },

    // Aggiornamento dell'array dei passaggi quando l'utente modifica un campo
    updateStep(index, value) {
      this.steps[index] = value;
    },

    // Invio dei dati del form per aggiungere una nuova ricetta
    addRecipe() {
      // Concatenazione degli ingredienti e dei passaggi in stringhe separate da virgole e punti
      this.FormData.ingredients = this.ingredients.join(",");
      this.FormData.steps = this.steps.join(". ");

      // Generazione di un nuovo ID per la nuova ricetta (basato sull'ultimo ID presente)
      this.FormData.id = this.recipesIds[this.recipesIds.length - 1] + 1;

      // Costruzione dell'oggetto da inviare al server
      let props = {
        id: parseInt(this.FormData.id),
        name: this.FormData.title,
        ingredients: this.FormData.ingredients,
        instructions: this.FormData.steps,
        cuisineId: this.FormData.selectedCuisine,
        dietId: this.FormData.selectedDiet,
        difficultyId: this.FormData.selectedDifficulty,
        image: this.FormData.image,
      };
      console.log(props);

      // Chiamata API per aggiungere la nuova ricetta
      axios
        .post(api.recipes, props, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response); // Log della risposta dalla chiamata API
          this.$router.push({ name: "recipes.index", params: { page: 1 } }); // Navigazione alla pagina delle ricette dopo l'aggiunta
        })
        .catch((error) => {
          console.log(error); // Gestione degli errori nella chiamata API
        });
    },

    goBack() {
      this.$router.push({
        name: "recipes.index",
        params: { page: this.recipeIndexPage },
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
  <main>
    <div class="container py-3">
      <form @submit.prevent="addRecipe()">
        <div class="title d-flex justify-content-between align-items-center">
          <h3 class="card-title my-3">Recipe Detail</h3>
          <a @click.native.prevent="goBack" href="" class="text-dark">
            <i class="fa-solid fa-arrow-left"></i>
            Back to List
          </a>
        </div>
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
            <div class="form-group col-lg-6">
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
            <div class="form-group col-lg-6">
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
            <div class="form-group col-md-4">
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
            <div class="form-group col-md-4">
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

                <option
                  :value="difficulty.id"
                  v-for="difficulty in difficulties"
                >
                  {{ difficulty.name }}
                </option>
              </select>
            </div>

            <!-- recipe diets  -->
            <div class="form-group col-md-4">
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
  </main>
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
