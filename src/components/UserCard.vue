<template>
  <v-card dark color="deep-orange text--darken-2" class="v-card">
    <v-row>
      <v-col cols="4" md="2" sm="2">
        <v-img
          class="rounded-circle ml-3"
          :src="user.image"
          :aspect-ratio="1"
          elevation="12"
          alt="User image"
          width="128"
        />
      </v-col>
      <v-col align-self="center" class="ml-3">
        <v-row>
          <div class="text-h4">
            {{ user.name }}
          </div>
        </v-row>
        <v-row>
          <div class="text-body-1">@{{ user.username }}</div>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: ["user"],
};
</script>

<style scoped>
  .v-card {
    transition: all 0.35s ease-out;
  }

  .v-card:hover {
    background-color: #FF7043 !important;
    color: #fff;
  }
</style>
