<template>
  <v-card dark color="#dd2c00">
    <v-row>
      <v-col cols="5">
        <v-img class="rounded-circle ml-3"
               :src="user.image"
               contain
               aspect-ratio="1"
               elevation="12"
               alt="User image"
               width="160"
        />
      </v-col>

      <v-col>
        <v-row class="text-h5">
          {{ user.name }}
        </v-row>
        <v-row class="text-h6">
          @{{ user.username }}
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "Recommendation",
    props: ["user"],
  }
</script>
