<template>
  <v-container>
    <div v-if="loading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange"/>
    </div>
    <div v-if="userNotFound && !loading">
      <h1 class="font-weight-light text-center">
        {{ $t('user_page.invalid_username.no_user_found') }}:
        <span class="deep-orange--text">{{ $route.params.username }}</span>
      </h1>
      <router-link to="/">
        <h1 class="font-weight-light deep-orange--text text-center">
          {{ $t('user_page.invalid_username.redirect_home') }}
        </h1>
      </router-link>
    </div>
    <v-card v-if="!userNotFound && !loading" flat>
      <UserHeader
          :user="user"
          @toggle-followers="toggleFollowers"
          @toggle-following="toggleFollowing"
          @edit-user="edit"
          @follow-user="follow"
          @unfollow-user="unfollow"
          @send-message="sendMessage" />

      <v-tabs color="deep-orange text--darken-2" class="mt-3" fixed-tabs>
        <v-tab>
          {{ $t('user_page.tabs.posts') }}
        </v-tab>
        <v-tab>
          {{ $t('user_page.tabs.info') }}
        </v-tab>
        <v-tab>
          {{ $t('user_page.tabs.social') }}
        </v-tab>
        <v-tab>
          {{ $t('user_page.tabs.languages') }}
        </v-tab>

        <v-tab-item>
          <v-container>
            <v-col cols="12" sm="8" class="mx-auto">
              <UserFeed :feed="posts" class="mt-8" @shareLinkCopied="linkCopied"/>
            </v-col>

            <div v-show="loading" class="py-3 text-center">
              <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
            </div>

            <div v-if="!loading && posts.length === 0" class="text-center font-weight-light">
              {{ $t('user_page.no_post') }}
            </div>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <v-row>
              <v-col>
                <UserInfo :user="user"/>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <UserFeatures :user="user"/>
              </v-col>
              <v-col cols="12" md="6">
                <UserHobbies :user="user"/>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <UserLanguages :user="user"/>
              </v-col>
              <v-col cols="12" md="6">
                <UserWishToSpeak :user="user"/>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>

    <UserListDialog
        v-if="showFollowers"
        :title="$t('user_page.followers')"
        :list="user.followers"
        :onItemClick="toggleFollowers" />
    <UserListDialog
        v-if="showFollowing"
        :title="$t('user_page.following')"
        :list="user.following"
        :onItemClick="toggleFollowing" />

    <v-snackbar v-model="snackbar" bottom right>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          {{ $t('user_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserHeader from "@/components/User/UserHeader.vue";
import UserInfo from "@/components/User/UserInfo.vue";
import UserListDialog from "@/components/User/UserListDialog.vue";
import {router} from "@/router";
import UserFeatures from "../components/User/UserFeatures.vue";
import UserLanguages from "../components/User/UserLanguages.vue";
import UserWishToSpeak from "../components/User/UserWishToSpeak.vue";
import UserHobbies from "@/components/User/UserHobbies.vue";
import UserFeed from "@/components/Post/UserFeed.vue";
import {Component} from "vue-property-decorator";
import UserService from "@/api/user";
import PostService from "@/api/post";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";

@Component({
  name: "UserPage",
  components: {
    UserHobbies,
    UserWishToSpeak,
    UserLanguages,
    UserFeatures,
    UserHeader,
    UserInfo,
    UserListDialog,
    UserFeed,
  },
})
export default class UserPage extends Vue {
  user!: IUser
  showFollowers: boolean = false
  showFollowing: boolean = false
  posts: IPost[] = []
  snackbar: boolean = false
  snackbarMessage: string = ''
  loading: boolean = true
  userNotFound: boolean = false

  mounted() {
    this.fetchUser();
  }

  beforeRouteUpdate(_to: any, _from: any, next: any) {
    next();
    window.location.reload();
  }

  get username(): string {
    return this.$route.params.username;
  }

  async fetchUser() {
    try {
      this.user = await UserService.getUserByUsername(this.username);
      await this.fetchPosts();
      this.loading = false;
      this.userNotFound = false;
    } catch (e) {
      console.error(e)
      this.loading = false;
      this.userNotFound = true;
    }
  }

  async fetchPosts() {
    try {
      this.posts = await PostService.getUserPosts(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  linkCopied() {
    this.snackbarMessage = this.$t('user_page.snackbar.message').toString();
    this.snackbar = true;
  }

  sendMessage() {
    router.push("/messages");
  }

  edit() {
    router.push("/settings");
  }

  async follow() {
    const thisUsername = this.$store.state.user.username;
    const otherUsername = this.user?.username;

    if (!otherUsername || !thisUsername)  {
      return;
    }

    try {
      await UserService.followUser(thisUsername, otherUsername)
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  async unfollow() {
    const thisUsername = this.$store.state.user.username;
    const otherUsername = this.user?.username;

    if (!otherUsername || !thisUsername) {
      return;
    }

    try {
      await UserService.unfollowUser(thisUsername, otherUsername)
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  }

  toggleFollowers() {
    this.showFollowers = !this.showFollowers;
  }

  toggleFollowing() {
    this.showFollowing = !this.showFollowing;
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
