<template>
  <div>
    <div v-for="(post, idx) in feed" :key="idx">
      <PostCard
        :post="post"
        class="my-2"
        @shareLinkCopied="() => $emit('shareLinkCopied')"
        @shareDM="() => $emit('shareDM')"
        @postSaved="() => $emit('postSaved')"
        @postReported="() => $emit('postReported')"
        @postDeleted="() => $emit('postDeleted')"
        @userUnfollowed="() => $emit('userUnfollowed')"
      />
      <v-divider v-if="idx !== feed.length - 1 && !isDarkTheme" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import PostCard from '@/components/Post/PostCard.vue';
import IPost from '@/api/responses/IPost';

@Component({
  components: { PostCard },
})
export default class UserFeed extends Vue {
  @Prop({ required: true }) feed!: IPost[];

  get isDarkTheme(): boolean {
    return this.$vuetify.theme.dark;
  }
}
</script>

<style scoped></style>
