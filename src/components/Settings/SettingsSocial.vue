<template>
  <v-card flat>
    <v-card-title class="text-body-1">
      {{ $t('settings.social.title') }}
    </v-card-title>
    <v-card-subtitle class="font-weight-light">
      {{ $t('settings.social.subtitle') }}
    </v-card-subtitle>
    <v-divider class="ml-4 mr-4" />
    <v-card-text>
      <v-text-field
        v-model="user.website"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-web"
        :hint="$t('settings.social.website.hint')"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.social.website.label')"
        type="text"
      />

      <v-text-field
        v-model="user.twitter"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-twitter"
        prefix="@"
        :hint="$t('settings.social.twitter.hint')"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.social.twitter.label')"
        type="text"
      />

      <v-text-field
        v-model="user.job"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-account-tie"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.social.job')"
        type="text"
      />

      <v-text-field
        v-model="user.school"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-school"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.social.school')"
        type="text"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        outlined
        small
        color="deep-orange"
        class="mr-2"
        @click="update"
      >
        {{ $t('settings.update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit, Prop} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

@Component({})
export default class SettingsSocial extends Vue {
  @Prop({ required: true }) user!: IUser

  @Emit('update')
  update(): void {
    this.$emit('update', this.user);
  }
}
</script>

<style scoped>

</style>
