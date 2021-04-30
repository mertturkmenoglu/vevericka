<template>
  <v-row
    class="login"
    no-gutters
  >
    <LoginMotto />
    <LoginInputCard />
  </v-row>
</template>

<script lang="ts">
import LoginMotto from '@/components/Login/LoginMotto.vue';
import LoginInputCard from '@/components/Login/LoginInputCard.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {LoginInputCard, LoginMotto},
})
export default class LoginPage extends Vue {

}
</script>

<style scoped lang="scss">
.login {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
</style>
