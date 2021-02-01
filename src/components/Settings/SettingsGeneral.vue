<template>
  <v-card flat>
    <v-card-title class="text-body-1">General</v-card-title>
    <v-card-subtitle class="font-weight-light">General and account settings</v-card-subtitle>
    <v-divider class="ml-4 mr-4"></v-divider>
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
            label="Username"
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
            label="Email"
            type="email"
        />

        <v-text-field
            v-model="user.name"
            outlined
            dense
            flat
            class="font-weight-light"
            color="deep-orange"
            label="Name"
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
  name: "SettingsGeneral",
  props: ["user"],
  methods: {
    update() {
      this.$emit("update", this.user);
    }
  }
}
</script>

<style scoped>

</style>