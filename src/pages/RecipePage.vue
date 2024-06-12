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
  <AppHeader @updateSearch="updateSearchedTerm" />
  <AppMainRecipePage :HeadersearchedTerm="searchedTerm" />
  <AppFooter />
</template>

<style lang="scss"></style>
