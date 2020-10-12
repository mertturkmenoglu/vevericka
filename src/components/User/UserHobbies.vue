<template>
  <v-card>
    <v-card-title class="card-title">Hobbies</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <tbody>
        <tr v-for="(h, idx) in user.hobbies" :key="idx">
          <td>{{ h }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    name: "UserHobbies.vue",
    props: ["user"],
  }
</script>

<style scoped>
  .card-title {
    color: white;
    background-color: #dd2c00;
  }
</style>
