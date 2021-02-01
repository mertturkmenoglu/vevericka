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
  data: () => ({
    tabs: [
      {title: "General", icon: "mdi-account-cog-outline"},
      {title: "Profile", icon: "mdi-account-circle-outline"},
      {title: "Social", icon: "mdi-account-group"},
      {title: "Hobbies", icon: "mdi-heart-outline"},
      {title: "Languages", icon: "mdi-account-voice"}
    ]
  }),
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
  }
}
</script>

<style scoped>

</style>