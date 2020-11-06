<template>
  <v-card flat>
    <v-card-text class="text-h6 font-weight-light">{{bio}}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UserBio",
    props: ["bio"],
  };
</script>

<style scoped>
</style>
