<template>
  <v-card flat outlined>
    <v-card-title>
      <v-row>
        <v-col>
          <v-row justify="space-around">
            <v-avatar size="96">
              <v-img
                  class="rounded-circle"
                  :src="user.image"
                  contain
                  width="12"
                  aspect-ratio="1"
                  alt="Profile"/>
            </v-avatar>
          </v-row>
          <v-row justify="space-around" class="mt-5">
            <div class="font-weight-light text-h5">{{ user.name }}</div>
          </v-row>
          <v-row justify="space-around">
            <div class="font-weight-thin">@{{ user.username }}</div>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row justify="center" class="text-center">
        <div class="font-weight-light em-12">{{ user.bio }}</div>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col>
          <v-row justify="space-around">
            <v-spacer></v-spacer>
            <v-btn text color="deep-orange text--darken-2" class="font-weight-light" @click="toggleFollowers">
              {{ user.followers.length }} {{ $t('user.header.followers') }}
            </v-btn>
            <v-btn text color="deep-orange text--darken-2" class="font-weight-light" @click="toggleFollowing">
              {{ user.following.length }} {{ $t('user.header.following') }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row justify="space-around" class="mt-5">
            <UserActions :user="user" :edit="edit" :follow="follow" :unfollow="unfollow"
                         :sendMessage="sendMessage"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

import UserActions from "@/components/User/UserActions";

export default {
  name: "UserHeader",
  components: {UserActions},
  props: [
    "user",
    "toggleFollowers",
    "toggleFollowing",
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
};
</script>

<style scoped>
.em-12 {
  font-size: 1.2em;
}

.em-08 {
  font-size: .8em;
}
</style>
