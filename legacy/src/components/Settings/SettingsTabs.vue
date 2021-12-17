<template>
  <v-tabs
    vertical
    color="deep-orange"
    icons-and-text
  >
    <v-tab
      v-for="tab in tabs"
      :key="tab.title"
    >
      <v-icon>{{ tab.icon }}</v-icon>
      {{ tab.title }}
    </v-tab>

    <v-tab-item>
      <SettingsGeneral
        :user="user"
        @update="updateUser"
      />
    </v-tab-item>

    <v-tab-item>
      <SettingsProfile
        :user="user"
        @update="updateUser"
      />
    </v-tab-item>

    <v-tab-item>
      <SettingsSocial
        :user="user"
        @update="updateUser"
      />
    </v-tab-item>

    <v-tab-item>
      <SettingsHobbies
        :user="user"
        @update="updateUser"
      />
    </v-tab-item>

    <v-tab-item>
      <SettingsLanguages
        :user="user"
        @update="updateUser"
      />
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SettingsGeneral from '@/components/Settings/SettingsGeneral.vue';
import SettingsProfile from '@/components/Settings/SettingsProfile.vue';
import SettingsSocial from '@/components/Settings/SettingsSocial.vue';
import SettingsHobbies from '@/components/Settings/SettingsHobbies.vue';
import SettingsLanguages from '@/components/Settings/SettingsLanguages.vue';
import IUser from '@/api/responses/IUser';
import UserService from '@/api/user';

@Component({
  components: {
    SettingsLanguages, SettingsHobbies, SettingsSocial, SettingsProfile, SettingsGeneral,
  },
})
export default class SettingsTabs extends Vue {
  @Prop({ required: true }) user!: IUser

  async updateUser(user: IUser): Promise<void> {
    try {
      await UserService.updateUser(user);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  get tabs(): { title: string; icon: string }[] {
    return [
      { title: this.$t('settings.tabs.general').toString(), icon: 'mdi-account-cog-outline' },
      { title: this.$t('settings.tabs.profile').toString(), icon: 'mdi-account-circle-outline' },
      { title: this.$t('settings.tabs.social').toString(), icon: 'mdi-account-group' },
      { title: this.$t('settings.tabs.hobbies').toString(), icon: 'mdi-heart-outline' },
      { title: this.$t('settings.tabs.languages').toString(), icon: 'mdi-account-voice' },
    ];
  }
}
</script>

<style scoped>

</style>
