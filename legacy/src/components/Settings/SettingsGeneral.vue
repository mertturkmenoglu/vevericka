<template>
  <v-card flat>
    <v-card-title class="text-body-1">
      {{ $t('settings.general.title') }}
    </v-card-title>
    <v-card-subtitle class="font-weight-light">
      {{ $t('settings.general.subtitle') }}
    </v-card-subtitle>
    <v-divider class="ml-4 mr-4" />
    <v-card-text>
      <v-text-field
        v-model="user.username"
        outlined
        dense
        flat
        disabled
        class="font-weight-light"
        prefix="@"
        color="deep-orange"
        :label="$t('settings.general.username')"
        type="text"
      />

      <v-text-field
        v-model="user.email"
        outlined
        dense
        flat
        disabled
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.general.email')"
        type="email"
      />

      <v-text-field
        v-model="user.name"
        outlined
        dense
        flat
        class="font-weight-light"
        color="deep-orange"
        :label="$t('settings.general.name')"
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
import { Emit, Prop } from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';

@Component({})
export default class SettingsGeneral extends Vue {
  @Prop({ required: true }) user!: IUser

  @Emit('update')
  update(): void {
    this.$emit('update', this.user);
  }
}
</script>

<style scoped>

</style>
