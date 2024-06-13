<script>
// Importa axios per le chiamate API e lo store per i dati reattivi
import axios from "axios";
import { store, api } from "../store/index";

// Importa i componenti necessari
import AppHeader from "../components/AppHeader.vue";
import AppMainRecipeDetail from "../components/AppMainRecipeDetail.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  data() {
    return {
      // Dati iniziali vuoti che verranno popolati dalle chiamate API
      recipe: {}, // Dettagli della ricetta
      comments: [], // Commenti relativi alla ricetta
      allComments: [], // Tutti i commenti disponibili
      cuisines: [], // Lista delle cucine
      difficulties: [], // Lista delle difficoltà
      diets: [], // Lista delle diete
    };
  },

  components: {
    AppHeader, // Componente per l'intestazione dell'applicazione
    AppMainRecipeDetail, // Componente per i dettagli principali della ricetta
    AppFooter, // Componente per il piè di pagina dell'applicazione
  },

  computed: {
    // Proprietà computata per ottenere l'ID della ricetta dalla route
    recipeId() {
      return this.$route.params.id;
    },

    // Proprietà computata per costruire l'URL base per le chiamate API relative alla ricetta corrente
    baseUrl() {
      return api.recipes + "/" + this.recipeId;
    },
  },

  methods: {
    // Metodo per recuperare i dettagli della ricetta
    fetchRecipeDetails() {
      axios.get(this.baseUrl).then((response) => {
        // console.log(response);
        this.recipe = response.data;
      });
    },

    // Metodo per recuperare i commenti relativi alla ricetta
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

    // Metodo per recuperare la tipologia di cucina della ricetta
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

    // Metodo per recuperare la difficoltà della ricetta
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

    // Metodo per recuperare la tipologia di dieta della ricetta
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

    // Metodo per inviare un nuovo commento
    postComment(commentData) {
      const now = new Date();

      // Formatta la data e l'ora nel formato "YYYY-MM-DD HH:mm:ss"
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      // Ottieni l'ID dell'ultimo commento
      const lastComment = this.allComments[this.allComments.length - 1];
      const lastCommentId = lastComment ? lastComment.id : 0;

      // Genera un nuovo ID incrementando l'ultimo ID di uno
      const newCommentId = parseInt(lastCommentId) + 1;

      // console.log(lastCommentId);
      // console.log(newCommentId);
      // console.log(commentData);

      // Crea il nuovo commento da inviare al backend
      let newComment = {
        id: newCommentId,
        recipeId: this.recipeId,
        comment: commentData.commentText,
        rating: commentData.rating ? commentData.commentRating : 3,
        date: formattedDate,
      };

      // Effettua la richiesta POST per aggiungere il commento
      axios
        .post(this.baseUrl + "/comments", newComment)
        .then((response) => {
          console.log("Comment posted successfully:", response.data);
          this.comments = []; // Svuota l'array dei commenti
          this.fetchComments(); // Aggiorna i commenti dopo l'aggiunta
        })
        .catch((error) => {
          console.error("Error posting comment:", error);
        });
    },

    // Metodo per eliminare un commento
    deleteComment(comment) {
      axios
        .delete(`${api.comments}/${comment.id}`)
        .then(() => {
          console.log("Comment deleted successfully");
          this.comments = []; // Svuota l'array dei commenti
          this.fetchComments(); // Aggiorna i commenti dopo l'eliminazione
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
        });
    },
  },

  created() {
    // Quando il componente viene creato, effettua le seguenti chiamate API per inizializzare i dati
    this.fetchRecipeDetails();
    this.fetchComments();
    this.fetchCuisines();
    this.fetchDifficulties();
    this.fetchDiets();
  },
};
</script>

<template>
  <!-- Componente per l'header -->
  <AppHeader />

  <!-- Componente per i dettagli della ricetta -->
  <!-- Passaggio come props di tutti i dati ottenudi alle richieste API  -->
  <!-- Ricezione dell'emit del componente figlio per la creazione ed eliminazione dei commenti  -->
  <AppMainRecipeDetail
    :recipe="recipe"
    :comments="comments"
    :cuisines="cuisines"
    :difficulties="difficulties"
    :diets="diets"
    @addComment="postComment"
    @deleteComment="deleteComment"
  />

  <!-- Componente per il footer -->
  <AppFooter />
</template>

<style scoped lang="scss"></style>
