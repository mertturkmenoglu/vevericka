<template>
  <router-link :to="to">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="deep-orange"
          :aria-label="label"
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
            class="ml-1"
            size="40"
          >
            <v-icon
              color="deep-orange"
              size="32"
            >
              {{ iconName }}
            </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AppBarIcon extends Vue {
  @Prop({ required: true }) to!: string

  @Prop({ required: true }) label!: string

  @Prop({ required: true }) iconName!: string

  @Prop({ required: true }) tooltip!: string
}
</script>
