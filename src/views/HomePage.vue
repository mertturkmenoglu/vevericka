<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="0"
        lg="2"
      />

      <v-col
        v-if="!isLoading"
        cols="12"
        md="6"
      >
        <MainColumn
          :user="user"
          :feed="feed"
          @post-created="postCreatedHandler"
          @show-snackbar="showSnackbar"
        />
      </v-col>
      <v-col
        v-else
        class="py-3 text-center"
      >
        <v-progress-circular
          indeterminate
          color="deep-orange"
        />
      </v-col>

      <v-col
        cols="0"
        md="3"
        class="mx-auto"
      >
        <ExploreCard />
      </v-col>
    </v-row>

    <HomeScrollTopFab />

    <HomeSnackbar
      :show="snackbar"
      :message="snackbarMessage"
      @close-snackbar="snackbar = false"
    />
  </v-container>
</template>

<script lang="ts">
import CreatePost from '@/components/Post/CreatePost.vue';
import UserFeed from '@/components/Post/UserFeed.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import IUser from '@/api/responses/IUser';
import PostService from '@/api/post';
import IPost from '@/api/responses/IPost';
import UserService from '@/api/user';
import ExploreCard from '@/components/Home/ExploreCard.vue';
import HomeScrollTopFab from '@/components/Home/HomeScrollTopFab.vue';
import HomeSnackbar from '@/components/Home/HomeSnackbar.vue';

import MainColumn from '@/components/Home/MainColumn.vue';

@Component({
  components: {MainColumn, HomeSnackbar, HomeScrollTopFab, ExploreCard, CreatePost, UserFeed},
})
export default class HomePage extends Vue {
  user?: IUser = undefined
  feed: IPost[] = []
  isLoading = true
  snackbar = false
  snackbarMessage = ''

  get username(): string {
    return this.$store.state.user.username;
  }

  mounted(): void {
    this.fetchUser().then(async () => {
      await this.fetchFeed();
      this.isLoading = false;
    });
  }

  async fetchUser(): Promise<void> {
    try {
      this.user = await UserService.getUserByUsername(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchFeed(): Promise<void> {
    try {
      this.feed = await PostService.getFeedByUsername(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  async postCreatedHandler(): Promise<void> {
    this.feed = [];
    this.isLoading = true;
    await this.fetchFeed();
    this.isLoading = false;
  }

  showSnackbar(message: string): void {
    this.snackbar = true;
    this.snackbarMessage = message;
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
