<script>
import AppHeader from "../components/AppHeader.vue";
import AppMainAddRecipe from "../components/AppMainAddRecipe.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppMainAddRecipe,
    AppFooter,
  },
};
</script>

<template>
  <div class="container-fluid">
    <AppHeader />
    <AppMainAddRecipe />
    <AppFooter />
  </div>
</template>

<style scoped lang="scss"></style>
