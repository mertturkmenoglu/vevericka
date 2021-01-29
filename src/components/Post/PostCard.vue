<template>
  <v-card class="px-5">
    <v-row>
      <v-col cols="6" xs="6" sm="6" md="2" lg="1" class="hidden-md-and-down">
        <v-img
            class="rounded-circle mx-auto"
            :src="user.image"
            aspect-ratio="1"
            elevation="12"
            alt="User image"
        />
      </v-col>

      <v-col>
        <div class="text--darken-2 text-h5">
          {{ post.content }}
        </div>
        <div class="text-h6 font-weight-light">
          {{post.comments.length}} comments
        </div>
        <div class="text--lighten-4 text-body-2 font-weight-thin">
          {{ new Date(post.date).toLocaleDateString() }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data: () => ({
    user: {}
  }),
  methods: {
    async fetchUser() {
      const BASE = "https://user-info-service.herokuapp.com";
      const URL = `${BASE}/user/username/${this.post.username}`;
      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
    }
  },
  mounted() {
    this.fetchUser();
  }
}
</script>

<style scoped>

</style>