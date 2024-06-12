<script>
import { store } from "../store/index";
export default {
  data() {
    return {
      store,

      selectedCuisine: "",
      selectedDifficulty: "",
      selectedDiet: "",
    };
  },

  props: {
    recipes: {
      type: Array,
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
  },

  emits: ["closeFilterCard", "selectFilters"],

  methods: {
    closeFilterCard() {
      this.$emit("closeFilterCard");
    },

    selectFilters() {
      this.$emit("selectFilters", [
        store.searchedTerm,
        this.selectedCuisine,
        this.selectedDifficulty,
        this.selectedDiet,
      ]);
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <i
        class="fa-solid fa-arrow-left-long fa-lg mb-3"
        @click="closeFilterCard()"
      ></i>
      <h5 class="card-title">Discover recipes</h5>
      <form action="" method="get" @submit.prevent="selectFilters()">
        <!-- recipe name  -->
        <label for="name" class="form-label mt-3 mb-0"> Search by name </label>
        <input
          v-model="store.searchedTerm"
          type="text"
          id="name"
          name="name"
          class="form-control rounded-pill"
          placeholder="Search"
          aria-label="recipes name"
          aria-describedby="button-addon2"
          @keyup.enter="selectFilters()"
        />
        <!-- recipe cuisine  -->
        <label for="cuisine" class="form-label mt-3 mb-0">
          Select cuisine
        </label>
        <select
          v-model="selectedCuisine"
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
        <!-- recipe difficolty  -->
        <label for="difficulty" class="form-label mt-3 mb-0">
          Select difficulty
        </label>
        <select
          v-model="selectedDifficulty"
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

        <!-- recipe diets  -->
        <label for="difficulty" class="form-label mt-3 mb-0">
          Select diet
        </label>
        <select
          v-model="selectedDiet"
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
        <button
          type="submit"
          class="btn btn-orange rounded-pill mt-3"
          id="button-addon2"
          @click="selectFilters()"
        >
          Search
        </button>
        <button
          class="btn btn-orange bg-secondary border-secondary rounded-pill mt-3 ms-3"
          type="reset"
        >
          Reset filters
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: none;
  -webkit-box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
  box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
}
</style>
