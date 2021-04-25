<template>
  <v-container fluid>
    <v-row v-if="!isTagPage">
      <v-col
        cols="12"
        md="8"
      >
        <v-card flat>
          <v-card-title>
            {{ $t('explore_page.posts.title') }}
          </v-card-title>
          <v-card-subtitle>{{ $t('explore_page.posts.subtitle') }}</v-card-subtitle>
          <v-card-text>
            <div
              v-if="isTrendingPostsLoading"
              class="text-center"
            >
              <v-progress-circular
                indeterminate
                color="deep-orange"
              />
            </div>
            <div v-else>
              <div
                v-for="(post, idx) in trendingPosts"
                :key="post._id"
              >
                <v-card
                  class="my-1"
                  flat
                >
                  <v-card-text>
                    <ExplorePost :post="post" />
                  </v-card-text>
                </v-card>
                <v-divider v-if="idx !== trendingPosts.length - 1" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-spacer />
      <v-divider vertical />

      <v-spacer />
      <v-col
        cols=""
        md="3"
      >
        <v-card
          flat
          rounded
          :color="boxBackground"
        >
          <v-card-title class="deep-orange--text font-weight-regular">
            {{ $t('explore_page.topics.title') }}
          </v-card-title>
          <v-card-subtitle>{{ $t('explore_page.topics.subtitle') }}</v-card-subtitle>
          <v-card-text>
            <div
              v-if="isTrendingTagsLoading"
              class="text-center"
            >
              <v-progress-circular
                indeterminate
                color="deep-orange"
              />
            </div>
            <div v-else>
              <div
                v-for="(tag, idx) in trendingTags"
                :key="idx"
              >
                <router-link :to="`/explore/${tag.tag}`">
                  <v-card
                    flat
                    tile
                    :color="boxBackground"
                  >
                    <v-card-title class="font-weight-regular text-body-1 deep-orange--text">
                      # {{ tag.tag }}
                    </v-card-title>
                    <v-card-subtitle class="text-caption">
                      {{ tag.count }} {{ $t('explore_page.topics.posts') }}
                    </v-card-subtitle>
                  </v-card>
                </router-link>
                <v-divider v-if="idx !== trendingTags.length - 1" />
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-divider class="my-2" />

        <v-card flat>
          <v-card-title>
            {{ $t('explore_page.people.title') }}
          </v-card-title>
          <v-card-subtitle>
            {{ $t('explore_page.people.subtitle') }}
          </v-card-subtitle>
          <v-card-text>
            <div v-if="isTrendingUsersLoading">
              <v-progress-circular
                indeterminate
                color="deep-orange"
              />
            </div>
            <div v-else>
              <div
                v-for="({ user }, idx) in trendingUsers"
                :key="idx"
              >
                <v-card
                  flat
                  tile
                >
                  <router-link :to="{ name: 'UserPage', params: { username: user.username } }">
                    <v-card-title class="font-weight-medium text-body-1">
                      <v-avatar
                        size="40"
                        class="ml-n3"
                      >
                        <v-img
                          class="rounded-circle"
                          :src="getUserImage(user)"
                          contain
                          width="12"
                          aspect-ratio="1"
                          alt="Profile"
                        />
                      </v-avatar>
                      <div class="ml-3">
                        <div class="font-weight-regular text--primary">
                          {{ user.name }}
                        </div>
                        <div class="font-weight-light deep-orange--text text-subtitle-1">
                          @{{ user.username }}
                        </div>
                      </div>
                    </v-card-title>
                  </router-link>
                </v-card>
                <v-divider v-if="idx !== trendingUsers.length - 1" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        md="6"
        class="mx-auto"
      >
        <v-card flat>
          <v-card-title class="deep-orange--text font-weight-regular">
            #{{ tag }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div
              v-if="isPostsRelatedToTagLoading"
              class="text-center"
            >
              <v-progress-circular
                indeterminate
                color="deep-orange"
              />
            </div>
            <div v-else>
              <div
                v-for="(post, idx) in postsRelatedToTag"
                :key="post._id"
              >
                <v-card
                  class="my-1"
                  flat
                >
                  <v-card-text>
                    <ExplorePost :post="post" />
                  </v-card-text>
                </v-card>
                <v-divider v-if="idx !== postsRelatedToTag.length - 1" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IPost from '@/api/responses/IPost';
import ExploreService, {Tag, TrendingPerson} from '@/api/explore';
import ExplorePost from '@/components/Explore/ExplorePost.vue';

@Component({
  components: {ExplorePost},
})
export default class ExplorePage extends Vue {
  trendingPosts: IPost[] = []
  trendingUsers: TrendingPerson[] = []
  trendingTags: Tag[] = []
  postsRelatedToTag: IPost[] = []

  isTrendingPostsLoading = true
  isTrendingUsersLoading = true
  isTrendingTagsLoading = true
  isPostsRelatedToTagLoading = true

  mounted(): void {
    if (!this.isTagPage) {
      this.fetchTrendingPosts().then(async () => {
        this.isTrendingPostsLoading = false;
      });
      this.fetchTrendingUsers().then(async () => {
        this.isTrendingUsersLoading = false;
      });
      this.fetchTrendingTags().then(async () => {
        this.isTrendingTagsLoading = false;
      });
    } else {
      this.fetchPostsByTag(this.tag).then(async () => {
        this.isPostsRelatedToTagLoading = false;
      });
    }
  }

  async fetchTrendingPosts(): Promise<void> {
    try {
      this.trendingPosts = await ExploreService.getTrendingPosts();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchTrendingUsers(): Promise<void> {
    try {
      this.trendingUsers = await ExploreService.getTrendingPeople();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchTrendingTags(): Promise<void> {
    try {
      this.trendingTags = await ExploreService.getTags();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchPostsByTag(tag: string): Promise<void> {
    try {
      this.postsRelatedToTag = await ExploreService.getPostsByTag(tag);
    } catch (e) {
      console.error(e);
    }
  }

  getUserImage(user: { image: string }): string {
    const img = user.image;
    if (img === 'profile.png') {
      return '/profile.png';
    } else {
      return img;
    }
  }

  get isTagPage(): boolean {
    return !!this.tag;
  }

  get tag(): string {
    return this.$route.params.tag;
  }

  get boxBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f7f9fa';
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
