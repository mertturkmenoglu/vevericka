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

<style>
  .card-title {
    background-color: #dd2c00;
    color: white;
  }
</style>
