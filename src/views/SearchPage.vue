<template>
  <v-app>
    <Navbar />

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" class="mx-auto">
            <v-text-field
              v-model="searchTerm"
              append-outer-icon="mdi-magnify"
              outlined
              color="#dd2c00"
              label="Search"
              type="text"
              @click:append-outer="search"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div v-show="showLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </div>

    <v-container v-show="!showLoading && error" class="py-3 text-center">
      <v-col cols="12" sm="8" class="mx-auto">
        <v-alert color="red" dense outlined type="error"> {{ error }} </v-alert>
      </v-col>
    </v-container>

    <v-container v-show="!showLoading && !error" class="py-3">
      <v-col
        cols="12"
        sm="8"
        class="mx-auto"
        v-for="(result, idx) in searchResults"
        :key="idx"
      >
        <router-link :to="`/user/${result.username}`">
          <UserCard :user="result" style="card-style" />
        </router-link>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";

export default {
  name: "SearchPage",
  components: { Navbar, UserCard },
  data: () => ({
    searchTerm: "",
    showLoading: false,
    error: "",
    searchResults: [],
  }),
  methods: {
    async search() {
      this.showLoading = true;
      const CORS = "https://cors-anywhere.herokuapp.com";
      const BASE = "https://user-info-service.herokuapp.com/user";
      const URL = `${CORS}/${BASE}/q?searchTerm=${this.searchTerm}`;
      const response = await fetch(URL);
      const data = await response.json();

      this.showLoading = false;

      if (!data.users) {
        this.error = "User not found";
        return;
      }

      if (data.users.length == 0) {
        this.searchResults = [];
        this.error = "User not found";
        return;
      }

      this.searchResults = data.users;
      this.error = "";
      this.searchTerm = "";
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    window.location.reload();
  },
};
</script>

<style scoped>
.card-style {
  cursor: pointer;
}
</style>