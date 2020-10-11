<template>
  <v-card class="pl-5 pt-5" min-height="70vh">
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
      <v-icon class="mr-2" large color="deep-orange accent-4"> mdi-web </v-icon>
      <a class="my-1" :href="user.website">{{ user.website }}</a>
    </v-row>
    <v-row v-if="user.twitter" :class="userInfo">
      <v-icon class="mr-2" large color="deep-orange accent-4">
        mdi-twitter
      </v-icon>
      <a class="my-1" :href="twitterLink">@{{ user.twitter }}</a>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-row class="ml-2 bio-header text-h3"> Bio </v-row>
    <v-container class="bio-content">
      <v-row class="mx-5 py-3 text-body-1 text-justify bio-content">
        {{ user.bio }}
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["user"],
  data: () => ({
    userInfo: "text-body-1 black--text mx-auto mt-2",
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
.bio-header {
  color: #dd2c00;
}
.bio-content {
  overflow: auto;
}
</style>