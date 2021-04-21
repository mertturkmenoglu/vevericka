<template>
  <v-card flat>
    <v-card-title>
      <v-row>
        <v-col>
          <v-row justify="space-around">
            <v-avatar size="96">
              <v-img
                  class="rounded-circle"
                  :src="userImage"
                  contain
                  width="12"
                  aspect-ratio="1"
                  alt="Profile"/>
            </v-avatar>
          </v-row>
          <v-row justify="space-around" class="mt-5">
            <div class="font-weight-light text-h5">{{ user.name }}</div>
          </v-row>
          <v-row justify="space-around">
            <div class="font-weight-thin">@{{ user.username }}</div>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row justify="center" class="text-center">
        <div class="font-weight-light em-12">{{ user.bio }}</div>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col>
          <v-row justify="space-around">
            <v-spacer></v-spacer>
            <v-btn
                text
                color="deep-orange text--darken-2"
                class="font-weight-light"
                @click="$emit('toggle-followers')">
              {{ user.followers.length }} {{ $t('user.header.followers') }}
            </v-btn>
            <v-btn
                text
                color="deep-orange text--darken-2"
                class="font-weight-light"
                @click="$emit('toggle-following')">
              {{ user.following.length }} {{ $t('user.header.following') }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row justify="space-around" class="mt-5">
            <UserActions :user="user" v-on="$listeners"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserActions from "@/components/User/UserActions.vue";
import {Component, Prop} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";

@Component({
  name: "UserHeader",
  components: {
    UserActions
  }
})
export default class UserHeader extends Vue {
  @Prop({ required: true }) readonly user?: IUser

  get userImage(): string {
    const img = this.user?.image;
    if (img === 'profile.png' || !img) {
      return '/profile.png'
    } else {
      return img;
    }
  }
}
</script>

<style scoped>
.em-12 {
  font-size: 1.2em;
}

.em-08 {
  font-size: .8em;
}
</style>
