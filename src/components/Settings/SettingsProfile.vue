<template>
  <v-card flat>
    <v-card-title class="text-body-1">Profile</v-card-title>
    <v-card-subtitle class="font-weight-light">Edit your profile</v-card-subtitle>
    <v-divider class="ml-4 mr-4"></v-divider>
    <v-card-text>
      <v-text-field
          v-model="user.gender"
          outlined
          dense
          flat
          prepend-inner-icon="mdi-gender-transgender"
          hint="You can enter anything you want"
          class="font-weight-light"
          color="deep-orange"
          label="Gender"
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
          label="City"
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
          label="Country"
          type="text"
      />

      <v-text-field
          v-model="user.image"
          outlined
          dense
          flat
          prepend-inner-icon="mdi-image"
          hint="Enter an image URL. Be sure that you have the rights to use the image."
          class="font-weight-light"
          color="deep-orange"
          label="Profile Image"
          type="text"
      />

      <v-textarea
          v-model="user.bio"
          outlined
          dense
          flat
          rows="3"
          prepend-inner-icon="mdi-account-question-outline"
          hint="Express yourself"
          class="font-weight-light"
          color="deep-orange"
          label="Bio"
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
  name: "SettingsProfile",
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