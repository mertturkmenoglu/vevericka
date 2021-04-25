<template>
  <v-card flat>
    <v-row>
      <v-col
        cols="4"
        xs="2"
        sm="2"
        md="2"
        lg="2"
      >
        <v-img
          class="rounded-circle mx-auto ml-3"
          :src="userImage"
          :aspect-ratio="1"
          elevation="12"
          alt="User image"
          width="128"
        />
      </v-col>
      <v-col
        align-self="center"
        class="ml-3"
      >
        <v-row>
          <div class="text-h6 font-weight-light">
            {{ user.name }}
          </div>
        </v-row>
        <v-row>
          <div class="deep-orange--text text-body-2 font-weight-thin">
            @{{ user.username }}
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

@Component({})
export default class UserCard extends Vue {
  @Prop({ required: true }) user!: IUser;

  get userImage(): string {
    const img = this.user.image;
    if (img === 'profile.png') {
      return '/profile.png';
    } else {
      return img;
    }
  }
}
</script>

<style scoped>

</style>
