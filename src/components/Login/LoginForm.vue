<template>
  <form @submit.prevent="submit">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <label for="login-form-email">{{ $t("login.email") }}</label>
        <input
          type="email"
          v-model="email"
          id="login-form-email"
          class="border-2 border-deep-orange rounded-sm"
        />
      </div>

      <div class="flex flex-col">
        <label for="login-form-password">{{ $t("login.password") }}</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          id="login-form-password"
        />
      </div>

      <div v-if="loginLoading" class="py-3 text-center">
        <v-progress-circular indeterminate color="deep-orange" />
      </div>

      <button class="text-deep-orange" :disabled="!isLoginButtonEnabled" @click="submit">
        {{ $t("login.login_button") }}
      </button>

      <div class="text-center mt-5 text-md">
        <span class="grey--text text--darken-1 font-weight-light">
          {{ $t("login.to_register.text") }}
        </span>
        <router-link to="/register" class="link font-weight-light">
          {{ $t("login.to_register.register") }}
        </router-link>
      </div>
      <div class="text-center mt-5 text-md">
        <span class="grey--text text--darken-1 font-weight-light">
          {{ $t("login.to_password_reset.text") }}
        </span>
        <router-link to="/password" class="link font-weight-light">
          {{ $t("login.to_password_reset.reset") }}
        </router-link>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { EMAIL_REGEX } from "@/data/ApplicationConstants";

@Component({})
export default class LoginForm extends Vue {
  showPassword = false;

  email = "";

  password = "";

  isLoginButtonEnabled = false;

  get rulesRequired() {
    return (value: string): string | true => !!value || this.$t("login.rules.required").toString();
  }

  get rulesEmail() {
    return (value: string): string | true =>
      EMAIL_REGEX.test(value) || this.$t("login.rules.email").toString();
  }

  get computeLoginButton(): boolean {
    return this.rulesEmail(this.email) === true && this.email !== "" && this.password !== "";
  }

  get loginLoading(): boolean {
    return this.$store.state.loginStatus === "loading";
  }

  get loginError(): string {
    return this.$store.state.error;
  }

  get showLoginError(): boolean {
    return this.$store.state.error !== "";
  }

  @Watch("email")
  emailChanged(): void {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  @Watch("password")
  passwordChanged(): void {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  // noinspection JSUnusedGlobalSymbols
  beforeRouteLeave(_to: never, _from: never, next: () => void): void {
    this.$store.state.error = "";
    next();
  }

  submit(): void {
    this.$store.dispatch("login", {
      email: this.email,
      password: this.password,
    });
  }
}
</script>
<style lang="scss" scoped>
a.no-text-decoration {
  text-decoration: none;
}

.form {
  max-width: 25rem;
  min-width: 20rem;
  margin: 0 auto;
}

.link {
  color: #ff5722;
}
</style>
