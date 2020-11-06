<template>
  <v-card flat>
    <v-card-title class="card-title">Information</v-card-title>
    <v-container>
    <v-row v-if="user.bdate" class="text-body-1 black--text mx-auto mt-2 pl-2">
      <v-icon class="mr-2" large color="deep-orange accent-4">
        mdi-calendar
      </v-icon>
      <span class="my-1">{{(new Date(user.bdate)).toLocaleDateString() }}</span>
    </v-row>
    <v-row v-if="locationExists" :class="userInfo">
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
      <v-row v-if="noInfo">
        <div class="text-h6 text-center font-weight-light mt-3">No Information</div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    user: {
      twitter: "",
      job: "",
      school: "",
      website: "",
      location: {
        city: "",
        country: "",
      }
    }
  },
  data: () => ({
    userInfo: "text-body-1 black--text mx-auto mt-2 pl-2",
  }),
  beforeMount() {
    if (!this.user.location) {
      this.user.location = {
        city: "",
        country: "",
      }
    }
  },
  computed: {
    twitterLink() {
      return this.user.twitter
        ? `https://twitter.com/${this.user.twitter}`
        : "/";
    },
    locationExists() {
      if (!this.user) return false;
      if (!this.user.location) {
        return false;
      }
      return (this.user?.location?.city?.length > 0)
    },
    noInfo() {
      return (!this.user.bdate && this.user.location.city.length <= 0 && !this.user.job && !this.user.school && !this.user.website && !this.user.twitter)
    }
  },
};
</script>

<style scoped>
  .card-title {
    color: white;
    background-color: #E64A19;
  }
</style>
