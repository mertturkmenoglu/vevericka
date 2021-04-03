<template>
  <v-card flat>
    <v-card-title class="deep-orange white--text">{{ $t('user.features.features') }}</v-card-title>
    <v-simple-table v-if="user.features.length > 0">
      <template v-slot:default>
        <tbody>
        <tr v-for="(f, idx) in user.features" :key="idx">
          <td>
            <v-chip class="mx-2 my-3" color="deep-orange" outlined>
              <v-icon left color="deep-orange">mdi-fire</v-icon>
              <span class="em-08">{{ f }}</span>
            </v-chip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-else class="em-08 text-center font-weight-light mt-3 text--primary">
      {{ $t('user.features.no_features') }}
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";

@Component({})
export default class UserFeatures extends Vue {
  @Prop({ required: true }) readonly user!: IUser
}
</script>

<style scoped>
.em-08 {
  font-size: .8em;
}
</style>
