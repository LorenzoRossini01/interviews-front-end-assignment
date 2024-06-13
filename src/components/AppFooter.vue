<script>
export default {
  data() {
    return {
      footerRightLinks: [
        {
          text: "Guidelines",
          link: "#",
        },
        {
          text: "Feedback Hub",
          link: "#",
        },
        {
          text: "Cooking Tips",
          link: "#",
        },
        {
          text: "Get in Touch",
          link: "#",
        },
      ],
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="row py-3">
        <div class="col">
          <h3>RecipeBook Pro</h3>
          <p>Enhance Your Culinary Skills Now!</p>
          <p>RecipeBook <i class="fa-regular fa-copyright"></i></p>
        </div>
        <div class="col">
          <ul class="text-end">
            <li><strong>Support</strong></li>
            <li v-for="link in footerRightLinks">
              <a :href="link.link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  -webkit-box-shadow: 0px -2px 7px -3px rgba(0, 0, 0, 0.58);
  box-shadow: 0px -2px 7px -3px rgba(0, 0, 0, 0.58);
  p {
    color: #949494;
  }
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  a {
    color: #949494;
    text-decoration: none;
    &:hover {
      color: #000;
    }
  }
}
</style>
