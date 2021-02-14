<template>
  <v-container>
    <v-container>
      <v-col v-if="!isLoading" class="mx-auto" cols="12" sm="8">
        <CreatePost :user="user" @postCreated="postCreatedHandler" />
        <v-divider class="my-4"></v-divider>
        <UserFeed
            :feed="feed"
            @shareLinkCopied="shareLinkCopied"
            @shareDM="shareDM"
            @postSaved="postSaved"
            @postDeleted="postDeleted"
            @userUnfollowed="userUnfollowed"/>
      </v-col>
      <div v-else class="py-3 text-center">
        <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
      </div>
    </v-container>

    <v-fab-transition>
      <v-btn v-if="showFab" fab bottom small absolute fixed color="deep-orange" dark right class="mb-10" @click="scrollToTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-snackbar v-model="snackbar" bottom right>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          {{ $t('home_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import CreatePost from "@/components/Post/CreatePost.vue";
import UserFeed from "@/components/Post/UserFeed.vue";
import Vue from "vue";
import Component from "vue-class-component";
import UserInfoService from "@/api/UserInfoService";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";
import PostService from "@/api/PostService";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";

@Component({
  name: "Home",
  components: {CreatePost, UserFeed}
})
export default class HomePage extends Vue {
  user: IUser = ({} as IUser)
  feed: Array<IPost> = []
  isLoading = true
  snackbar = false
  showFab = false
  snackbarMessage = ""

  get username(): string {
    return this.$store.state.user.username;
  }

  created() {
    window.addEventListener("scroll", this.handleScroll);
  }

  mounted() {
    this.fetchUser().then( async () => {
      await this.fetchFeed();
      this.isLoading = false;
    });
  }

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  async fetchUser() {
    const [user, err] = await UserInfoService.getUserByUsername(this.username);

    if (err === null && user !== null) {
      this.user = user;
    }
  }

  async fetchFeed() {
    const [feed, error] = await PostService.getFeedByUsername(this.username);

    if (error === null && feed !== null) {
      this.feed = feed;
    }
  }

  async postCreatedHandler() {
    this.feed = []
    this.isLoading = true;
    await this.fetchFeed();
    this.isLoading = false;
  }

  handleScroll() {
    this.showFab = window.scrollY > 0
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  shareLinkCopied() {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.post_link_copied').toString();
  }

  shareDM() {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.message_sent').toString();
  }

  postSaved() {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.saved').toString();
  }

  postDeleted() {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.post_deleted').toString();
  }

  userUnfollowed() {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.unfollowed').toString();
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
