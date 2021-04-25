<template>
  <v-container>
    <v-container>
      <v-col
        class="mx-auto"
        cols="12"
        sm="8"
      >
        <h2 class="font-weight-light">
          <v-icon
            x-large
            color="deep-orange"
          >
            mdi-bookmark
          </v-icon>
          {{ $t('bookmarks_page.title') }}
        </h2>
        <v-divider />
        <div
          v-for="(b, idx) in bookmarks"
          :key="idx"
        >
          <BookmarkCard
            :bookmark-id="b._id"
            :bookmark="b.postId"
            class="my-2"
            @bookmarkRemoved="bookmarkRemoved"
          />
        </div>
        <div
          v-if="!loading && bookmarks.length === 0"
          class="text-center mt-3"
        >
          <h2 class="font-weight-light">
            {{ $t('bookmarks_page.no_bookmark') }}
          </h2>
          <v-icon
            x-large
            color="deep-orange"
          >
            mdi-emoticon-sad-outline
          </v-icon>
        </div>
      </v-col>
    </v-container>

    <div
      v-show="loading"
      class="py-3 text-center"
    >
      <v-progress-circular
        indeterminate
        color="deep-orange"
      />
    </div>

    <v-snackbar
      v-model="snackbar"
      bottom
      right
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          {{ $t('bookmarks_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BookmarkCard from '@/components/Post/BookmarkCard.vue';
import {Component} from 'vue-property-decorator';
import IPost from '@/api/responses/IPost';
import BookmarkService from '@/api/bookmark';

@Component({
  components: {BookmarkCard},
})
export default class BookmarksPage extends Vue {
  loading = true
  bookmarks: IPost[] = []
  snackbar = false
  snackbarMessage = ''

  mounted(): void {
    this.refresh().then(() => {
      this.loading = false;
    });
  }

  async refresh(): Promise<void> {
    this.bookmarks = [];
    this.loading = true;
    await this.fetchBookmarks();
    this.loading = false;
  }

  async fetchBookmarks(): Promise<void> {
    try {
      const username: string = this.$store.state.user.username;
      this.bookmarks = await BookmarkService.getBookmarksByUsername(username);
    } catch (e) {
      console.error(e);
    }
  }

  async bookmarkRemoved(): Promise<void> {
    this.snackbar = true;
    this.snackbarMessage = this.$t('bookmarks_page.snackbar.message').toString();
    await this.refresh();
  }
}
</script>

<style scoped>

</style>
