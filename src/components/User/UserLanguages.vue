<template>
  <v-card flat>
    <v-card-title class="card-title">{{ $t('user.languages.title') }}</v-card-title>
    <v-simple-table v-if="user.languages.length > 0">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ $t('user.languages.language') }}</th>
          <th class="text-left">{{ $t('user.languages.proficiency') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(l, idx) in user.languages" :key="idx">
          <td>{{ l.language }}</td>
          <td>{{ l.proficiency }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="text-h6 text-center font-weight-light mt-3">{{ $t('user.languages.no_languages') }}</div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";

@Component({})
export default class UserLanguages extends Vue {
  @Prop({ required: true }) readonly user!: IUser
}
</script>

<style scoped>
.card-title {
  color: white;
  background-color: #E64A19;
}
</style>
