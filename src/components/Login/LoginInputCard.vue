<template>
  <v-col cols="12" md="4" class="py-6 vertical-center">
    <h1 class="text-center text-4xl font-light text-deep-orange">
      {{ $t("login.title") }}
    </h1>
    <LoginForm class="mt-8" />
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LoginForm from "@/components/Login/LoginForm.vue";

@Component({
  components: { LoginForm },
})
export default class LoginInputCard extends Vue {}
</script>

<style scoped lang="scss">
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
