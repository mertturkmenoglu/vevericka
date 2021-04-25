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
            @shareLinkCopied="shareLinkCopied"
            @shareDM="shareDM"
            @postSaved="postSaved"
            @postDeleted="postDeleted"
            @userUnfollowed="userUnfollowed"
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
        <v-card
          rounded
          flat
          :color="exploreBoxBackground"
        >
          <v-card-title class="deep-orange--text font-weight-regular ml-4">
            <div>{{ $t('home_page.explore_box.title') }}</div>
          </v-card-title>
          <v-card-text>
            <div
              v-if="exploreLoading"
              class="text-center"
            >
              <v-progress-circular
                indeterminate
                color="deep-orange"
              />
            </div>
            <div v-else>
              <div
                v-for="(tag, idx) in exploreTags"
                :key="idx"
              >
                <router-link :to="`/explore/${tag.tag}`">
                  <v-card
                    flat
                    tile
                    :color="exploreBoxBackground"
                  >
                    <v-card-title
                      class="font-weight-medium text-body-1"
                      :class="exploreHashtagColor"
                    >
                      # {{ tag.tag }}
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                      {{ tag.count }} {{ $t('home_page.explore_box.posts') }}
                    </v-card-subtitle>
                  </v-card>
                </router-link>
                <v-divider v-if="idx !== exploreTags.length - 1" />
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <router-link to="/explore">
              <v-btn
                text
                color="deep-orange"
                rounded
              >
                {{ $t('home_page.explore_box.more') }}
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
        <v-card
          class="mt-2"
          flat
        >
          <v-card-subtitle>Vevericka &copy; 2021</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        v-if="showFab"
        fab
        bottom
        small
        absolute
        fixed
        color="deep-orange"
        dark
        right
        class="mb-10"
        aria-label="Scroll to Top"
        @click="scrollToTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-snackbar
      v-model="snackbar"
      bottom
      right
    >
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          {{ $t('home_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
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
import ExploreService, {Tag} from '@/api/explore';

@Component({
  components: {CreatePost, UserFeed},
})
export default class HomePage extends Vue {
  user: IUser = ({} as IUser)
  feed: Array<IPost> = []
  isLoading = true
  snackbar = false
  showFab = false
  snackbarMessage = ''
  exploreLoading = true
  exploreTags: Tag[] = []

  get username(): string {
    return this.$store.state.user.username;
  }

  get exploreBoxBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f7f9fa';
  }

  get exploreHashtagColor(): string {
    return this.$vuetify.theme.dark ? 'deep-orange--text' : 'grey--text text--darken-3';
  }

  created(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  mounted(): void {
    this.fetchExplore().then(async () => {
      this.exploreLoading = false;
    });

    this.fetchUser().then(async () => {
      await this.fetchFeed();
      this.isLoading = false;
    });
  }

  destroyed(): void {
    window.removeEventListener('scroll', this.handleScroll);
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

  async fetchExplore(): Promise<void> {
    try {
      this.exploreTags = await ExploreService.getTags();
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

  handleScroll(): void {
    this.showFab = window.scrollY > 0;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  shareLinkCopied(): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.post_link_copied').toString();
  }

  shareDM(): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.message_sent').toString();
  }

  postSaved(): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.saved').toString();
  }

  postDeleted(): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.post_deleted').toString();
  }

  userUnfollowed(): void {
    this.snackbar = true;
    this.snackbarMessage = this.$t('home_page.snackbar.messages.unfollowed').toString();
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
