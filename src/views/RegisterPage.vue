<template>
  <v-row
    class="register"
    no-gutters
  >
    <RegisterMotto />
    <RegisterInputCard />
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RegisterMotto from '@/components/Register/RegisterMotto.vue';
import RegisterInputCard from '@/components/Register/RegisterInputCard.vue';

@Component({
  components: {RegisterInputCard, RegisterMotto},
})
export default class RegisterPage extends Vue {

}
</script>

<style scoped lang="scss">
.register {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
</style>
