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
            alt="Profile"
          />
        </v-avatar>
        <span class="ml-5 font-weight-light text--primary">{{ bookmark.createdBy.name }}</span>
        <span class="ml-2 font-weight-thin deep-orange--text text-subtitle-1">
          @{{ bookmark.createdBy.username }}
        </span>
      </router-link>

      <v-spacer />

      <v-menu left bottom nudge-left="24" nudge-bottom="48">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar size="24">
              <v-icon color="deep-orange text--darken-2" size="24"> mdi-dots-vertical </v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list flat class="text-decoration-none font-weight-light" dense>
          <v-list-item @click="removeBookmark">
            <v-list-item-icon>
              <v-icon color="deep-orange"> mdi-bookmark </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("bookmark_card.remove") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <router-link :to="{ name: 'PostDetailPage', params: { id: bookmark._id } }">
        <div
          class="text--darken-2 ml-n3 content font-weight-light text-wrap mt-2 text--primary"
          v-html="makeHTML(bookmark.content)"
        />
      </router-link>
    </v-card-text>

    <v-card-actions>
      <div class="content-small font-weight-thin ml-n1 text--primary">
        {{ new Date(bookmark.createdAt).toLocaleDateString() }}
      </div>
      <v-spacer />
      <router-link :to="{ name: 'PostDetailPage', params: { id: bookmark._id } }">
        <span class="content-small font-weight-light">
          <v-icon color="deep-orange"> mdi-comment-outline </v-icon>
          <span class="ml-2 pt-1 text--primary">{{ bookmark.comments.length }}</span>
        </span>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BookmarkService from '@/api/bookmark';
import { preparePostText } from '@/utils/postUtils';
import IPost from '@/api/responses/IPost';

@Component({})
export default class BookmarkCard extends Vue {
  @Prop({ required: true }) bookmark!: IPost;

  @Prop({ required: true }) bookmarkId!: string;

  get userImage(): string {
    const img = this.bookmark.createdBy.image;
    if (img === 'profile.png') {
      return '/profile.png';
    }
    return img;
  }

  makeHTML(text: string): string {
    return preparePostText(text);
  }

  async removeBookmark(): Promise<void> {
    try {
      await BookmarkService.deleteBookmark(this.bookmarkId);
      this.$emit('bookmarkRemoved');
    } catch (e) {
      console.error(e);
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
