<template>
  <v-card flat>
    <v-card-title class="text-body-1">{{ $t('settings.social.title') }}</v-card-title>
    <v-card-subtitle class="font-weight-light">{{ $t('settings.social.subtitle') }}</v-card-subtitle>
    <v-divider class="ml-4 mr-4"></v-divider>
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
      <v-spacer></v-spacer>
      <v-btn outlined small color="deep-orange" class="mr-2" @click="update">{{ $t('settings.update') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SettingsSocial",
  props: ["user"],
  methods: {
    update() {
      this.$emit("update", this.user);
    }
  },
}
</script>

<style scoped>

</style>