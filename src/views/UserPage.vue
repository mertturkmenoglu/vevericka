<template>
  <v-app>
    <Navbar />
    <v-card outlined elevation="2" class="mx-auto mt-5" max-width="800">
      <v-card-text>
        <v-row justify="center">
          <v-col cols="5">
            <v-img
              class="rounded-circle"
              :src="user.image"
              elevation="12"
              alt="User image"
              width="256"
            ></v-img>
          </v-col>
        </v-row>

        <v-row justify="center" class="text-center">
          <v-col cols="10">
            <v-row class="text-lg-h3 text-h4 black--text" justify="center">
              {{ user.name }}
            </v-row>
            <v-row class="text-h5" justify="center">@{{ user.username }}</v-row>
            <v-row justify="center" class="py-2">
              <router-link :to="followersLink">
                <v-chip color="white" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ user.followers.length }} followers
                </v-chip>
              </router-link>

              <router-link :to="followingLink">
                <v-chip color="white" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ user.following.length }} following
                </v-chip>
              </router-link>
            </v-row>
            <v-row class="ml-n5">
              <v-col>
                <v-chip
                  v-for="(feat, idx) in user.features"
                  :key="idx"
                  color="purple"
                  class="mr-2 mb-2"
                  outlined
                >
                  <v-icon left> mdi-fire </v-icon>
                  {{ feat }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-if="!isProfile" justify="space-around">
          <div v-if="isFriend">
            <v-btn color="error" class="mr-1" outlined @click="sendMessage()">
              <v-icon>mdi-send-outline</v-icon>
            </v-btn>
            <v-btn color="error" class="ml-1" outlined @click="unfollow()">
              <v-icon>mdi-account-off</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn color="error" outlined @click="follow()">
              Follow
              <v-icon right>mdi-account-plus</v-icon>
            </v-btn>
          </div>
        </v-row>
        <v-row v-else justify="space-around">
          <v-btn color="error" outlined dense @click="edit()">
            Edit Your Profile
            <v-icon right>mdi-account-edit-outline</v-icon>
          </v-btn>
        </v-row>

        <v-divider class="my-3" />

        <v-row v-if="user.bdate" class="text-body-1 black--text mx-auto mt-2">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-calendar
          </v-icon>
          <span class="my-1">
            {{ new Date(user.bdate).toLocaleDateString() }}
          </span>
        </v-row>
        <v-row v-if="user.location" :class="userInfo">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-map-marker
          </v-icon>
          <span class="my-1">{{ user.location.city }}</span>
        </v-row>
        <v-row v-if="user.job" :class="userInfo">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-account-tie
          </v-icon>
          <span class="my-1">{{ user.job }}</span>
        </v-row>
        <v-row v-if="user.school" :class="userInfo">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-school
          </v-icon>
          <span class="my-1">{{ user.school }}</span>
        </v-row>
        <v-row v-if="user.website" :class="userInfo">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-web
          </v-icon>
          <a class="my-1" :href="user.website">{{ user.website }}</a>
        </v-row>
        <v-row v-if="user.twitter" :class="userInfo">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-twitter
          </v-icon>
          <a class="my-1" :href="twitterLink">@{{ user.twitter }}</a>
        </v-row>
        <v-divider class="my-3" />
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header dark> Bio </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ user.bio }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-snackbar v-model="snackbar">
          {{ snackbarMsg }}
          <template v-slot:action="{ attrs }" timeout="3">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "UserPage",
  components: { Navbar },
  props: ["username"],
  data: () => ({
    user: {},
    snackbar: false,
    snackbarMsg: "",
    userInfo: "text-body-1 black--text mx-auto mt-2",
  }),
  methods: {
    async fetchUser() {
      const username = this.$route.params.username;
      const URL = `https://cors-anywhere.herokuapp.com/https://user-info-service.herokuapp.com/user/username/${username}`;
      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
      this.user.image = this.user.image
        ? this.user.image
        : "https://avatars1.githubusercontent.com/u/36300526?s=400&v=4";
    },
    sendMessage() {
      this.snackbarMsg = "Send Message clicked";
      this.snackbar = true;
    },
    edit() {
      this.snackbarMsg = "Edit Profile clicked";
      this.snackbar = true;
    },
    follow() {
      this.snackbarMsg = "Follow clicked";
      this.snackbar = true;
    },
    unfollow() {
      this.snackbarMsg = "Unfollow clicked";
      this.snackbar = true;
    },
  },
  mounted() {
    this.fetchUser().then(() => console.log("User load"));
  },
  computed: {
    isProfile() {
      return this.user.username == this.$store.state.user.username;
    },
    isFriend() {
      const thisUsername = this.$store.state.user.username;

      return this.user.followers.indexOf(thisUsername) != -1;
    },
    twitterLink() {
      if (this.user.twitter) {
        return `https://twitter.com/${this.user.twitter}`;
      }

      return "/";
    },
    followersLink() {
      if (this.user.username) {
        return `/${this.user.username}/followers`;
      }

      return "/";
    },
    followingLink() {
      if (this.user.username) {
        return `/${this.user.username}/following`;
      }

      return "/";
    },
  },
};
</script>

<style>
</style>