<template>
  <v-snackbar
    v-model="show"
    bottom
    right
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="closeSnackbar"
      >
        {{ $t('home_page.snackbar.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class HomeSnackbar extends Vue {
  @Prop({required: true}) show!: boolean
  @Prop({required: true}) message!: string

  @Emit('close-snackbar')
  closeSnackbar(): void {
    return;
  }
}
</script>
