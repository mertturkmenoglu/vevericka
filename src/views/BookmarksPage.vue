<template>
  <v-container>
    <v-container>
      <v-col class="mx-auto" cols="12" sm="8">
        <h2 class="font-weight-light">
          <v-icon x-large color="deep-orange">mdi-bookmark</v-icon>
          {{ $t('bookmarks_page.title') }}
        </h2>
        <v-divider></v-divider>
        <div v-for="(post, idx) in posts" :key="idx">
          <BookmarkCard
              :post="post"
              :bookmark="bookmarks[idx]"
              class="my-2"
              @bookmarkRemoved="bookmarkRemoved"
          />
        </div>
        <div v-if="!loading && posts.length === 0" class="text-center mt-3">
          <h2 class="font-weight-light">
            {{ $t('bookmarks_page.no_bookmark') }}
          </h2>
          <v-icon x-large color="deep-orange">mdi-emoticon-sad-outline</v-icon>
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
          {{ $t('bookmarks_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BookmarkCard from "@/components/Post/BookmarkCard.vue";
import {Component} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import IBookmark from "@/api/responses/IBookmark";
import PostService from "@/api/PostService";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";

@Component({
  name: "BookmarksPage",
  components: {BookmarkCard},
})
export default class BookmarksPage extends Vue {
  loading: boolean = true
  bookmarks: Array<IBookmark> = []
  posts: Array<IPost> = []
  snackbar: boolean = false
  snackbarMessage: string = ""

  mounted() {
    this.refresh().then(() => {
      this.loading = false;
    });
  }

  async refresh() {
    this.bookmarks = []
    this.posts = []
    this.loading = true
    await this.fetchBookmarks()
    await this.fetchPosts()
    this.loading = false
  }

  async fetchBookmarks() {
    const username = this.$store.state.user.username
    const [data, err] = await PostService.getBookmarksByUsername(username)

    if (err === null && data !== null) {
      this.bookmarks = data;
    }
  }

  async fetchPosts() {
    for (let b of this.bookmarks) {
      const [result, err] = await PostService.getPostById(b.postId)
      if (err === null && result !== null) {
        this.posts.push(result)
      }
    }
  }

  async bookmarkRemoved() {
    this.snackbar = true
    this.snackbarMessage = this.$t('bookmarks_page.snackbar.message').toString()
    await this.refresh()
  }
}
</script>

<style scoped>

</style>