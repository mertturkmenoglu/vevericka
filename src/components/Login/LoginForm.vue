<template>
  <v-form
    class="form"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="email"
      class="pt-5"
      :label="$t('login.email')"
      type="email"
      prepend-inner-icon="mdi-email"
      :rules="[rulesRequired, rulesEmail]"
      color="deep-orange"
      outlined
      dense
    />
    <v-text-field
      v-model="password"
      class="pt-5"
      :rules="[rulesRequired]"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('login.password')"
      prepend-inner-icon="mdi-lock"
      color="deep-orange"
      outlined
      dense
      @click:append="showPassword = !showPassword"
    />
    <div class="text-center mt-6">
      <div
        v-if="loginLoading"
        class="py-3 text-center"
      >
        <v-progress-circular
          indeterminate
          color="deep-orange"
        />
      </div>

      <v-alert
        v-model="showLoginError"
        dense
        close-icon="mdi-close"
        type="error"
        dismissible
      >
        {{ loginError }}
      </v-alert>
      <v-btn
        color="deep-orange"
        outlined
        block
        :disabled="!isLoginButtonEnabled"
        @click="submit"
      >
        {{ $t('login.login_button') }}
      </v-btn>
    </div>
    <div class="text-center mt-5 text-body-1">
      <span class="grey--text text--darken-1 font-weight-light">
        {{ $t('login.to_register.text') }}
      </span>
      <router-link
        to="/register"
        class="link font-weight-light"
      >
        {{ $t('login.to_register.register') }}
      </router-link>
    </div>
    <div class="text-center mt-5 text-body-1">
      <span class="grey--text text--darken-1 font-weight-light">
        {{ $t('login.to_password_reset.text') }}
      </span>
      <router-link
        to="/password"
        class="link font-weight-light"
      >
        {{ $t('login.to_password_reset.reset') }}
      </router-link>
    </div>
  </v-form>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {EMAIL_REGEX} from '@/data/ApplicationConstants';

@Component({})
export default class LoginForm extends Vue {
  showPassword = false
  email = ''
  password = ''
  isLoginButtonEnabled = false

  get rulesRequired() {
    return (value: string): string | true => !!value || this.$t('login.rules.required').toString();
  }

  get rulesEmail() {
    return (value: string): string | true => {
      return EMAIL_REGEX.test(value) || this.$t('login.rules.email').toString();
    };
  }

  get computeLoginButton(): boolean {
    return (this.rulesEmail(this.email) === true && this.email !== '' && this.password !== '');
  }

  get loginLoading(): boolean {
    return this.$store.state.loginStatus === 'loading';
  }

  get loginError(): string {
    return this.$store.state.error;
  }

  get showLoginError(): boolean {
    return this.$store.state.error !== '';
  }

  @Watch('email')
  emailChanged(): void {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  @Watch('password')
  passwordChanged(): void {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  // noinspection JSUnusedGlobalSymbols
  beforeRouteLeave(_to: never, _from: never, next: () => void): void {
    this.$store.state.error = '';
    next();
  }

  submit(): void {
    this.$store.dispatch('login', {
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
