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
  <AppHeader />
  <AppMainAddRecipe />
  <AppFooter />
</template>

<style scoped lang="scss"></style>
