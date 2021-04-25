<template>
  <v-card flat>
    <v-card-title class="text-body-1">
      {{ $t('settings.profile.title') }}
    </v-card-title>
    <v-card-subtitle class="font-weight-light">
      {{ $t('settings.profile.subtitle') }}
    </v-card-subtitle>
    <v-divider class="ml-4 mr-4" />
    <v-card-text>
      <v-text-field
        v-model="user.gender"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-gender-transgender"
        :hint="$t('settings.profile.gender.hint')"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.profile.gender.label')"
        type="text"
      />

      <v-text-field
        v-model="user.location.city"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-city"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.profile.location.city')"
        type="text"
      />

      <v-text-field
        v-model="user.location.country"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-map-marker"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.profile.location.country')"
        type="text"
      />

      <v-text-field
        v-model="user.image"
        outlined
        dense
        flat
        prepend-inner-icon="mdi-image"
        :hint="$t('settings.profile.image.hint')"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.profile.image.label')"
        type="text"
      />

      <v-textarea
        v-model="user.bio"
        outlined
        dense
        flat
        rows="3"
        prepend-inner-icon="mdi-account-question-outline"
        :hint="$t('settings.profile.bio.hint')"
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.profile.bio.label')"
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
import {Emit, Prop} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

export default class SettingsProfile extends Vue {
  @Prop({ required: true }) user!: IUser

  @Emit('update')
  update(): void {
    this.$emit('update', this.user);
  }
}
</script>

<style scoped>

</style>
