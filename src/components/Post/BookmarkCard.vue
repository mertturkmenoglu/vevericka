<template>
  <v-card class="px-5 v-card" flat outlined>
    <v-card-title>
      <router-link :to="{ name: 'UserPage', params: { username: bookmark.createdBy.username } }">
        <v-avatar size="40" class="ml-n3">
          <v-img
              class="rounded-circle"
              :src="userImage"
              contain
              width="12"
              aspect-ratio="1"
              alt="Profile"/>
        </v-avatar>
        <span class="ml-5 font-weight-light text--primary">{{ bookmark.createdBy.name }}</span>
        <span class="ml-2 font-weight-thin deep-orange--text text-subtitle-1">@{{ bookmark.createdBy.username }}</span>
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
          <v-list-item @click="removeBookmark">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-bookmark</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('bookmark_card.remove')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: bookmark._id } }">
        <div v-html="makeHTML(bookmark.content)" class="text--darken-2 ml-n3 content font-weight-light text-wrap mt-2 text--primary">
        </div>
      </router-link>
    </v-card-text>

    <v-card-actions>
      <div class="content-small font-weight-thin ml-n1 text--primary">
        {{ (new Date(bookmark.createdAt)).toLocaleDateString() }}
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'PostDetailPage', params: { id: bookmark._id } }">
          <span class="content-small font-weight-light">
            <v-icon color="deep-orange"> mdi-comment-outline </v-icon>
            <span class="ml-2 pt-1 text--primary">{{ bookmark.comments.length }}</span>
          </span>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostService from "@/api/post";

export default {
  name: "BookmarkCard",
  props: ["bookmark", "bookmarkId"],
  data: () => ({
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
    async removeBookmark() {
      try {
        await PostService.deleteBookmark(this.bookmarkId)
        this.$emit("bookmarkRemoved");
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    userImage() {
      const img = this.bookmark.createdBy.image;
      if (img === 'profile.png') {
        return '/profile.png'
      } else {
        return img;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #001000 !important;
  text-decoration: none;
}

.post-share {
  cursor: pointer;
}

.content {
  font-size: 1em;
}

.content-small {
  font-size: 0.8em;
}
</style>