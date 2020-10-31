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
        <v-row class="text-lg-h3 text-h4 grey--text text--darken-2" justify="center">
          {{ user.name }}
        </v-row>
        <v-row class="text-h5 grey--text text--darken-1" justify="center">@{{ user.username }}</v-row>
        <v-row justify="center" class="py-5">
          <v-btn outlined class="mx-2 mt-2" color="deep-orange text--darken-2" @click="toggleFollowers">
            <v-chip color="white" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              <span class="grey--text text--darken-2">{{ user.followers.length }} followers</span>
            </v-chip>
          </v-btn>

          <v-btn outlined class="mx-2 mt-2" color="deep-orange text--darken-2" @click="toggleFollowing">
            <v-chip color="white" label>
              <v-icon left> mdi-account-circle-outline </v-icon>
              <span class="grey--text text--darken-2">{{ user.following.length }} following</span>
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
