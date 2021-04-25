<template>
  <v-container>
    <v-card flat>
      <v-toolbar
        flat
        color="deep-orange"
        dark
        dense
      >
        <v-toolbar-title class="font-weight-light">
          {{ $t('settings.card_title') }}
        </v-toolbar-title>
      </v-toolbar>
      <SettingsTabs
        v-if="loadingCompleted"
        :user="user"
      />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SettingsTabs from '@/components/Settings/SettingsTabs.vue';
import {Component} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';
import UserService from '@/api/user';

@Component({
  components: {SettingsTabs},
})
export default class SettingsPage extends Vue {
  user: IUser = ({} as IUser)
  loadingCompleted = false

  mounted(): void {
    this.fetchUser().then(() => this.loadingCompleted = true);
  }

  async fetchUser(): Promise<void> {
    const username = this.$store.state.user.username;
    try {
      this.user = await UserService.getUserByUsername(username);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style>
</style>
