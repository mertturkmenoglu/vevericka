<template>
  <v-app>
    <v-app-bar app color="blue-grey lighten-5" v-if="showNavbar">
      <router-link to="/" class="text-decoration-none deep-orange--text text--darken-2">
        <v-toolbar-title>Vevericka</v-toolbar-title>
      </router-link>

      <v-row justify="end">
        <v-col cols="12" sm="4">
          <v-text-field
              v-model="searchTerm"
              append-icon="mdi-magnify"
              @click:append="search"
              @keyup.enter.native="search"
              class="mt-6 hidden-sm-and-down"
              solo
              flat
              dense
              label="Search"
              type="text"
          />
        </v-col>
      </v-row>

      <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
        <v-btn icon width="48" height="24" class="ml-2">
          <v-avatar class="border-white hvr">
            <v-img
                class="rounded-circle mx-auto"
                :src="imgURL"
                contain
                width="12"
                aspect-ratio="1"
                alt="Profile"/>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/search">
        <v-btn icon color="white" class="ml-2 hidden-md-and-up">
          <v-avatar color="blue-grey lighten-4" class="border-white hvr">
            <v-icon>mdi-magnify</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/messages">
        <v-btn icon color="white" class="ml-2">
          <v-avatar color="blue-grey lighten-4" class="border-white hvr">
            <v-icon>mdi-android-messages</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="white" class="ml-2">
            <v-avatar color="blue-grey lighten-4" class="border-white hvr">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <router-link to="/settings" class="text-decoration-none black--text">
              <v-list-item-title>Settings</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
    <v-main class="body">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import {router} from "@/router";

  export default {
    name: "App",
    components: {},
    data: () => ({
      searchTerm: "",
      imgURL: '',
    }),
    mounted() {
      this.getImageURL();
    },
    updated() {
      if (this.imgURL === '') {
        this.getImageURL();
      }

      if (!this.showNavbar) {
        this.imgURL = '';
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
      async search() {
        if (this.searchTerm.length > 0) {
          this.$store.state.gSearchTerm = this.searchTerm;
          this.searchTerm = '';
          await router.push('/search');
        }
      },
      async getImageURL() {
        const username = this.$store.state.user.username;
        const BASE = "https://user-info-service.herokuapp.com";
        const URL = `${BASE}/user/username/${username}`;
        const response = await fetch(URL);
        const data = await response.json();
        const user = data.user[0];
        this.imgURL = user.image;
      },
    },
    computed: {
      showNavbar() {
        return !(
            this.$route.path === "/login" || this.$route.path === "/register" || this.$route.path === '/password'
        );
      },
    },
  };
</script>

<style scoped>
  .body {
    background-color: #f0f2f5;
  }

  .border-white {
    border: 2px solid rgba(255, 255, 255, 0.6) !important;
  }

  .hvr {
    transition: all 0.35s ease-out;
  }


  .hvr:hover {
    transform: scale(1.005);
    background-color: #B0BEC5 !important;
  }

  a {
    text-decoration: none;
  }
</style>
