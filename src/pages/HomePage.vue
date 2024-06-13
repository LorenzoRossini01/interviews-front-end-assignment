<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <img src="../assets/Recipe book.gif" alt="" />
      </div>
      <div class="col text-center">
        <h1>RecipeBook</h1>
        <p>Discover Recipes</p>

        <!-- Router link per navigare alla pagina delle ricette con pagina 1 come parametro -->
        <router-link
          :to="{ name: 'recipes.index', params: { page: 1 } }"
          class="btn btn-orange rounded-pill"
          >Explore</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  height: 100vh;
  .row {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.col {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
