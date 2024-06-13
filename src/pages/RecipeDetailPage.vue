<script>
import axios from "axios";
import { store, api } from "../store/index";

import AppHeader from "../components/AppHeader.vue";
import AppMainRecipeDetail from "../components/AppMainRecipeDetail.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {
      recipe: {},
      comments: [],
      allComments: [],
      cuisines: [],
      difficulties: [],
      diets: [],
    };
  },

  components: {
    AppHeader,
    AppMainRecipeDetail,
    AppFooter,
  },

  computed: {
    recipeId() {
      return this.$route.params.id;
    },

    baseUrl() {
      return api.recipes + "/" + this.recipeId;
    },
  },

  methods: {
    fetchRecipeDetails() {
      axios.get(this.baseUrl).then((response) => {
        // console.log(response);
        this.recipe = response.data;
      });
    },
    fetchComments() {
      axios.get(api.comments).then((response) => {
        response.data.forEach((comment) => {
          this.allComments.push(comment);
          if (comment.recipeId == this.recipeId) {
            // console.log(comment);
            this.comments.push(comment);
          }
        });
      });
    },
    fetchCuisines() {
      axios.get(api.cuisines).then((response) => {
        response.data.forEach((cuisine) => {
          if (cuisine.id == this.recipe.cuisineId) {
            // console.log(cuisine);
            this.cuisines.push(cuisine);
          }
        });
      });
    },
    fetchDifficulties() {
      axios.get(api.difficulties).then((response) => {
        response.data.forEach((difficulty) => {
          //   console.log(difficulty);
          if (difficulty.id == this.recipe.difficultyId) {
            this.difficulties.push(difficulty);
          }
        });
      });
    },
    fetchDiets() {
      axios.get(api.diets).then((response) => {
        response.data.forEach((diet) => {
          //   console.log(diet);
          if (diet.id == this.recipe.dietId) {
            this.diets.push(diet);
          }
        });
      });
    },

    postComment(commentData) {
      const now = new Date();

      // Formatta la data e l'ora nel formato desiderato "YYYY-MM-DD HH:mm:ss"
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const lastComment = this.allComments[this.allComments.length - 1];
      const lastCommentId = lastComment ? lastComment.id : 0;

      console.log(lastCommentId);
      // Genera un nuovo ID incrementando l'ultimo ID di uno
      const newCommentId = parseInt(lastCommentId) + 1;
      console.log(newCommentId);

      console.log(commentData);
      let newComment = {
        id: newCommentId,
        recipeId: this.recipeId,
        comment: commentData.commentText,
        rating: commentData.rating ? commentData.commentRating : 3,
        date: formattedDate,
      };
      axios
        .post(this.baseUrl + "/comments", newComment)
        .then((response) => {
          console.log("Comment posted successfully:", response.data);
          this.comments = [];
          this.fetchComments();
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    },

    deleteComment(comment) {
      axios
        .delete(`${api.comments}/${comment.id}`)
        .then(() => {
          console.log("Comment deleted successfully");
          this.comments = [];

          this.fetchComments();
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
        });
    },
  },

  created() {
    this.fetchRecipeDetails();
    this.fetchComments();
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
  },
};
</script>

<template>
  <AppHeader />
  <AppMainRecipeDetail
    :recipe="recipe"
    :comments="comments"
    :cuisines="cuisines"
    :difficulties="difficulties"
    :diets="diets"
    @addComment="postComment"
    @deleteComment="deleteComment"
  />
  <AppFooter />
</template>

<style scoped lang="scss"></style>
