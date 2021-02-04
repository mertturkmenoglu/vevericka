<template>
  <v-card class="px-5 v-card" flat outlined>
    <v-card-title>
      <router-link :to="{ name: 'UserPage', params: { username: post.username } }">
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
        <span class="ml-2 font-weight-thin deep-orange--text text-subtitle-1">@{{ user.username }}</span>
      </router-link>

      <v-spacer></v-spacer>

      <v-menu left bottom nudge-left="24" nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="24">
              <v-icon color="deep-orange text--darken-2" size="24">mdi-dots-vertical</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list flat class="text-decoration-none font-weight-light" dense>
          <v-list-item @click="copyShareLink">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-share-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Share</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="shareDM" disabled>
            <v-list-item-icon>
              <v-icon color="deep-orange" disabled>mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Send via DM</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="savePost" disabled>
            <v-list-item-icon>
              <v-icon color="deep-orange" disabled>mdi-bookmark-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Save</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="reportPost" disabled>
            <v-list-item-icon>
              <v-icon color="deep-orange" disabled>mdi-flag-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Report</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-if="isThisUserPost" @click="deletePost" disabled>
            <v-list-item-icon>
              <v-icon disabled>mdi-delete-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else @click="unfollowUser">
            <v-list-item-icon disabled>
              <v-icon color="amber" disabled>mdi-account-off-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Unfollow user</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
        <div v-html="makeHTML(post.content)" class="text--darken-2 ml-n3 content font-weight-light text-wrap mt-2">
        </div>
      </router-link>
    </v-card-text>

    <v-card-actions>
      <div class="content-small font-weight-thin ml-n1">
        {{ (new Date(post.date)).toLocaleDateString() }}
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
          <span class="content-small font-weight-light">
            <v-icon color="deep-orange"> mdi-comment-outline </v-icon>
            <span class="ml-2 pt-1">{{ post.comments.length }}</span>
          </span>
      </router-link>
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
    USERNAME_REGEX: /@[-A-Z0-9_]+/ig,
    HASHTAG_REGEX: /#[-A-Z0-9_]+/ig,
  }),
  methods: {
    makeHTML(text) {
      return this.linkify(this.detectHashtags(this.detectUsernames(text)))
    },
    detectHashtags(text) {
      return text.replace(this.HASHTAG_REGEX, (h) => `<a href="/explore/${h.substr(1)}" class="deep-orange--text">${h}</a>`);
    },
    detectUsernames(text) {
      return text.replace(this.USERNAME_REGEX, (u) => `<a href="/user/${u.substr(1)}" class="deep-orange--text">${u}</a>`);
    },
    linkify(text) {
      return text.replace(this.URL_REGEX, (url) => `<a href="${url}" class="deep-orange--text">${url}</a>`);
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
    },
    shareDM() {
      this.$emit("shareDM");
    },
    savePost() {
      this.$emit("postSaved");
    },
    reportPost() {
      this.$emit("postReported");
    },
    deletePost() {
      this.$emit("postDeleted");
    },
    unfollowUser() {
      this.$emit("userUnfollowed");
    },
  },
  computed: {
    isThisUserPost() {
      return this.$store.state.user.username === this.post.username;
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