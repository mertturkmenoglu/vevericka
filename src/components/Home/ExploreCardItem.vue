<template>
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
</template>

<script lang="ts">
import {Prop, Vue} from 'vue-property-decorator';
import Component from 'vue-class-component';
import ITag from '@/api/responses/ITag';

@Component({})
export default class ExploreCardItem extends Vue {
  @Prop({ required: true }) tag!: ITag

  get exploreBoxBackground(): string {
    return this.$vuetify.theme.dark ? '#1e1e1e' : '#f7f9fa';
  }

  get exploreHashtagColor(): string {
    return this.$vuetify.theme.dark ? 'deep-orange--text' : 'grey--text text--darken-3';
  }
}
</script>

<style>

</style>
