<template>
  <v-card>
    <v-card-title class="card-title">Wish to Speak</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Language</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(l, idx) in user.languages" :key="idx">
          <td>{{ l.language }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    name: "UserWishToSpeak",
    props: ["user"],
  }
</script>

<style scoped>

</style>
