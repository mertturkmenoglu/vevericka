<template>
  <v-app>
    <Navbar />
    <v-card outlined elevation="2" class="mx-auto mt-5" max-width="800">
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-img
              class="rounded-circle"
              :src="user.image"
              elevation="12"
              alt="User image"
              width="180"
            ></v-img>
          </v-col>
          <v-col cols="9" class="text-left">
            <v-row class="text-lg-h3 text-h4">{{ user.name }}</v-row>
            <v-row class="text-h5">@{{ user.username }}</v-row>
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

        <v-row justify="space-between" class="ml-2">
          <v-col cols="3" class="text-body-1">
            <v-row class="black--text mt-1">
              <router-link to="/">
                <v-chip color="primary" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ user.followers.length }} followers
                </v-chip>
              </router-link>
            </v-row>
            <v-row class="black--text mt-1">
              <router-link to="/">
                <v-chip color="primary" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  {{ user.following.length }} following
                </v-chip>
              </router-link>
            </v-row>
          </v-col>
          <v-col cols="6" v-if="!isProfile">
            <div v-if="isFriend" class="px-3">
              <v-btn
                color="error"
                elevation="2"
                outlined
                @click="sendMessage()"
              >
                <v-icon>mdi-send-outline</v-icon>
              </v-btn>
              <v-btn
                color="error"
                elevation="2"
                outlined
                @click="isFriend = !isFriend"
              >
                <v-icon>mdi-account-off</v-icon>
              </v-btn>
            </div>
            <v-row v-if="!isFriend" justify="center">
              <v-btn
                color="error"
                elevation="2"
                outlined
                class="mr-3"
                @click="isFriend = !isFriend"
              >
                Follow
                <v-icon right>mdi-account-plus</v-icon>
              </v-btn>
            </v-row>
          </v-col>
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
        <v-row
          v-if="user.location"
          class="text-body-1 black--text mx-auto mt-2"
        >
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-map-marker
          </v-icon>
          <span class="my-1">{{ user.location.city }}</span>
        </v-row>
        <v-row v-if="user.job" class="text-body-1 black--text mx-auto mt-2">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-account-tie
          </v-icon>
          <span class="my-1">{{ user.job }}</span>
        </v-row>
        <v-row v-if="user.school" class="text-body-1 black--text mx-auto mt-2">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-school
          </v-icon>
          <span class="my-1">{{ user.school }}</span>
        </v-row>
        <v-row v-if="user.website" class="text-body-1 black--text mx-auto mt-2">
          <v-icon class="mr-2" large color="deep-orange accent-4">
            mdi-web
          </v-icon>
          <a class="my-1" :href="user.website">{{ user.website }}</a>
        </v-row>
        <v-row v-if="user.twitter" class="text-body-1 black--text mx-auto mt-2">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
  }),
  methods: {
    async fetchUser() {
      const username = this.$route.params.username;
      const URL = `https://cors-anywhere.herokuapp.com/https://user-info-service.herokuapp.com/user/username/${username}`;
      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
      console.log(this.user);
      this.user.image = "https://github.com/mertturkmenoglu.png";
    },
    sendMessage() {
      this.snackbarMsg = "Send Message clicked";
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