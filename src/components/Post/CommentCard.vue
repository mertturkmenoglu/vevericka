<template>
  <v-card class="px-5 v-card" v-if="!loading">
    <v-row>
      <v-col cols="6" xs="6" sm="6" md="2" lg="1" class="hidden-md-and-down">
        <router-link :to="{ name: 'UserPage', params: { username: user.username } }">
          <v-img
              class="rounded-circle mx-auto"
              :src="user.image"
              aspect-ratio="1"
              elevation="12"
              alt="User image"
          />
        </router-link>
      </v-col>

      <v-col>
        <router-link :to="{ name: 'UserPage', params: { username: user.username } }">
          <span class="text--darken-2 content text-wrap name-link">
            {{ user.name }}
          </span>
          <span class="content font-weight-light">
              @{{ user.username }}
          </span>
        </router-link>
        <div class="content-small font-weight-thin">
          {{ (new Date(comment.date)).toLocaleDateString() }}
        </div>

        <v-divider></v-divider>

        <router-link :to="{ name: 'PostDetailPage', params: { id: comment.postId } }">
          <div class="text--darken-2 content font-weight-light text-wrap mt-2">
            {{ comment.content }}
          </div>
        </router-link>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CommentCard",
  props: ["comment"],
  data: () => ({
    user: {
      username: "",
      name: "",
      image: ""
    },
    loading: true
  }),
  methods: {
    async fetchUser() {
      const BASE = "https://user-info-service.herokuapp.com";
      const URL = `${BASE}/user/username/${this.comment.username}`;
      const response = await fetch(URL);
      const data = await response.json();
      this.user = data.user[0];
    },
  },
  mounted() {
    this.fetchUser().then(() => this.loading = false);
  }
}
</script>

<style lang="scss" scoped>
* {
  --color-primary: #E64A19;
  --color-secondary: #c62828;
  --color-hover-highlight: #f7f7f7;
}

a {
  color: #001000 !important;
}

.post-share {
  cursor: pointer;
}

.name-link:hover {
  text-decoration: underline !important;
}

.content {
  font-size: 1em;
}

.content-small {
  font-size: 0.8em;
}

.v-card {
  transition: all 0.35s ease-out;
}

.v-card:hover {
  background-color: var(--color-hover-highlight) !important;
}
</style>