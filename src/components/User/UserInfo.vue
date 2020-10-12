<template>
  <v-card>
    <v-card-title class="card-title">Information</v-card-title>
    <v-container>
    <v-row v-if="user.bdate" class="text-body-1 black--text mx-auto mt-2 pl-2">

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
      <v-icon class="mr-2" large color="deep-orange accent-4"> mdi-web </v-icon>
      <a class="my-1" :href="user.website">{{ user.website }}</a>
    </v-row>
    <v-row v-if="user.twitter" :class="userInfo">
      <v-icon class="mr-2" large color="deep-orange accent-4">
        mdi-twitter
      </v-icon>
      <a class="my-1" :href="twitterLink">@{{ user.twitter }}</a>
    </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["user"],
  data: () => ({
    userInfo: "text-body-1 black--text mx-auto mt-2 pl-2",
  }),
  computed: {
    twitterLink() {
      return this.user.twitter
        ? `https://twitter.com/${this.user.twitter}`
        : "/";
    },
  },
};
</script>

<style>
  .card-title {
    color: white;
    background-color: #dd2c00;
  }
</style>
