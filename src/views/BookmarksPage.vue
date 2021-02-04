<template>
  <v-container>
    <v-container>
      <v-col class="mx-auto" cols="12" sm="8">
        <div v-for="(post, idx) in posts" :key="idx">
          <BookmarkCard
              :post="post"
              :bookmark="bookmarks[idx]"
              class="my-2"
              @bookmarkRemoved="bookmarkRemoved"
          />
        </div>
      </v-col>
    </v-container>

    <div v-show="loading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange"/>
    </div>

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
import BookmarkCard from "@/components/Post/BookmarkCard";

export default {
  name: "SavedPostsPage",
  components: {BookmarkCard},
  data: () => ({
    loading: true,
    bookmarks: [],
    posts: [],
    snackbar: false,
    snackbarMessage: "",
  }),
  mounted() {
    this.refresh().then(() => {
      this.loading = false;
    });
  },
  methods: {
    async refresh() {
      this.bookmarks = [];
      this.posts = [];
      this.loading = true;
      await this.fetchBookmarks();
      await this.fetchPosts();
      this.loading = false;
    },
    async fetchBookmarks() {
      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/bookmark/user/${this.$store.state.user.username}`;
      const response = await fetch(URL);
      const { data } = await response.json();
      this.bookmarks = data;
    },
    async fetchPosts() {
      const BASE = "https://vevericka-post-service.herokuapp.com";
      for (let b of this.bookmarks) {
        const URL = `${BASE}/post/${b.postId}`;
        const response = await fetch(URL);
        const { data } = await response.json();
        this.posts.push(data);
      }
      console.log(this.bookmarks)
    },
    async bookmarkRemoved() {
      this.snackbar = true;
      this.snackbarMessage = "Bookmark removed";
      await this.refresh();
    },
  }
}
</script>

<style scoped>

</style>