<template>
  <v-card flat>
    <v-row v-if="!isProfile" justify="space-around">
      <div v-if="isFriend">
        <v-btn color="deep-orange text--darken-2" class="mx-2" outlined @click="sendMessage()">
          <v-icon class="ml-1">mdi-send-outline</v-icon>
        </v-btn>
        <v-btn color="deep-orange text--darken-2" class="mx-2" outlined @click="unfollow()">
          <v-icon class="ml-1">mdi-account-off</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="deep-orange text--darken-2" outlined @click="follow()">
          Follow
          <v-icon class="ml-2">mdi-account-plus</v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row v-else justify="space-around">
      <v-btn color="deep-orange text--darken-2" outlined dense @click="edit()">
        Edit Your Profile
        <v-icon right>mdi-account-edit-outline</v-icon>
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
