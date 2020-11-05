<template>
  <v-app>
    <v-app-bar dark app color="red darken-3" v-if="showNavbar">
      <router-link to="/" class="text-decoration-none white--text">
        <v-toolbar-title>Vevericka</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <router-link :to="{ name: 'UserPage', params: { username: this.$store.state.user.username } }">
        <v-btn icon>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/search">
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/messages">
        <v-btn icon>
          <v-icon>mdi-android-messages</v-icon>
        </v-btn>
      </router-link>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
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
  export default {
    name: "App",
    components: {},
    methods: {
      logout() {
        this.$store.dispatch("logout");
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

  a {
    text-decoration: none;
  }
</style>
