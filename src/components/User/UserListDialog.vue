<template>
  <v-dialog v-model="showList" scrollable max-width="600">
    <v-card>
      <v-card-title class="deep-orange text--darken-2 white--text">{{ title }}</v-card-title>
      <v-card-text>
      <div v-if="list.length <= 0" class="em-1 text-center">
        <span>No user</span>
      </div>
      <div v-else>
        <div v-for="(u, idx) in list" :key="idx" class="my-1 mx-5">
          <router-link :to="`/user/${u.username}`" @click="onItemClick">
            <UserCard :user="u" class="card-style"/>
          </router-link>
        </div>
      </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserCard from "@/components/UserCard";

  export default {
    name: "UserListDialog",
    components: {UserCard},
    props: ["title", "list", "onItemClick"],
    data: () => ({
      showList: true,
    }),
    watch: {
      showList() {
        this.onItemClick();
      },
    },
  };
</script>

<style scoped>
  .card-style {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
</style>
