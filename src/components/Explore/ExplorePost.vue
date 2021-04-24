<template>
  <v-card class="px-5" flat>
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
        <span class="hidden-sm-and-down">
          <span class="ml-5 font-weight-regular text--primary">{{ post.createdBy.name }}</span>
          <span class="ml-2 font-weight-light deep-orange--text text-subtitle-1">@{{ post.createdBy.username }}</span>
        </span>
        <span class="hidden-md-and-up">
          <span class="ml-5 font-weight-light deep-orange--text text-subtitle-1">@{{ post.createdBy.username }}</span>
        </span>
      </router-link>
    </v-card-title>

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post._id } }">
        <div v-html="makeHTML(post.content)" class="text--darken-2 content text-wrap text--primary px-12">
        </div>
      </router-link>
    </v-card-text>

    <v-card-actions aria-label="Post Actions" class="mr-6">
      <v-spacer></v-spacer>
      <div class="content-small text--disabled text--primary mr-3">
        {{ (new Date(post.createdAt)).toLocaleDateString() }}
      </div>
      <router-link :to="{ name: 'PostDetailPage', params: { id: post._id } }">
          <span class="content-small font-weight-light">
            <v-icon color="deep-orange"> mdi-comment-outline </v-icon>
            <span class="ml-1 pt-1 text--primary">{{ post.comments.length }}</span>
          </span>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";

type ExplorePostType = {
  _id: string;
  comments: string[];
  createdBy: {
    _id: string;
    name: string;
    username: string;
    image: string;
  }
  hashtags: string[];
  mentions: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

@Component({})
export default class ExplorePost extends Vue {
  @Prop({ required: true }) post!: ExplorePostType
  readonly URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
  readonly USERNAME_REGEX = /@[-A-Z0-9_]+/ig
  readonly HASHTAG_REGEX = /#[-A-Z0-9_]+/ig

  makeHTML(text) {
    return this.linkify(this.detectHashtags(this.detectUsernames(text)))
  }
  detectHashtags(text) {
    return text.replace(this.HASHTAG_REGEX, (h) => `<a href="/explore/${h.substr(1)}" class="deep-orange--text">${h}</a>`);
  }
  detectUsernames(text) {
    return text.replace(this.USERNAME_REGEX, (u) => `<a href="/user/${u.substr(1)}" class="deep-orange--text">${u}</a>`);
  }
  linkify(text) {
    return text.replace(this.URL_REGEX, (url) => `<a href="${url}" class="deep-orange--text">${url}</a>`);
  }

  get userImage() {
    const img = this.post.createdBy.image;
    if (img === 'profile.png') {
      return '/profile.png'
    } else {
      return img
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
