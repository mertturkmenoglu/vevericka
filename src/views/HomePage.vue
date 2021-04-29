<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="0"
        lg="2"
      />

      <v-col
        v-if="!isLoading"
        cols="12"
        md="6"
      >
        <CreatePost
          :user="user"
          @postCreated="postCreatedHandler"
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
      </v-col>
      <v-col
        v-else
        class="py-3 text-center"
      >
        <v-progress-circular
          indeterminate
          color="deep-orange"
        />
      </v-col>

      <v-col
        cols="0"
        md="3"
        class="mx-auto"
      >
        <ExploreCard />
      </v-col>
    </v-row>

    <HomeScrollTopFab />

    <HomeSnackbar
      :show="snackbar"
      :message="snackbarMessage"
      @close-snackbar="snackbar = false"
    />
  </v-container>
</template>

<script lang="ts">
import CreatePost from '@/components/Post/CreatePost.vue';
import UserFeed from '@/components/Post/UserFeed.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import IUser from '@/api/responses/IUser';
import PostService from '@/api/post';
import IPost from '@/api/responses/IPost';
import UserService from '@/api/user';
import ExploreCard from '@/components/Home/ExploreCard.vue';
import HomeScrollTopFab from '@/components/Home/HomeScrollTopFab.vue';
import HomeSnackbar from '@/components/Home/HomeSnackbar.vue';
import {UserFeedAction, UserFeedActionMessageKey} from '@/types';

@Component({
  components: {HomeSnackbar, HomeScrollTopFab, ExploreCard, CreatePost, UserFeed},
})
export default class HomePage extends Vue {
  user: IUser = ({} as IUser)
  feed: Array<IPost> = []
  isLoading = true
  snackbar = false
  snackbarMessage = ''

  get actions(): typeof UserFeedAction {
    return UserFeedAction;
  }

  get username(): string {
    return this.$store.state.user.username;
  }

  mounted(): void {
    this.fetchUser().then(async () => {
      await this.fetchFeed();
      this.isLoading = false;
    });
  }

  async fetchUser(): Promise<void> {
    try {
      this.user = await UserService.getUserByUsername(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchFeed(): Promise<void> {
    try {
      this.feed = await PostService.getFeedByUsername(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  async postCreatedHandler(): Promise<void> {
    this.feed = [];
    this.isLoading = true;
    await this.fetchFeed();
    this.isLoading = false;
  }

  userFeedHandler(type: string): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t(UserFeedActionMessageKey[type]).toString();
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
