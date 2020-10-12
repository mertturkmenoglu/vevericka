<template>
  <v-card>
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
      </v-col>
    </v-row>
    <UserActions :user="user" :edit="edit" class="mt-5" :follow="follow" :unfollow="unfollow"
                 :sendMessage="sendMessage"/>
  </v-card>
</template>

<script>
import UserActions from "./UserActions";
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
};
</script>

<style>
</style>
