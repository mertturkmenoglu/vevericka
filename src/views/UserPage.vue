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
          :toggleFollowers="toggleFollowers"
          :toggleFollowing="toggleFollowing"
          :edit="edit"
          :follow="follow"
          :unfollow="unfollow"
          :sendMessage="sendMessage"/>

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

    <UserListDialog v-if="showFollowers" :title="$t('user_page.followers')" :list="followers"
                    :onItemClick="toggleFollowers"/>
    <UserListDialog v-if="showFollowing" :title="$t('user_page.following')" :list="following"
                    :onItemClick="toggleFollowing"/>

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

<script>
import UserHeader from "@/components/User/UserHeader";
import UserInfo from "@/components/User/UserInfo";
import UserListDialog from "@/components/User/UserListDialog";
import {router} from "@/router";
import UserFeatures from "../components/User/UserFeatures";
import UserLanguages from "../components/User/UserLanguages";
import UserWishToSpeak from "../components/User/UserWishToSpeak";
import UserHobbies from "@/components/User/UserHobbies"
import UserFeed from "@/components/Post/UserFeed";

export default {
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
  props: ["username"],
  data: () => ({
    user: {followers: [], following: [], bio: ""},
    followers: [],
    following: [],
    showFollowers: false,
    showFollowing: false,
    posts: [],
    BASE_URL: "https://user-info-service.herokuapp.com/user",
    snackbar: false,
    snackbarMessage: "",
    loading: true,
    userNotFound: false,
  }),
  methods: {
    async fetchUser() {
      const username = this.$route.params.username;
      const URL = `${this.BASE_URL}/username/${username}`;
      const response = await fetch(URL);
      const data = await response.json();

      // No User
      if (!data.user || data.user.length <= 0) {
        this.userNotFound = true;
        return;
      }

      this.user = data.user[0];

      if (this.user.followers.length > 0) {
        this.followers = await this.getUsersFromUsernames(this.user.followers);
      }

      if (this.user.following.length > 0) {
        this.following = await this.getUsersFromUsernames(this.user.following);
      }
    },
    async fetchPosts() {
      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/post/user/${this.user.username}`;
      const response = await fetch(URL);
      const {data} = await response.json();
      this.posts = data;
    },
    async getUsersFromUsernames(list) {
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({list}),
      };

      const URL = `${this.BASE_URL}/get_all_by_username/`;
      const response = await fetch(URL, requestOptions);
      const {users} = await response.json();

      return users;
    },
    linkCopied() {
      this.snackbarMessage = this.$t('user_page.snackbar.message');
      this.snackbar = true;
    },
    sendMessage() {
      router.push("/messages");
    },
    edit() {
      router.push("/settings");
    },
    async follow() {
      const thisUsername = this.$store.state.user.username;
      const otherUsername = this.user.username;
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({thisUsername, otherUsername}),
      };

      const URL = `${this.BASE_URL}/follow/`;
      const response = await fetch(URL, requestOptions);
      const data = await response.json();

      if (data['status_code']) return;

      this.user.followers.push(this.$store.state.user.username);
      window.location.reload();
    },
    async unfollow() {
      const thisUsername = this.$store.state.user.username;
      const otherUsername = this.user.username;
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({thisUsername, otherUsername}),
      };

      const URL = `${this.BASE_URL}/unfollow/`;
      const response = await fetch(URL, requestOptions);
      const data = await response.json();

      if (data['status_code']) return;

      this.user.followers = this.user.followers.filter(
          (u) => u === this.$store.state.user.username
      );

      window.location.reload();
    },
    toggleFollowers() {
      this.showFollowers = !this.showFollowers;
    },
    toggleFollowing() {
      this.showFollowing = !this.showFollowing;
    },
    routeFollowers(e) {
      this.toggleFollowers();
      router.push(`/user/${e.target.innerText}`);
    },
  },
  beforeMount() {
    this.fetchUser().then(() => {
      this.fetchPosts().then(() => {
        this.loading = false;
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    window.location.reload();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
