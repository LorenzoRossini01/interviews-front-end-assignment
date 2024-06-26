import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";

import RecipePage from "./pages/RecipePage.vue";
import RecipeDetailPage from "./pages/RecipeDetailPage.vue";
import AddRecipePage from "./pages/AddRecipePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },

    {
      path: "/recipes/:page",
      name: "recipes.index",
      component: RecipePage,
    },
    {
      path: "/recipes/:id/:page",
      name: "recipes.show",
      component: RecipeDetailPage,
    },
    {
      path: "/recipes/add/:page",
      name: "recipes.create",
      component: AddRecipePage,
    },
  ],
});

export { router };
