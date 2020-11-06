<template>
  <v-container>
    <v-card class="mx-auto custom-width">
      <v-col>
        <v-text-field
            v-model="searchStr"
            append-outer-icon="mdi-magnify"
            outlined
            class="pt-5"
            color="#dd2c00"
            label="Search"
            type="text"
            @click:append-outer="search"/>
      </v-col>
    </v-card>

    <div v-show="showLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </div>

    <v-container v-show="!showLoading && error" class="py-3 text-center">
      <v-col cols="12" sm="8" class="mx-auto">
        <v-alert color="red" dense outlined type="error"> {{ error }}</v-alert>
      </v-col>
    </v-container>

    <v-card v-for="(result, idx) in searchResults" :key="idx" outlined class="mx-auto my-5 custom-width">
      <router-link :to="`/user/${result.username}`">
        <UserCard :user="result" class="card-style"/>
      </router-link>
    </v-card>
  </v-container>
</template>

<script>
  import UserCard from "@/components/UserCard";

  export default {
    name: "SearchPage",
    components: { UserCard },
    data: () => ({
      searchStr: "",
      showLoading: false,
      error: "",
      searchResults: [],
    }),
    mounted() {
      this.searchStr = this.$store.state.gSearchTerm || '';

      if (this.searchStr.length > 0) {
        this.search();
      }
    },
    methods: {
      async search() {
        if (this.searchStr === "") {
          return
        }

        this.showLoading = true;
        const BASE = "https://user-info-service.herokuapp.com/user";
        const URL = `${BASE}/q?searchTerm=${this.searchStr}`;
        const response = await fetch(URL);
        const data = await response.json();

        this.showLoading = false;

        if (!data.users) {
          this.error = "User not found";
          return;
        }

        if (data.users.length === 0) {
          this.searchResults = [];
          this.error = "User not found";
          return;
        }

        this.searchResults = data.users;
        this.error = "";
        this.searchStr = "";
        this.$store.state.gSearchTerm = "";
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

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 600px) {
    .custom-width {
      width: 96vw;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 768px) {
    .custom-width {
      width: 90vw;
    }
  }

  @media screen and (min-width: 768px) {
    .custom-width {
      max-width: 60vw;
    }
  }
</style>
