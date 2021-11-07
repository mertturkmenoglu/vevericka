<template>
  <div>
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
              <ExploreCardItem :tag="tag" />
            </router-link>
            <v-divider v-if="idx !== exploreTags.length - 1" />
          </div>
        </div>
      </v-card-text>
      <ExploreCardActions />
    </v-card>
    <ExploreCardSub />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ExploreService from '@/api/explore';
import ExploreCardItem from '@/components/Home/ExploreCardItem.vue';
import ExploreCardSub from '@/components/Home/ExploreCardSub.vue';
import ExploreCardActions from '@/components/Home/ExploreCardActions.vue';
import ITag from '@/api/responses/ITag';

@Component({
  components: { ExploreCardActions, ExploreCardSub, ExploreCardItem },
})
export default class ExploreCard extends Vue {
  exploreLoading = true

  exploreTags: ITag[] = []

  get exploreBoxBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f7f9fa';
  }

  mounted(): void {
    this.fetchExplore().then(async () => {
      this.exploreLoading = false;
    });
  }

  async fetchExplore(): Promise<void> {
    try {
      const result = await ExploreService.getTags();
      this.exploreTags = result.slice(0, 5);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
