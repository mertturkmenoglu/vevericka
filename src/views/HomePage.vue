<template>
  <v-container>
    <v-card class="my-8 recommendation-title">
      <h1 class="pa-8">Your Recommendations</h1>
    </v-card>
    <v-row>
      <v-col v-for="(i, idx) in recommendations[page-1]" :key="idx" xs="12" sm="12" md="6" lg="4">
        <router-link :to="`/user/${i.username}`">
          <Recommendation :user="i" class=" "/>
        </router-link>
      </v-col>
    </v-row>
    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
    </div>
    <div class="text-center mt-16">
      <v-pagination color="deep-orange text--darken-2" v-model="page" :length="5"/>
    </div>
  </v-container>
</template>

<script>
  import Recommendation from "../components/Recommendation";

  export default {
    name: "Home",
    components: {Recommendation},
    data: () => ({
      user: {},
      recommendations: [],
      isLoading: true,
      page: 1,
    }),
    methods: {
      async fetchUser() {
        const BASE = "https://user-info-service.herokuapp.com";
        const URL = `https://cors-anywhere.herokuapp.com/${BASE}/user/username/${this.username}`;
        const requestOptions = {
          headers: {
            "Origin": "https://vevericka.herokuapp.com"
          }
        }
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
        this.user = data.user[0];
      },

      async fetchRecommendations() {
        const BASE = "https://vevericka-match-service.herokuapp.com";
        const URL = `${BASE}/user/${this.username}/recommendations`
        const response = await fetch(URL);
        const {matches} = await response.json();
        this.recommendations = await this.getUsersFromUsernames(matches);

        if (this.recommendations.length > 0) {
          const arr = [];

          for (let i = 0; i < 5; i++) {
            const tmp = []

            for (let j = 0; j < 6; j++) {
              if (this.recommendations[i * 6 + j]) {
                tmp.push(this.recommendations[i * 6 + j])
              }
            }

            arr.push(tmp)
          }

          this.recommendations = arr;
        }
        this.isLoading = false;
      },

      async getUsersFromUsernames(list) {
        const BASE = "https://user-info-service.herokuapp.com";
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({list}),
        };

        const URL = `${BASE}/user/get_all_by_username/`;
        const response = await fetch(URL, requestOptions);
        const {users} = await response.json();

        return users;
      },
    },
    mounted() {
      this.fetchUser();
      this.fetchRecommendations();
    },
    computed: {
      username() {
        return this.$store.state.user.username;
      }
    }
  };
</script>

<style scoped>
  .recommendation-title {
    background-color: #E64A19;
    color: white;
  }

  a {
    text-decoration: none;
  }
</style>
