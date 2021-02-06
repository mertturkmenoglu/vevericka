<template>
  <v-tabs vertical color="deep-orange" icons-and-text>
    <v-tab v-for="tab in tabs" :key="tab.title">
      <v-icon>{{ tab.icon }}</v-icon>
      {{ tab.title }}
    </v-tab>

    <v-tab-item>
      <SettingsGeneral :user="user" @update="updateUser"/>
    </v-tab-item>

    <v-tab-item>
      <SettingsProfile :user="user" @update="updateUser"/>
    </v-tab-item>

    <v-tab-item>
      <SettingsSocial :user="user" @update="updateUser"/>
    </v-tab-item>

    <v-tab-item>
      <SettingsHobbies :user="user" @update="updateUser"/>
    </v-tab-item>

    <v-tab-item>
      <SettingsLanguages :user="user" @update="updateUser"/>
    </v-tab-item>

  </v-tabs>
</template>

<script>
import SettingsGeneral from "@/components/Settings/SettingsGeneral";
import SettingsProfile from "@/components/Settings/SettingsProfile";
import SettingsSocial from "@/components/Settings/SettingsSocial";
import SettingsHobbies from "@/components/Settings/SettingsHobbies";
import SettingsLanguages from "@/components/Settings/SettingsLanguages";

export default {
  name: "SettingsTabs",
  components: {SettingsLanguages, SettingsHobbies, SettingsSocial, SettingsProfile, SettingsGeneral},
  props: ["user"],
  methods: {
    async updateUser(user) {
      const BASE = "https://user-info-service.herokuapp.com/user";
      const URL = `${BASE}/${user._id}`;

      const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
      };

      const response = await fetch(URL, requestOptions);
      const data = await response.json();

      if (data['status_code']) return;
      window.location.reload();
    },
  },
  computed: {
    tabs() {
      return [
        {title: this.$t('settings.tabs.general'), icon: "mdi-account-cog-outline"},
        {title: this.$t('settings.tabs.profile'), icon: "mdi-account-circle-outline"},
        {title: this.$t('settings.tabs.social'), icon: "mdi-account-group"},
        {title: this.$t('settings.tabs.hobbies'), icon: "mdi-heart-outline"},
        {title: this.$t('settings.tabs.languages'), icon: "mdi-account-voice"}
      ]
    }
  }
}
</script>

<style scoped>

</style>