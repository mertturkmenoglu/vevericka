<template>
  <v-container>
    <v-card class="my-4 title">
      <h2 class="px-8 py-4 text-center font-weight-light">Your home page is under development.</h2>
      <h2 class="px-8 py-4 text-center font-weight-light">We'll be back soon.</h2>
    </v-card>
    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
    </div>
    <div class="text-center mt-8">
      <v-pagination color="deep-orange text--darken-2" v-model="page" :length="4"/>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "Home",
    components: {},
    data: () => ({
      user: {},
      recommendations: [],
      isLoading: true,
      page: 1,
    }),
    methods: {
      async fetchUser() {
        const BASE = "https://user-info-service.herokuapp.com";
        const URL = `${BASE}/user/username/${this.username}`;
        const response = await fetch(URL);
        const data = await response.json();
        this.user = data.user[0];
      },
    },
    mounted() {
      this.fetchUser().then(() => {
        this.isLoading = false;
      });
    },
    computed: {
      username() {
        return this.$store.state.user.username;
      }
    }
  };
</script>

<style scoped>
  .title {
    background-color: #E64A19;
    color: white;
  }

  a {
    text-decoration: none;
  }
</style>
