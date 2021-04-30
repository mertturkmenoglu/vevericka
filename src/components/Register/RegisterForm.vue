<template>
  <v-form
    class="form"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="email"
      class="pt-5"
      :label="$t('register.email')"
      type="email"
      prepend-inner-icon="mdi-email"
      :rules="[rulesRequired, rulesEmail]"
      color="deep-orange"
      outlined
      dense
    />
    <v-text-field
      v-model="username"
      class="pt-5"
      :label="$t('register.username')"
      prepend-inner-icon="mdi-at"
      type="text"
      :rules="[rulesRequired]"
      color="deep-orange"
      outlined
      dense
    />
    <v-text-field
      v-model="name"
      class="pt-5"
      :label="$t('register.name')"
      prepend-inner-icon="mdi-account-outline"
      :rules="[rulesRequired]"
      color="deep-orange"
      outlined
      dense
    />
    <v-text-field
      v-model="password"
      class="pt-5"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="[rulesRequired]"
      prepend-inner-icon="mdi-lock"
      :hint="$t('register.password.hint')"
      :label="$t('register.password.label')"
      color="deep-orange"
      outlined
      dense
      @click:append="showPassword = !showPassword"
    />
    <div class="text-center mt-6">
      <div
        v-show="registerLoading"
        class="py-3 text-center"
      >
        <v-progress-circular
          indeterminate
          color="deep-orange text--darken-2"
        />
      </div>

      <v-alert
        v-model="showRegisterError"
        dense
        close-icon="mdi-close"
        type="error"
        dismissible
      >
        {{ registerError }}
      </v-alert>

      <p>
        {{ $t('register.info.first_sentence') }}
        <router-link
          to="/terms"
          class="link"
        >
          {{ $t('register.info.tos') }}
        </router-link>
        {{ $t('register.info.and') }}
        <router-link
          to="/privacy"
          class="link"
        >
          {{ $t('register.info.privacy') }}
        </router-link>
        {{ $t('register.info.last_sentence') }}
      </p>

      <v-btn
        color="deep-orange text--darken-2"
        outlined
        block
        :disabled="!isRegisterButtonEnabled"
        @click="submit"
      >
        {{ $t('register.register_button') }}
      </v-btn>
    </div>
    <div class="text-center mt-5 text-body-1">
      <span class="grey--text text--darken-1 font-weight-light">
        {{ $t('register.to_login.text') }}
      </span>
      <router-link
        to="/login"
        class="link font-weight-light"
      >
        {{ $t('register.to_login.login') }}
      </router-link>
    </div>
    <div class="text-center mt-5 text-body-1">
      <span class="grey--text text--darken-1 font-weight-light">
        {{ $t('register.to_password_reset.text') }}
      </span>
      <router-link
        to="/password"
        class="link font-weight-light"
      >
        {{ $t('register.to_password_reset.reset') }}
      </router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {EMAIL_REGEX} from '@/data/ApplicationConstants';

@Component({})
export default class RegisterForm extends Vue {
  showPassword = false
  email = ''
  username = ''
  name = ''
  password = ''
  isRegisterButtonEnabled = false

  get rulesRequired(): (value: string) => (string | true) {
    return (value: string): string | true => !!value || this.$t('register.rules.required').toString();
  }

  get rulesEmail(): (value: string) => (string | true) {
    return (value: string): string | true => EMAIL_REGEX.test(value) || this.$t('register.rules.email').toString();
  }

  get computeRegisterButton(): boolean {
    return (this.rulesEmail(this.email) === true
        && this.email.length !== 0
        && this.username.length !== 0
        && this.name.length !== 0
        && this.password.length >= 8);
  }

  get registerLoading(): boolean {
    return this.$store.state.registerStatus === 'loading';
  }

  get registerError(): string {
    return this.$store.state.error;
  }

  get showRegisterError(): boolean {
    return this.$store.state.error !== '';
  }

  @Watch('email')
  emailChanged(): void {
    this.isRegisterButtonEnabled = this.computeRegisterButton;
  }

  @Watch('username')
  usernameChanged(): void {
    this.isRegisterButtonEnabled = this.computeRegisterButton;
  }

  @Watch('name')
  nameChanged(): void {
    this.isRegisterButtonEnabled = this.computeRegisterButton;
  }

  @Watch('password')
  passwordChanged(): void {
    this.isRegisterButtonEnabled = this.computeRegisterButton;
  }

  // noinspection JSUnusedGlobalSymbols
  beforeRouteLeave(_to: never, _from: never, next: () => void): void {
    this.$store.state.error = null;
    next();
  }

  submit(): void {
    if (this.email.length === 0) {
      this.$store.state.error = this.$t('register.errors.email.empty');
      return;
    } else if (this.email.length < 6) {
      this.$store.state.error = this.$t('register.errors.email.short');
      return;
    } else if (this.email.length > 255) {
      this.$store.state.error = this.$t('register.errors.email.long');
      return;
    }

    if (this.username.length === 0) {
      this.$store.state.error = this.$t('register.errors.username.empty');
      return;
    } else if (this.username.length > 32) {
      this.$store.state.error = this.$t('register.errors.username.long');
      return;
    }

    if (this.name.length === 0) {
      this.$store.state.error = this.$t('register.errors.name.empty');
      return;
    } else if (this.name.length > 255) {
      this.$store.state.error = this.$t('register.errors.name.long');
      return;
    }

    if (this.password.length === 0) {
      this.$store.state.error = this.$t('register.errors.password.empty');
      return;
    } else if (this.password.length < 8) {
      this.$store.state.error = this.$t('register.errors.password.short');
      return;
    }

    this.$store.dispatch('register', {
      email: this.email,
      username: this.username,
      name: this.name,
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

