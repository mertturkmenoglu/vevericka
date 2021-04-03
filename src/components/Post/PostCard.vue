<template>
  <v-card class="px-5 v-card" flat outlined>
    <v-card-title>
      <router-link :to="{ name: 'UserPage', params: { username: post.createdBy.username } }">
        <v-avatar size="40" class="ml-n3">
          <v-img
              class="rounded-circle"
              :src="userImage"
              contain
              width="12"
              aspect-ratio="1"
              alt="Profile"/>
        </v-avatar>
        <span class="ml-5 font-weight-light hidden-sm-and-down text--primary">{{ post.createdBy.name }}</span>
        <span class="ml-2 font-weight-thin deep-orange--text text-subtitle-1">@{{ post.createdBy.username }}</span>
      </router-link>

      <v-spacer></v-spacer>

      <v-menu left bottom nudge-left="24" nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" aria-label="Post Menu">
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
              <v-list-item-title>{{ $t('post_card.menu.share') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="dmDialog = true">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('post_card.menu.send_via_dm') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="savePost">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-bookmark-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('post_card.menu.save') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="reportPost">
            <v-list-item-icon>
              <v-icon color="deep-orange">mdi-flag-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('post_card.menu.report') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-if="isThisUserPost" @click="deletePostDialog = true">
            <v-list-item-icon>
              <v-icon>mdi-delete-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('post_card.menu.delete') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else @click="unfollowDialog = true">
            <v-list-item-icon>
              <v-icon color="amber">mdi-account-off-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('post_card.menu.unfollow') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post._id } }">
        <div v-html="makeHTML(post.content)" class="text--darken-2 ml-n3 content font-weight-light text-wrap mt-2 text--primary">
        </div>
      </router-link>
    </v-card-text>

    <v-card-actions aria-label="Post Actions">
      <div class="content-small font-weight-thin ml-n1 text--primary">
        {{ (new Date(post.createdAt)).toLocaleDateString() }}
      </div>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post.id } }">
          <span class="content-small font-weight-light">
            <v-icon color="deep-orange"> mdi-comment-outline </v-icon>
            <span class="ml-2 pt-1 text--primary">{{ post.comments.length }}</span>
          </span>
      </router-link>
    </v-card-actions>

    <v-dialog v-model="deletePostDialog" width="400">
      <v-card>
        <v-card-title class="font-weight-light">
          {{ $t('post_card.delete_post_dialog.title') }}
        </v-card-title>

        <v-card-text>
          {{ $t('post_card.delete_post_dialog.text') }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deletePostDialog = false">
            {{ $t('post_card.delete_post_dialog.cancel') }}
          </v-btn>
          <v-btn color="red" text @click="deletePost">
            {{ $t('post_card.delete_post_dialog.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="unfollowDialog" width="400">
      <v-card>
        <v-card-title class="font-weight-light">
          {{ $t('post_card.unfollow_dialog.title') }}
        </v-card-title>

        <v-card-text>
          {{ $t('post_card.unfollow_dialog.text') }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="unfollowDialog = false">
            {{ $t('post_card.unfollow_dialog.cancel') }}
          </v-btn>
          <v-btn color="red" text @click="unfollowUser">
            {{ $t('post_card.unfollow_dialog.unfollow') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dmDialog" scrollable width="400">
      <v-card>
        <v-card-title class="deep-orange white--text">{{ $t('post_card.dm_dialog.title') }}</v-card-title>
        <v-card-text>
          <div v-if="user.following.length <= 0" class="em-1 text-center">
            <span>{{ $t('post_card.dm_dialog.no_user') }}</span>
          </div>
          <div v-else>
            <div v-for="(u, idx) in user.following" :key="idx" class="my-1">
              <v-list-item @click="shareDM(u)">
                <v-list-item-title>{{ u }}</v-list-item-title>
              </v-list-item>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {router} from '@/router'
import PostService from "@/api/post";

export default {
  name: "PostCard",
  props: ["post"],
  data: () => ({
    user: {
      following: []
    },
    URL_REGEX: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig,
    USERNAME_REGEX: /@[-A-Z0-9_]+/ig,
    HASHTAG_REGEX: /#[-A-Z0-9_]+/ig,
    deletePostDialog: false,
    unfollowDialog: false,
    dmDialog: false,
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
    copyShareLink() {
      const tmpInput = document.createElement("input");
      tmpInput.value = `https://vevericka.herokuapp.com/post/${this.post._id}`;
      document.body.appendChild(tmpInput);
      tmpInput.select();
      document.execCommand("copy");
      document.body.removeChild(tmpInput);
      this.$emit("shareLinkCopied");
    },
    async sendMessage(_msg, _otherUsername) {
      // TODO: Implement
      console.log(_msg, _otherUsername);
      return false;
    },
    async shareDM(u) {
      this.dmDialog = false;
      const msg = ''
      const result = await this.sendMessage(msg, u)

      if (result) {
        this.$emit("shareDM");
      }
    },
    async savePost() {
      try {
        await PostService.createBookmark({
          belongsTo: this.$store.state.user.userId,
          postId: this.post._id,
        });
        this.$emit("postSaved");
      } catch (e) {
       console.error(e);
      }
    },
    reportPost() {
      router.push({name: 'ReportPage', params: {postId: this.post._id, postUsername: this.post.createdBy.username}})
    },
    async deletePost() {
      try {
        await PostService.deletePost(this.post._id)
        this.$emit("postDeleted");
        this.deletePostDialog = false;
      } catch (e) {
        console.error(e);
      }
    },
    async unfollowUser() {
      return false;
      //this.$emit("userUnfollowed");
    },
  },
  computed: {
    isThisUserPost() {
      return this.$store.state.user.username === this.post.createdBy.username;
    },
    userImage() {
      const img = this.post.createdBy.image;
      if (img === 'profile.png') {
        return '/profile.png'
      } else {
        return img;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #001000 !important;
}

.post-share {
  cursor: pointer;
}

.name-link:hover {
  text-decoration: underline !important;
}

.content {
  font-size: 1.2em;
}

.content-small {
  font-size: 0.8em;
}
</style>