<template>
  <v-card dark color="deep-orange text--darken-2">
    <v-row>
      <v-col cols="4" md="2" sm="2">
        <v-img
          class="rounded-circle ml-3"
          :src="user.image"
          contain
          aspect-ratio="1"
          elevation="12"
          alt="User image"
          width="128"
        />
      </v-col>
      <v-col>
        <v-row>
          <div class="text-lg-h4 text-md-h5">
            {{ user.name }}
          </div>
        </v-row>
        <v-row>
          <div class="text-lg-h5 text-md-h6">@{{ user.username }}</div>
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

<style>
</style>
