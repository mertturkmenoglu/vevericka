<template>
  <v-card>
    <v-card-title class="card-title">Bio</v-card-title>
    <v-card-text class="mt-3">{{bio}}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UserBio",
    props: ["bio"],
  };
</script>

<style scoped>
  .card-title {
    background-color: #E64A19;
    color: white;
  }
</style>
