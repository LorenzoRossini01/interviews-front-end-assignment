<script>
export default {
  data() {
    return {
      commentData: {
        commentText: "", // Testo del commento
        commentRating: null, // Valutazione del commento
      },
      recipeIndexPage: parseInt(this.$route.params.page), // Numero della pagina corrente delle ricette
    };
  },

  // Props passate al componente
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    comments: {
      type: Object,
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

  computed: {
    // Calcola l'URL completo dell'immagine della ricetta
    recipeImage() {
      return "http://localhost:8080" + this.recipe.image;
    },

    // Converte le istruzioni della ricetta in un array di passaggi
    procedureArray() {
      const procedure = this.recipe.instructions;
      return procedure ? procedure.split(". ") : [];
    },
  },

  emits: ["addComment", "deleteComment"], // Emittente di eventi per aggiungere e cancellare commenti

  methods: {
    // Metodo per inviare un commento
    postComment() {
      this.$emit("addComment", this.commentData);
      this.commentData = {
        commentText: "", // Reimposta il testo del commento
        commentRating: null, // Reimposta la valutazione del commento
      };
    },

    // Metodo per cancellare un commento
    deleteComment(comment) {
      this.$emit("deleteComment", comment);
    },

    // Metodo per tornare alla lista delle ricette
    goBack() {
      this.$router.push({
        name: "recipes.index",
        params: { page: this.recipeIndexPage },
      });
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <!-- Titolo della ricetta e pulsante per tornare indietro -->
      <div class="title d-flex justify-content-between align-items-center">
        <h1>{{ recipe.name }}</h1>
        <a @click.native.prevent="goBack" href="" class="text-dark">
          <i class="fa-solid fa-arrow-left"></i>
          Back to List
        </a>
      </div>

      <!-- Immagine della ricetta -->
      <div class="recipe-img-wrapper recipe">
        <img :src="recipeImage" alt="" />
      </div>
      <div class="row d-flex flex-lg-row g-2 g-md-3 g-lg-4 mt-5">
        <!-- Sezione degli ingredienti e della procedura -->
        <div class="col-md-6 h-100 order-2 order-md-1">
          <div class="card">
            <h5 class="">Ingredients</h5>
            <ul>
              <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
          </div>

          <div class="card my-3">
            <h5>Procedure</h5>
            <ol class="ps-3">
              <li v-for="step in procedureArray">{{ step }}</li>
            </ol>
          </div>
        </div>

        <!-- Sezione delle cucine, difficoltà e diete -->
        <div class="col-md-6 order-1 order-md-2 h-100 my-2">
          <div class="card">
            <h5 class="card-title">Cuisine</h5>
            <ul>
              <li v-for="cuisine in cuisines">{{ cuisine.name }}</li>
            </ul>
          </div>
          <div class="card my-3">
            <h5 class="card-title">Difficulty</h5>
            <ul>
              <li v-for="difficulty in difficulties">{{ difficulty.name }}</li>
            </ul>
          </div>
          <div class="card">
            <h5 class="card-title">Diets</h5>
            <ul>
              <li v-for="diet in diets">{{ diet.name }}</li>
            </ul>
          </div>
        </div>

        <!-- Sezione dei commenti degli utenti -->
        <div class="card my-3 order-3">
          <h5>User Review</h5>
          <ul class="review-list">
            <li
              v-for="comment in comments"
              class="d-flex align-items-center gap-3"
            >
              <span class="img-wrapper">
                <img src="https://picsum.photos/200" alt="" />
              </span>
              <span>
                <h5 class="mb-0 text-start">Name Surname</h5>
                <p>
                  <i
                    class="fa-solid fa-star fa-sm"
                    v-for="star in comment.rating"
                  ></i>
                </p>
                <p>{{ comment.comment }}</p>
              </span>
              <span class="ms-auto me-3 delete-comment">
                <i
                  class="fa-solid fa-trash-alt fa-sm p-3"
                  @click="deleteComment(comment)"
                ></i>
              </span>
            </li>
          </ul>

          <!-- Form per aggiungere un commento -->
          <form
            class="form-group d-flex flex-column justyfy-content-center align-items-end"
          >
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Leave your review here"
              v-model="commentData.commentText"
            />

            <div class="input-group d-flex align-items-center mt-3 ps-3">
              <label>Rate Recipe</label>
              <div class="rating ms-3">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  v-model="commentData.commentRating"
                />
                <label
                  class="star"
                  for="star5"
                  title="Awesome"
                  aria-hidden="true"
                ></label>
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  v-model="commentData.commentRating"
                />
                <label
                  class="star"
                  for="star4"
                  title="Great"
                  aria-hidden="true"
                ></label>
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  v-model="commentData.commentRating"
                />
                <label
                  class="star"
                  for="star3"
                  title="Very good"
                  aria-hidden="true"
                ></label>
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  v-model="commentData.commentRating"
                />
                <label
                  class="star"
                  for="star2"
                  title="Good"
                  aria-hidden="true"
                ></label>
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  v-model="commentData.commentRating"
                />
                <label
                  class="star"
                  for="star1"
                  title="Bad"
                  aria-hidden="true"
                ></label>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-orange mt-3 rounded-pill"
              @click="postComment()"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.recipe-img-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  img {
    width: 100%;
    height: 500px;
    border-radius: 2rem;
    object-fit: cover;
    object-position: center;
  }
}
ul {
  list-style-type: none;
  padding-left: 0;
}

.col-6 {
  height: 100%;
  .card {
    height: 100%;
  }
}

.card {
  border-radius: 2rem;
  padding-block: 1rem;
  padding-inline: 1rem;
  -webkit-box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
  box-shadow: -2px 10px 24px -3px rgba(0, 0, 0, 0.1);
  border: none;
}
.review-list {
  list-style-type: none;
  padding-left: 0;
  max-height: 300px;
  overflow-y: auto;
  li {
    padding-block: 1rem;
    padding-inline: 1rem;
    border-bottom: 1px solid gray;
    &:hover {
      background-color: #f6f6f6;
    }
    .delete-comment {
      width: 50px;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        i {
          color: orangered;
          scale: 1.5;
        }
      }
    }
    &:last-of-type {
      border-bottom: none;
    }

    .img-wrapper {
      height: 75px;
      border-radius: 50%;
      img {
        border-radius: 50%;
        height: 100%;
      }
    }

    .fa-star {
      color: #f79426;
    }
  }
}

h5 {
  text-align: center;
}
p {
  margin-bottom: 0rem;
}

.rating {
  border: none;
  float: left;
}

.rating > label {
  color: #90a0a3;
  float: right;
}

.rating > label:before {
  margin: 0.1rem;
  font-size: 1rem;
  font-family: FontAwesome;
  content: "\f005";
  display: inline-block;
}

.rating > input {
  display: none;
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #f79426;
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label {
  color: #fece31;
}
</style>
