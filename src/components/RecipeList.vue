<script>
import axios from "axios";
import { store, api } from "../store/index";
import RecipeCard from "./RecipeCard.vue";

export default {
  data() {
    return {
      hasBeenFiltered: true,
      selectedOrder: 0,
    };
  },

  components: {
    RecipeCard,
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
    filtersActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["openFilterCard", "sendSelectedOrder"],
  methods: {
    openFilterCard() {
      this.$emit("openFilterCard");
    },

    sendSelectedOrder() {
      this.$emit("sendSelectedOrder", this.selectedOrder);
    },
  },

  created() {},
};
</script>

<template>
  <div class="top-list d-flex align-items-end mb-3">
    <div class="title-container" v-if="hasBeenFiltered">
      <p>Result for</p>
      <h2>Recipes found for your search criteria</h2>
    </div>
    <div class="order-by ms-auto me-3">
      <select
        name="order-by"
        id="order-by"
        class="form-select rounded-pill ps-4 pe-5 py-2"
        v-model="selectedOrder"
        @change="sendSelectedOrder()"
      >
        <option :value="0" class="d-none">Order by</option>
        <option :value="1">Name A-Z</option>
        <option :value="2">Name Z-A</option>
        <option :value="3">Difficulty Asc</option>
        <option :value="4">Difficulty Desc</option>
        <option :value="5">Date Asc</option>
        <option :value="6">Date Desc</option>
      </select>
    </div>
    <div
      class="btn btn-orange rounded-pill"
      v-if="!filtersActive"
      @click="openFilterCard()"
    >
      Filter
    </div>
  </div>
  <RecipeCard
    v-for="recipe of recipes"
    :recipe="recipe"
    :comments="comments"
    :cuisines="cuisines"
    :diets="diets"
    :difficulties="difficulties"
    :key="recipe.id"
  />
</template>

<style scoped lang="scss"></style>
