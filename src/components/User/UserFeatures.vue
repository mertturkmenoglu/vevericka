<template>
  <v-card>
    <v-card-title class="features-header">Features</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
        <tr v-for="(f, idx) in user.features" :key="idx">
          <td>
            <v-chip class="mx-2 my-3"  color="#dd2c00" outlined>
              <v-icon left> mdi-fire</v-icon>
              {{ f }}
            </v-chip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
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
    background-color: #dd2c00;
    color: white;
  }
</style>
