<template>
  <v-card flat outlined>
    <v-row>
      <v-col cols="4" xs="2" sm="2" md="2" lg="2">
        <v-img
            id="user-image"
            class="rounded-circle mx-auto ml-3"
            :src="userImage"
            :aspect-ratio="1"
            elevation="12"
            alt="User image"
            width="128"
        />
      </v-col>
      <v-col align-self="center" class="ml-3">
        <v-row>
          <div id="user-name-text" class="text-h6 font-weight-light">
            {{ user.name }}
          </div>
        </v-row>
        <v-row>
          <div id="username-text" class="text-body-2 font-weight-thin">@{{ user.username }}</div>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: ["user"],
  computed: {
    userImage() {
      const img = this.user.image;
      if (img === 'profile.png') {
        return '/profile.png'
      } else {
        return img;
      }
    }
  }
};
</script>

<style scoped>

</style>
