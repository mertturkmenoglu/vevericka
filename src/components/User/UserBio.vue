<template>
  <v-card flat>
    <v-card-text class="bio-text font-weight-light">{{bio}}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UserBio",
    props: ["bio"],
  };
</script>

<style scoped>
.bio-text {
  font-size: 1em;
}
</style>
