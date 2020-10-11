<template>
  <v-card min-height="70vh">
    <v-row justify="center">
      <v-col cols="5">
        <v-img
          class="rounded-circle"
          :src="user.image"
          contain
          aspect-ratio="1"
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
        <v-row justify="center" class="py-5">
          <v-btn outlined class="mx-2 mt-2" @click="toggleFollowers">
            <v-chip color="white" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              {{ user.followers.length }} followers
            </v-chip>
          </v-btn>

          <v-btn outlined class="mx-2 mt-2" @click="toggleFollowing">
            <v-chip color="white" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              {{ user.following.length }} following
            </v-chip>
          </v-btn>
        </v-row>
        <v-row class="ml-n5 my-5">
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
      <v-btn color="#dd2c00" outlined dense @click="edit()">
        Edit Your Profile
        <v-icon right>mdi-account-edit-outline</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UserHeader",
  props: [
    "user",
    "toggleFollowers",
    "toggleFollowing",
    "edit",
    "follow",
    "unfollow",
    "sendMessage",
  ],
  data: () => ({}),
  computed: {
    isProfile() {
      return this.user.username == this.$store.state.user.username;
    },
    isFriend() {
      const thisUsername = this.$store.state.user.username;
      return this.user.followers.indexOf(thisUsername) != -1;
    },
  },
};
</script>

<style>
</style>