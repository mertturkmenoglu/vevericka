<template>
  <v-card  class="pt-5 pb-5" flat>
    <v-row v-if="!isProfile" justify="space-around">
      <div v-if="isFriend">
        <v-btn color="error" class="mx-2" outlined @click="sendMessage()">
          <v-icon class="ml-3">mdi-send-outline</v-icon>
        </v-btn>
        <v-btn color="error" class="mx-2" outlined @click="unfollow()">
          <v-icon class="ml-3">mdi-account-off</v-icon>
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
      <v-btn color="#dd2c00" outlined dense @click="edit()">
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
        return this.user.username == this.$store.state.user.username;
      },
      isFriend() {
        const thisUsername = this.$store.state.user.username;
        return this.user.followers.indexOf(thisUsername) !== -1;
      },
    },
  }
</script>

<style scoped>

</style>
