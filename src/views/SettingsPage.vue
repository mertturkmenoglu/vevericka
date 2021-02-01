<template>
  <v-container>
    <v-card flat>
      <v-toolbar flat color="deep-orange" dark dense>
        <v-toolbar-title class="font-weight-light">Settings</v-toolbar-title>
      </v-toolbar>
      <SettingsTabs v-if="loadingCompleted" :user="user"/>
    </v-card>
  </v-container>
</template>

<script>
import SettingsTabs from "@/components/Settings/SettingsTabs";
export default {
  name: "SettingsPage",
  components: {SettingsTabs},
  data: () => ({
    user: {location: {}, gender: "", wish_to_speak: []},
    loadingCompleted: false,
  }),
  methods: {
    async fetchUser() {
      const username = this.$store.state.user.username;
      const BASE = "https://user-info-service.herokuapp.com";
      const URL = `${BASE}/user/username/${username}`;

      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
      this.user.location = this.user.location
          ? this.user.location
          : {city: "", country: ""};
      this.loadingCompleted = true;
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style>
</style>
