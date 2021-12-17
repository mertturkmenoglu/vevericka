<template>
  <v-card class="px-5 v-card" flat outlined>
    <router-link :to="{ name: 'UserPage', params: { username: comment.createdBy.username } }">
      <v-card-title>
        <v-avatar size="40" class="ml-n3">
          <v-img
            class="rounded-circle"
            :src="userImage"
            contain
            width="12"
            aspect-ratio="1"
            alt="Profile"
          />
        </v-avatar>
        <span class="ml-5 font-weight-light text--primary">
          {{ comment.createdBy.name }}
        </span>
        <span class="ml-2 font-weight-thin deep-orange--text">
          @{{ comment.createdBy.username }}
        </span>
      </v-card-title>
    </router-link>

    <v-divider />

    <v-card-text>
      <div class="content font-weight-light text-wrap mt-2 ml-n3 text--primary">
        {{ comment.content }}
      </div>
    </v-card-text>

    <v-card-actions>
      <div class="content-small font-weight-thin ml-n1 text--primary">
        {{ new Date(comment.createdAt).toLocaleDateString() }}
      </div>

      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import IComment from '@/api/responses/IComment';

@Component({})
export default class CommentCard extends Vue {
  @Prop({ required: true }) comment!: IComment;

  get userImage(): string {
    const img = this.comment.createdBy.image;
    if (img === 'profile.png') {
      return '/profile.png';
    }
    return img;
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

.name-link:hover {
  text-decoration: underline !important;
}

.content {
  font-size: 1em;
}

.content-small {
  font-size: 0.8em;
}
</style>
