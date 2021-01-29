<template>
  <v-card flat>
    <v-card-title class="features-header">Features</v-card-title>
    <v-simple-table v-if="user.features.length > 0">
      <template v-slot:default>
        <tbody>
        <tr v-for="(f, idx) in user.features" :key="idx">
          <td>
            <v-chip class="mx-2 my-3"  color="deep-orange text--darken-2" outlined>
              <v-icon left> mdi-fire</v-icon>
              <span class="em-08">{{ f }}</span>
            </v-chip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="em-08 text-center font-weight-light mt-3">No Features</div>
  </v-card>
</template>

<script>
  export default {
    name: "UserFeatures",
    props: ["user"],
  }
</script>

<style scoped>
  .features-header {
    background-color: #E64A19;
    color: white;
  }
  .em-08 {
    font-size: .8em;
  }
</style>
