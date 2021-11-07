<template>
  <v-container>
    <v-card class="mx-auto custom-width" flat>
      <v-text-field
        v-model="searchStr"
        append-icon="mdi-magnify"
        outlined
        color="deep-orange text--darken-2"
        :label="$t('search.search')"
        type="text"
        flat
        solo
        dense
        clearable
        single-line
        :prefix="prefix"
        @focusin="prefix = '@'"
        @focusout="prefix = ''"
        @keyup.enter.native="search"
        @click:append="search"
      />
    </v-card>

    <div v-show="showLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="red" />
    </div>

    <v-container v-show="!showLoading && error" class="py-3 text-center">
      <v-col cols="12" sm="8" class="mx-auto">
        <v-alert color="red" dense outlined type="error">
          {{ error }}
        </v-alert>
      </v-col>
    </v-container>

    <div v-for="(result, idx) in searchResults" :key="result._id" class="mx-auto my-5 custom-width">
      <router-link :to="`/user/${result.username}`">
        <UserCard :user="result" class="card-style" />
      </router-link>
      <v-divider v-if="idx !== searchResults.length - 1" />
    </div>

    <div v-if="searchResults.length === 0" class="my-5">
      <h2 class="text-center font-weight-regular">
        {{ $t("search.user_not_found") }}
        <v-icon x-large color="deep-orange"> mdi-emoticon-sad-outline </v-icon>
      </h2>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserCard from '@/components/UserCard.vue';
import UserService from '@/api/user';
import { IUserSearchResult } from '@/api/responses/IUserSearchResult';

@Component({
  components: { UserCard },
})
export default class SearchPage extends Vue {
  searchStr = '';

  showLoading = false;

  error = '';

  searchResults: Array<IUserSearchResult> = [];

  prefix = '';

  mounted(): void {
    this.searchStr = this.$store.state.gSearchTerm || '';
    if (this.searchStr.length > 0) {
      this.search();
    }
  }

  beforeRouteUpdate(_to: never, _from: never, next: () => void): void {
    next();
    window.location.reload();
  }

  async search(): Promise<void> {
    if (this.searchStr === '') {
      return;
    }

    this.showLoading = true;
    this.searchResults = [];

    try {
      const result = await UserService.searchByQuery(this.searchStr);
      this.showLoading = false;
      this.searchResults = result;
      this.error = '';
    } catch (e) {
      this.showLoading = false;
      this.error = this.$t('search.user_not_found').toString();
    }
  }
}
</script>

<style scoped>
.card-style {
  cursor: pointer;
}

a {
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  .custom-width {
    width: 96vw;
  }
}

@media screen and (min-width: 600px) and (max-width: 768px) {
  .custom-width {
    width: 90vw;
  }
}

@media screen and (min-width: 768px) {
  .custom-width {
    max-width: 60vw;
  }
}
</style>
