<template>
  <v-card flat>
    <v-row>
      <v-col cols="8" xs="8" sm="6" md="4" lg="2" class="mx-auto">
        <v-img
            class="rounded-circle mx-auto"
            :src="user.image"
            aspect-ratio="1"
            elevation="12"
            alt="User image"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="text-center">
      <v-col cols="10">
        <v-row class="em-14 grey--text text--darken-2" justify="center">
          <span class="em-14">{{ user.name }}</span>
        </v-row>
        <v-row class="em-14 grey--text text--darken-1" justify="center">@{{ user.username }}</v-row>
        <v-row justify="center">
          <v-btn outlined class="mx-2 mt-2 blue" color="deep-orange text--darken-2 blue" @click="toggleFollowers">
            <v-chip color="blue" label>
              <v-icon left color="white"> mdi-account-circle-outline </v-icon>
              <span class="white--text">{{ user.followers.length }} followers</span>
            </v-chip>
          </v-btn>

          <v-btn outlined class="mx-2 mt-2 blue" color="deep-orange text--darken-2" @click="toggleFollowing">
            <v-chip color="blue" label>
              <v-icon left color="white"> mdi-account-circle-outline </v-icon>
              <span class="white--text">{{ user.following.length }} following</span>
            </v-chip>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <UserActions :user="user" :edit="edit" :follow="follow" :unfollow="unfollow"
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

<style scoped>
.em-14 {
  font-size: 1.4em;
}
</style>
