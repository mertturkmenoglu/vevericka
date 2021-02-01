<template>
  <v-card class="px-5 v-card" flat outlined>
    <router-link :to="{ name: 'UserPage', params: { username: post.username } }">
      <v-card-title>
        <v-avatar size="40" class="ml-n3">
          <v-img
              class="rounded-circle"
              :src="user.image"
              contain
              width="12"
              aspect-ratio="1"
              alt="Profile"/>
        </v-avatar>
        <span class="ml-5 font-weight-light">{{ user.name }}</span>
        <span class="ml-2 font-weight-thin">@{{ user.username }}</span>
      </v-card-title>
    </router-link>

    <v-divider></v-divider>

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
        <div v-html="linkify(post.content)" class="text--darken-2 content font-weight-light text-wrap mt-2">
        </div>
      </router-link>
    </v-card-text>

    <v-card-actions>
      <div class="content-small font-weight-thin">
        {{ (new Date(post.date)).toLocaleDateString() }}
      </div>
      <v-spacer></v-spacer>
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
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  data: () => ({
    user: {},
    URL_REGEX: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig,
  }),
  methods: {
    linkify(text) {
      return text.replace(this.URL_REGEX, (url) => `<a href="${url}">${url}</a>`);
    },
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