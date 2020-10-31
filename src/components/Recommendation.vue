<template>
  <v-card class="v-card" border="top" elevation="2">
    <v-row>
      <v-col cols="5" class="mx-auto">
        <v-img class="rounded-circle mx-auto"
               :src="user.image"
               contain
               aspect-ratio="1"
               elevation="12"
               alt="User image"
               width="160"
        />
      </v-col>
    </v-row>
    <v-container>
      <v-col class="text-h4 text-center font-weight-light two-line-text">{{ user.name }}</v-col>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "Recommendation",
    props: ["user"],
  }
</script>

<style scoped>
  .v-card {
    border: 2px solid #E64A19 !important;
  }

  @media screen and (max-width: 960px) {
    .two-line-text {
      line-height: 1.5em;
      height: 3em;
      overflow: hidden;
    }
  }
</style>
