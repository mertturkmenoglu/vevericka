<template>
  <v-card flat>
    <v-card-title class="text-body-1">Social</v-card-title>
    <v-card-subtitle class="font-weight-light">Edit your social information</v-card-subtitle>
    <v-divider class="ml-4 mr-4"></v-divider>
    <v-card-text>
      <v-text-field
          v-model="user.website"
          outlined
          dense
          flat
          prepend-inner-icon="mdi-web"
          hint="Enter your personal website URL"
          class="font-weight-light"
          color="deep-orange"
          label="Website"
          type="text"
      />

      <v-text-field
          v-model="user.twitter"
          outlined
          dense
          flat
          prepend-inner-icon="mdi-twitter"
          prefix="@"
          hint="Enter your Twitter username"
          class="font-weight-light"
          color="deep-orange"
          label="Twitter"
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
          label="Job"
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
          label="Education"
          type="text"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined small color="deep-orange" class="mr-2" @click="update">Update</v-btn>
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