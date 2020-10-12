<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card outlined elevation="12" class="mx-auto" height="70vh">
          <UserHeader
                  :user="user"
                  :toggleFollowers="toggleFollowers"
                  :toggleFollowing="toggleFollowing"
                  :edit="edit"
                  :follow="follow"
                  :unfollow="unfollow"
                  :sendMessage="sendMessage"
          />
        </v-card>
      </v-col>
      <v-col cols="0" sm="8">
        <v-card outlined elevation="12" class="mx-auto" height="70vh">
          <UserInfo :user="user"/>
        </v-card>
      </v-col>
    </v-row>
    <UserListDialog
            v-if="showFollowers"
            title="Followers"
            :list="followers"
            :onItemClick="toggleFollowers"
    />
    <UserListDialog
            v-if="showFollowing"
            title="Following"
            :list="following"
            :onItemClick="toggleFollowing"
    />
  </v-container>
</template>

<script>
  import UserHeader from "@/components/User/UserHeader";
  import UserInfo from "@/components/User/UserInfo";
  import UserListDialog from "@/components/User/UserListDialog";
  import {router} from "@/router";

  export default {
    name: "UserPage",
    components: {UserHeader, UserInfo, UserListDialog},
    props: ["username"],
    data: () => ({
      user: {followers: [], following: []},
      followers: [],
      following: [],
      showFollowers: false,
      showFollowing: false,
      BASE_URL: "https://user-info-service.herokuapp.com/user",
    }),
    methods: {
      async fetchUser() {
        const username = this.$route.params.username;
        const URL = `${this.BASE_URL}/username/${username}`;
        const response = await fetch(URL);
        const data = await response.json();
        this.user = data.user[0];

        if (this.user.followers.length > 0) {
          this.followers = await this.getUsersFromUsernames(this.user.followers);
        }

        if (this.user.following.length > 0) {
          this.following = await this.getUsersFromUsernames(this.user.following);
        }
      },
      async getUsersFromUsernames(list) {
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({list}),
        };

        const URL = `${this.BASE_URL}/get_all_by_username/`;
        const response = await fetch(URL, requestOptions);
        const {users} = await response.json();

        return users;
      },
      sendMessage() {
        router.push("/messages");
      },
      edit() {
        router.push("/settings");
      },
      async follow() {
        const thisUsername = this.$store.state.user.username;
        const otherUsername = this.user.username;
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({thisUsername, otherUsername}),
        };

        const URL = `${this.BASE_URL}/follow/`;
        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.status_code) return;

        this.user.followers.push(this.$store.state.user.username);
        window.location.reload();
      },
      async unfollow() {
        const thisUsername = this.$store.state.user.username;
        const otherUsername = this.user.username;
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({thisUsername, otherUsername}),
        };

        const URL = `${this.BASE_URL}/unfollow/`;
        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.status_code) return;

        this.user.followers = this.user.followers.filter(
            (u) => u == this.$store.state.user.username
        );

        window.location.reload();
      },
      toggleFollowers() {
        this.showFollowers = !this.showFollowers;
      },
      toggleFollowing() {
        this.showFollowing = !this.showFollowing;
      },
      routeFollowers(e) {
        this.toggleFollowers();
        router.push(`/user/${e.target.innerText}`);
      },
    },
    mounted() {
      this.fetchUser();
    },
    beforeRouteUpdate(to, from, next) {
      next();
      window.location.reload();
    },
  };
</script>

<style scoped>
</style>
