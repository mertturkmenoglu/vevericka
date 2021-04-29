<template>
  <div>
    <CreatePost
      :user="user"
      @postCreated="postCreated"
    />
    <div v-if="feed.length > 0">
      <UserFeed
        :feed="feed"
        @shareLinkCopied="userFeedHandler(actions.SHARE_LINK_COPIED)"
        @shareDM="userFeedHandler(actions.SHARE_DM)"
        @postSaved="userFeedHandler(actions.POST_SAVED)"
        @postDeleted="userFeedHandler(actions.POST_DELETED)"
        @userUnfollowed="userFeedHandler(actions.USER_UNFOLLOWED)"
      />
    </div>
    <div v-else>
      <div class="py-3 text-center">
        <h3 class="font-weight-light">
          No posts here <span class="deep-orange--text font-weight-bold">:(</span>
        </h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {UserFeedAction, UserFeedActionMessageKey} from '@/types';
import IUser from '@/api/responses/IUser';
import CreatePost from '@/components/Post/CreatePost.vue';
import IPost from '@/api/responses/IPost';
import UserFeed from '@/components/Post/UserFeed.vue';

@Component({
  components: {UserFeed, CreatePost},
})
export default class MainColumn extends Vue {
  @Prop({ required: true }) user?: IUser
  @Prop({ required: true }) feed!: IPost[]

  get actions(): typeof UserFeedAction {
    return UserFeedAction;
  }

  @Emit('show-snackbar')
  userFeedHandler(type: string): string {
    return this.$t(UserFeedActionMessageKey[type]).toString();
  }

  @Emit('post-created')
  postCreated(): void {
    return;
  }
}
</script>
