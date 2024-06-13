<script>
import AppHeader from "../components/AppHeader.vue";
import AppMainRecipePage from "../components/AppMainRecipePage.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {
      searchedTerm: "",
    };
  },

  components: {
    AppHeader,
    AppMainRecipePage,
    AppFooter,
  },

  methods: {
    updateSearchedTerm(searchedTerm) {
      this.searchedTerm = searchedTerm;
    },
  },
};
</script>

<template>
  <div class="wrapper d-flex flex-column">
    <AppHeader @updateSearch="updateSearchedTerm" />
    <AppMainRecipePage :HeadersearchedTerm="searchedTerm" />
    <AppFooter />
  </div>
</template>

<style lang="scss"></style>
