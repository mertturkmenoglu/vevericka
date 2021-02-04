<template>
  <v-container>
    <v-container>
      <v-col class="mx-auto" cols="12" sm="8">
        <CreatePost :user="user" @postCreated="postCreatedHandler" />
        <v-divider class="my-4"></v-divider>
        <UserFeed
            :feed="feed"
            @shareLinkCopied="shareLinkCopied"
            @shareDM="shareDM"
            @postSaved="postSaved"
            @postReported="postReported"
            @postDeleted="postDeleted"
            @userUnfollowed="userUnfollowed"/>
      </v-col>
    </v-container>

    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
    </div>

    <v-fab-transition>
      <v-btn v-if="showFab" fab bottom small absolute fixed color="deep-orange" dark right class="mb-10" @click="scrollToTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-snackbar v-model="snackbar" bottom right>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import CreatePost from "@/components/Post/CreatePost";
import UserFeed from "@/components/Post/UserFeed";

export default {
  name: "Home",
  components: {CreatePost, UserFeed},
  data: () => ({
    user: {},
    feed: [],
    isLoading: true,
    snackbar: false,
    showFab: false,
    snackbarMessage: "",
  }),
  methods: {
    async fetchUser() {
      const BASE = "https://user-info-service.herokuapp.com";
      const URL = `${BASE}/user/username/${this.username}`;
      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
    },
    async fetchFeed() {
      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/post/feed/${this.username}`;
      const response = await fetch(URL);
      const { data } = await response.json();
      this.feed = data;
    },
    async postCreatedHandler() {
      this.feed = [];
      this.isLoading = true;
      await this.fetchFeed();
      this.isLoading = false;
    },
    handleScroll() {
       this.showFab = window.scrollY > 0
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    shareLinkCopied() {
      this.snackbar = true;
      this.snackbarMessage = "Post link copied to your clipboard";
    },
    shareDM() {
      this.snackbar = true;
      this.snackbarMessage = "shareDM";
    },
    postSaved() {
      this.snackbar = true;
      this.snackbarMessage = "postSaved";
    },
    postReported() {
      this.snackbar = true;
      this.snackbarMessage = "postReported";
    },
    postDeleted() {
      this.snackbar = true;
      this.snackbarMessage = "postDeleted";
    },
    userUnfollowed() {
      this.snackbar = true;
      this.snackbarMessage = "userUnfollowed";
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.fetchUser().then( async () => {
      await this.fetchFeed();
      this.isLoading = false;
    });
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
