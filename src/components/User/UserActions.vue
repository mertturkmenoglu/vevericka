<template>
  <v-card flat>
    <v-row v-if="!isProfile" justify="space-around">
      <div v-if="isFriend">
        <v-btn color="deep-orange text--darken-2" class="mx-2" outlined @click="unfollow()">
          <v-icon class="ml-1" left>mdi-account-off</v-icon>
          <span>Unfollow</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="deep-orange text--darken-2" outlined @click="follow()">
          <v-icon class="ml-1" left>mdi-account-plus</v-icon>
          Follow
        </v-btn>
      </div>
    </v-row>
    <v-row v-else justify="space-around">
      <v-btn color="deep-orange text--darken-2" outlined dense @click="edit()">
        <v-icon left>mdi-account-edit-outline</v-icon>
        Edit Your Profile
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "UserActions",
    props: [
      "user",
      "edit",
      "follow",
      "unfollow",
      "sendMessage",
    ],
    computed: {
      isProfile() {
        return this.user.username === this.$store.state.user.username;
      },
      isFriend() {
        return this.user.followers.indexOf(this.$store.state.user.username) !== -1;
      },
    },
  }
</script>

<style scoped>

</style>
