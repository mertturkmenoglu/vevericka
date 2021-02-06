<template>
  <v-card flat>
    <v-row v-if="!isProfile" justify="space-around">
      <div v-if="isFriend">
        <v-btn color="deep-orange text--darken-2" class="mx-2" outlined @click="unfollow()">
          <v-icon class="ml-1" left>mdi-account-off</v-icon>
          <span class="em-08">{{ $t('user.actions.unfollow') }}</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="deep-orange text--darken-2" outlined @click="follow()">
          <v-icon class="ml-1" left>mdi-account-plus</v-icon>
          <span class="em-08">{{ $t('user.actions.follow') }}</span>
        </v-btn>
      </div>
    </v-row>
    <v-row v-else justify="space-around">
      <v-btn color="deep-orange text--darken-2" outlined dense @click="edit()">
        <v-icon left>mdi-account-edit-outline</v-icon>
        <span class="em-08">{{ $t('user.actions.edit_profile') }}</span>
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
.em-08 {
  font-size: .8em;
}
</style>
