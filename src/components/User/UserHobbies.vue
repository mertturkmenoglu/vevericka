<template>
  <v-card flat>
    <v-card-title class="card-title">Hobbies</v-card-title>
    <v-simple-table v-if="user.hobbies.length > 0">
      <template v-slot:default>
        <tbody>
        <tr v-for="(h, idx) in user.hobbies" :key="idx">
          <td><span class="grey--text text--darken-2">{{ h }}</span></td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="text-h6 text-center font-weight-light mt-3">No Hobbies</div>
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
    background-color: #E64A19;
  }
</style>
