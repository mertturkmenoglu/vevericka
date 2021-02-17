<template>
  <v-container>
    <v-card class="mx-auto custom-width" flat outlined>
      <v-col>
        <v-text-field
            v-model="searchStr"
            append-icon="mdi-magnify"
            outlined
            class="pt-5"
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
            @click:append="search"/>
      </v-col>
    </v-card>

    <div v-show="showLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="red"></v-progress-circular>
    </div>

    <v-container v-show="!showLoading && error" class="py-3 text-center">
      <v-col cols="12" sm="8" class="mx-auto">
        <v-alert color="red" dense outlined type="error"> {{ error }}</v-alert>
      </v-col>
    </v-container>

    <v-card v-for="(result, idx) in searchResults" :key="idx" outlined class="mx-auto my-5 custom-width">
      <router-link :to="`/user/${result.username}`">
        <UserCard :user="result" class="card-style"/>
      </router-link>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import UserCard from "@/components/UserCard.vue"
import {Component} from "vue-property-decorator"
import UserInfoService from "@/api/UserInfoService";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";

@Component({
  name: "SearchPage",
  components: {UserCard}
})
export default class SearchPage extends Vue {
  searchStr: string = ""
  showLoading: boolean = false
  error: string = ""
  searchResults: Array<IUser> = []
  prefix: string = ""

  mounted() {
    this.searchStr = this.$store.state.gSearchTerm || ''
    if (this.searchStr.length > 0) {
      this.search()
    }
  }

  beforeRouteUpdate(to: any, from: any, next: any) {
    next()
    window.location.reload()
  }

  async search() {
    if (this.searchStr === "") {
      return
    }

    this.showLoading = true
    this.searchResults = []
    const [result, err] = await UserInfoService.searchByQuery(this.searchStr)
    this.showLoading = false

    if (err === null && result !== null) {
      this.searchResults = result
      this.error = ""
    } else {
      this.error = this.$t('search.user_not_found').toString()
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
