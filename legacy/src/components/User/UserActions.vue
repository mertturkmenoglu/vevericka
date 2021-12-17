<template>
  <v-card flat>
    <v-row
      v-if="!isProfile"
      justify="space-around"
    >
      <div v-if="isFriend">
        <v-btn
          color="deep-orange text--darken-2"
          class="mx-2"
          outlined
          @click="$emit('unfollow-user')"
        >
          <v-icon
            class="ml-1"
            left
          >
            mdi-account-off
          </v-icon>
          <span class="em-08">{{ $t('user.actions.unfollow') }}</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          color="deep-orange text--darken-2"
          outlined
          @click="$emit('follow-user')"
        >
          <v-icon
            class="ml-1"
            left
          >
            mdi-account-plus
          </v-icon>
          <span class="em-08">{{ $t('user.actions.follow') }}</span>
        </v-btn>
      </div>
    </v-row>
    <v-row
      v-else
      justify="space-around"
    >
      <v-btn
        color="deep-orange text--darken-2"
        outlined
        dense
        @click="$emit('edit-user')"
      >
        <v-icon left>
          mdi-account-edit-outline
        </v-icon>
        <span class="em-08">{{ $t('user.actions.edit_profile') }}</span>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

@Component({})
export default class UserActions extends Vue {
  @Prop({ required: true }) user!: IUser;

  get isProfile(): boolean {
    return this.user.username === this.$store.state.user.username;
  }

  get isFriend(): boolean {
    return this.user.followers.map((it) => it._id).indexOf(this.$store.state.user.userId) !== -1;
  }
}
</script>

<style scoped>
.em-08 {
  font-size: .8em;
}
</style>
