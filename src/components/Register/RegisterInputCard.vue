<template>
  <v-col
    cols="12"
    md="4"
    class="py-6 vertical-center"
  >
    <h1 class="text-center display-1 deep-orange--text font-weight-light">
      {{ $t('register.title') }}
    </h1>
    <RegisterForm class="mt-8" />
  </v-col>
</template>
<script>
import RegisterForm from '@/components/Register/RegisterForm';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {RegisterForm},
})
export default class RegisterInputCard extends Vue {
}
</script>

<style scoped lang="scss">
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
