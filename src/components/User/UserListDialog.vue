<template>
  <v-dialog v-model="showList" scrollable max-width="800">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-divider></v-divider>
      <div v-if="list.length <= 0" class="text-h5 text-center">
        <span>No user</span>
      </div>
      <div v-else>
        <v-card v-for="(u, idx) in list" :key="idx">
          <router-link :to="`/user/${u.username}`" @click="onItemClick">
            <UserCard :user="u" style="card-style" />
          </router-link>
        </v-card>
      </div>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import UserCard from "@/components/UserCard";

export default {
  name: "UserListDialog",
  components: { UserCard },
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
</style>