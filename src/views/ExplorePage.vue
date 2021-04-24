<template>
  <v-container fluid>
    <v-row v-if="!isTagPage">
      <v-col cols="12" md="8">
        <v-card flat>
          <v-card-title>
            {{ $t('explore_page.posts') }}
          </v-card-title>
          <v-card-subtitle>Posts around the world</v-card-subtitle>
          <v-card-text>
            <div v-if="isTrendingPostsLoading" class="text-center">
              <v-progress-circular indeterminate color="deep-orange"/>
            </div>
            <div v-else>
              <div v-for="(post, idx) in trendingPosts" :key="post._id">
                <v-card class="my-1" flat>
                  <v-card-text>
                    <ExplorePost :post="post"/>
                  </v-card-text>
                </v-card>
                <v-divider v-if="idx !== trendingPosts.length - 1"/>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-divider vertical/>

      <v-col>
        <v-card flat rounded>
          <v-card-title>
            {{ $t('explore_page.topics') }}
          </v-card-title>
          <v-card-subtitle>Some topics you might find interesting</v-card-subtitle>
          <v-card-text>
            <div v-if="isTrendingTagsLoading" class="text-center">
              <v-progress-circular indeterminate color="deep-orange"/>
            </div>
            <div v-else>
              <div v-for="(tag, idx) in trendingTags" :key="idx">
                <router-link :to="`/explore/${tag.tag}`">
                  <v-card flat tile>
                    <v-card-title class="font-weight-medium text-body-1"># {{ tag.tag }}</v-card-title>
                    <v-card-subtitle class="text-caption">{{ tag.count }} Posts</v-card-subtitle>
                  </v-card>
                </router-link>
                <v-divider v-if="idx !== trendingTags.length - 1"/>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-divider class="my-2"/>

        <v-card flat>
          <v-card-title>
            {{ $t('explore_page.people') }}
          </v-card-title>
          <v-card-subtitle>
            Popular Users
          </v-card-subtitle>
          <v-card-text>
            <div v-if="isTrendingUsersLoading">
              <v-progress-circular indeterminate color="deep-orange"/>
            </div>
            <div v-else>
              <div v-for="({ user }, idx) in trendingUsers" :key="idx">
                <v-card flat tile>
                  <router-link :to="{ name: 'UserPage', params: { username: user.username } }">
                    <v-card-title class="font-weight-medium text-body-1">
                      <v-avatar size="40" class="ml-n3">
                        <v-img
                            class="rounded-circle"
                            :src="getUserImage(user)"
                            contain
                            width="12"
                            aspect-ratio="1"
                            alt="Profile"/>
                      </v-avatar>
                      <div class="ml-3">
                        <div class="font-weight-regular text--primary">{{ user.name }}</div>
                        <div class="font-weight-light deep-orange--text text-subtitle-1">@{{ user.username }}</div>
                      </div>
                    </v-card-title>
                  </router-link>
                </v-card>
                <v-divider v-if="idx !== trendingUsers.length - 1"/>
              </div>
            </div>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
    <v-row v-else>
      Stay tuned #Vevericka
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";
// eslint-disable-next-line no-unused-vars
import ExploreService, {Tag, TrendingPerson} from "@/api/explore";
import ExplorePost from "@/components/Explore/ExplorePost.vue";

@Component({
  components: {ExplorePost}
})
export default class ExplorePage extends Vue {
  trendingPosts: IPost[] = []
  trendingUsers: TrendingPerson[] = []
  trendingTags: Tag[] = []

  isTrendingPostsLoading: boolean = true
  isTrendingUsersLoading: boolean = true
  isTrendingTagsLoading: boolean = true

  mounted() {
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
    }
  }

  async fetchTrendingPosts() {
    try {
      this.trendingPosts = await ExploreService.getTrendingPosts()
      console.log(this.trendingPosts)
    } catch (e) {
      console.error(e)
    }
  }

  async fetchTrendingUsers() {
    try {
      this.trendingUsers = await ExploreService.getTrendingPeople()
    } catch (e) {
      console.error(e)
    }
  }

  async fetchTrendingTags() {
    try {
      this.trendingTags = await ExploreService.getTags()
    } catch (e) {
      console.error(e)
    }
  }

  getUserImage(user: { image: string }): string {
    const img = user.image;
    if (img === 'profile.png') {
      return '/profile.png'
    } else {
      return img;
    }
  }

  get isTagPage() {
    return !!this.tag;
  }

  get tag() {
    return this.$route.params.tag;
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
