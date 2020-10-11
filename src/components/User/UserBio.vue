<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header class="bio-panel">
        Bio
      </v-expansion-panel-header>
      <v-expansion-panel-content class="mt-3" min-height="500">
        {{ bio }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "UserBio",
  props: ["bio"],
  data: () => ({
    panel: 0,
  }),
};
</script>

<style>
.bio-panel {
  background-color: #dd2c00;
  color: white;
}
</style>