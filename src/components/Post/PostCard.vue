<template>
  <v-card class="px-5 v-card" flat>
    <v-row>

        <router-link :to="{ name: 'UserPage', params: { username: post.username } }">
          <v-img
              class="rounded-circle ml-3 mr-3 mt-4"
              :src="user.image"
              aspect-ratio="1"
              elevation="12"
              alt="User image"
              width="40"
          />
        </router-link>

      <v-col>
        <router-link :to="{ name: 'UserPage', params: { username: post.username } }">
          <span class="text--darken-2 content text-wrap name-link">
            {{ user.name }}
          </span>
          <span class="content font-weight-light">
              @{{ user.username }}
          </span>
        </router-link>
        <div class="content-small font-weight-thin">
            {{ (new Date(post.date)).toLocaleDateString() }}
        </div>

        <v-divider></v-divider>

        <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
          <div class="text--darken-2 content font-weight-light text-wrap mt-2">
            {{ post.content }}
          </div>
        </router-link>

        <div class="pt-5">
          <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
          <span class="content-small font-weight-light">
            <v-icon color="deep-orange text--darken-2"> mdi-comment-text-multiple-outline </v-icon>
            <span class="ml-2 pt-1">{{ post.comments.length }} comments</span>
          </span>
          </router-link>
          <span class="content-small font-weight-light ml-5 post-share" @click="copyShareLink">
            <v-icon color="deep-orange text--darken-2"> mdi-share-variant-outline </v-icon>
            <span class="ml-2 pt-1">Share</span>
          </span>
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
    },
    copyShareLink() {
      const tmpInput = document.createElement("input");
      tmpInput.value = `https://vevericka.herokuapp.com/post/${this.post.id}`;
      document.body.appendChild(tmpInput);
      tmpInput.select();
      document.execCommand("copy");
      document.body.removeChild(tmpInput);
      this.$emit("shareLinkCopied");
    }
  },
  mounted() {
    this.fetchUser();
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