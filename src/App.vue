<template>
  <v-app>
    <v-app-bar app color="white" v-if="showNavbar" flat short elevate-on-scroll>
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
        <v-toolbar-title class="font-weight-light hidden-xs-only text-h5">Vevericka</v-toolbar-title>
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

      <router-link to="/explore">
        <v-btn icon color="#f0f2f5">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange text--darken-2" size="32">mdi-pound</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/notifications">
        <v-btn icon color="deep-orange">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange" size="32">mdi-bell-outline</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/bookmarks">
        <v-btn icon color="deep-orange">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange" size="32">mdi-bookmark-outline</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <router-link to="/messages">
        <v-btn icon color="#f0f2f5">
          <v-avatar class="ml-1" size="40">
            <v-icon color="deep-orange text--darken-2" size="32">mdi-email-outline</v-icon>
          </v-avatar>
        </v-btn>
      </router-link>

      <v-menu left bottom nudge-left="24" nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="40">
              <v-icon color="deep-orange text--darken-2" size="32">mdi-chevron-down</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list flat class="text-decoration-none font-weight-light" dense>
          <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="40">
                  <v-img
                      class="rounded-circle mx-auto"
                      :src="imgURL"
                      contain
                      width="12"
                      aspect-ratio="1"
                      alt="Profile"/>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="deep-orange--text">@{{ this.$store.state.user.username.substr(0, 20) }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <span class="text-caption font-weight-light">View your profile</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>

          <router-link to="/settings">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item disabled>
            <v-list-item-icon>
              <v-icon disabled color="deep-orange">mdi-brightness-6</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dark theme</v-list-item-title>
              <v-list-item-subtitle>Unavailable</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-checkbox disabled color="deep-orange" :input-value="isDarkModeEnabled"/>
            </v-list-item-action>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <router-link to="/help">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-help-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Help</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/contact">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-at</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Contact</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/report">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-flag-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Report</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/terms">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-book-open-blank-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Terms</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/privacy">
            <v-list-item disabled>
              <v-list-item-icon>
                <v-icon disabled color="deep-orange">mdi-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Privacy</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-divider></v-divider>

          <a :href="statusServiceUrl">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-orange">mdi-thermostat</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Status</v-list-item-title>
                <v-list-item-subtitle>View service status</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="em-08">Vevericka  &copy; 2021</v-list-item-subtitle>
            </v-list-item-content>
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
    isAppBarSearchFocused: false,
    isDarkModeEnabled: false,
    statusServiceUrl: "https://veverickastatus.surge.sh/"
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
      const publicPages = [
        '/login',
        '/register',
        '/password',
        '/terms'
      ]

      for (let page of publicPages) {
        if (this.$route.path === page) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>

<style scoped>
.body {
  background-color: white;
}

a {
  text-decoration: none;
}

.em-08 {
  font-size: 0.7em !important;
}
</style>
