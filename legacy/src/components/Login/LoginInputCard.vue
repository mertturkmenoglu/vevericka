<template>
  <div class="w-full md:w-4/12 py-6 flex flex-col justify-center items-center">
    <h1 class="text-center text-4xl font-light text-deep-orange">
      {{ $t("login.title") }}
    </h1>
    <LoginForm class="mt-8" />
  </div>
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
