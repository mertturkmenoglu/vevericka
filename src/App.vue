<template>
  <v-app>
    <v-app-bar app color="white" v-if="showNavbar" flat short elevate-on-scroll class="custom-app-bar">
      <router-link to="/" class="text-decoration-none">
        <v-img
            class="mx-4"
            src="./assets/icon_primary.svg"
            max-height="32"
            max-width="32"
            contain
        />
      </router-link>

      <router-link to="/" class="text-decoration-none deep-orange--text text--darken-2">
        <v-toolbar-title class="font-weight-light">Vevericka</v-toolbar-title>
      </router-link>

      <v-row justify="end" class="mr-1">
        <v-col cols="12" sm="3">
          <v-text-field
              v-model="searchTerm"
              background-color="#f0f2f5"
              append-icon="mdi-magnify"
              color="deep-orange text--darken-2"
              @click:append="search"
              @keyup.enter.native="search"
              class="mt-6 hidden-sm-and-down"
              flat
              rounded
              dense
              clearable
              :prefix="isAppBarSearchFocused ? '@' : ''"
              @focusin="isAppBarSearchFocused = true"
              @focusout="isAppBarSearchFocused = false"
              single-line
              solo
              label="Search"
              type="text"
          />
        </v-col>
      </v-row>

      <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
        <v-btn icon width="40" height="40">
          <v-avatar size="40">
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
        <v-btn icon color="white" class="hidden-md-and-up">
          <v-avatar class="ml-1">
            <v-icon color="deep-orange text--darken-2" size="32">mdi-magnify</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/messages">
        <v-btn icon color="#f0f2f5">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange text--darken-2" size="32">mdi-android-messages</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="40">
              <v-icon color="deep-orange text--darken-2" size="32">mdi-dots-vertical</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <router-link to="/settings" class="text-decoration-none black--text">
              <v-list-item-title>Settings</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/" class="text-decoration-none black--text">
              <v-list-item-title>Help</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/" class="text-decoration-none black--text">
              <v-list-item-title>Contact</v-list-item-title>
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
    isAppBarSearchFocused: false
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
  background-color: white;
}

.custom-app-bar {
  border-bottom: 1px solid #E64A19 !important;
}

a {
  text-decoration: none;
}
</style>
