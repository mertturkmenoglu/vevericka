<template>
  <v-card class="card-style">
    <v-navigation-drawer absolute permanent left>
      <v-list>
        <v-list-item
          v-for="(m, idx) in lastChatMessages"
          :key="idx"
          class="text-decoration-none"
        >
            <router-link :to="`/messages/${m.username}`">
              {{ m.name }}
            </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "ChatNavBar",
  data: () => ({
    lastChatMessages: [],
  }),
};
</script>

<style scoped>
.card-style {
  height: 90vh;
}
</style>