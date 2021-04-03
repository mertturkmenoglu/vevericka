<template>
  <v-card flat>
    <v-card-title class="deep-orange white--text">{{ $t('user.info.information') }}</v-card-title>
    <v-container>
      <v-row v-if="user.bdate" class="em-08 mx-auto mt-2 pl-2">
        <v-icon class="mr-2" large color="deep-orange">mdi-calendar</v-icon>
        <span class="my-1 pt-1 text--primary">{{ bdate }}</span>
      </v-row>
      <v-row v-if="user.location.city" :class="userInfo">
        <v-icon class="mr-2" large color="deep-orange">mdi-map-marker</v-icon>
        <span class="my-1 pt-1 em-08 text--primary">{{ user.location.city }}</span>
      </v-row>
      <v-row v-if="user.job" :class="userInfo">
        <v-icon class="mr-2" large color="deep-orange">mdi-account-tie</v-icon>
        <span class="my-1 pt-1 em-08 text--primary">{{ user.job }}</span>
      </v-row>
      <v-row v-if="user.school" :class="userInfo">
        <v-icon class="mr-2" large color="deep-orange">mdi-school</v-icon>
        <span class="my-1 pt-1 em-08 text--primary">{{ user.school }}</span>
      </v-row>
      <v-row v-if="user.website" :class="userInfo">
        <v-icon class="mr-2" large color="deep-orange">mdi-web</v-icon>
        <a class="my-1 pt-1 em-08 deep-orange--text" :href="user.website">{{ user.website }}</a>
      </v-row>
      <v-row v-if="user.twitter" :class="userInfo">
        <v-icon class="mr-2" large color="deep-orange">mdi-twitter</v-icon>
        <a class="my-1 pt-1 em-08 deep-orange--text" :href="twitterLink">@{{ user.twitter }}</a>
      </v-row>
      <v-row v-if="noInfo">
        <div class="em-08 text-center font-weight-light mt-3 text--primary">No Information</div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";

@Component({})
export default class UserInfo extends Vue {
  @Prop({ required: true }) readonly user!: IUser;
  readonly userInfo: string = "text-body-1 mx-auto mt-2 pl-2";

  get twitterLink(): string {
    return this.user.twitter
        ? `https://twitter.com/${this.user.twitter}`
        : "/";
  }

  get bdate(): string {
    if (this.user.bdate) {
      return (new Date(this.user.bdate)).toLocaleDateString()
    } else {
      return '';
    }
  }

  get noInfo(): boolean {
    return (!this.user.bdate
        && !this.user.location.city
        && !this.user.job
        && !this.user.school
        && !this.user.website
        && !this.user.twitter);
  }
}
</script>

<style scoped>
  .em-08 {
    font-size: .8em;
  }
</style>
