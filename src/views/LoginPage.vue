<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-12 card">
          <v-row class="fill-height">
            <v-col cols="12" md="8" class="vcenter deep-orange">
              <div>
                <div class="text-center mb-6">
                  <v-img class="mx-auto" max-height="256" max-width="256" src="../assets/icon_white.svg"/>
                </div>
                <v-card-text class="white--text">
                  <h1 class="text-center text-h2 headline mb-3">Vevericka</h1>
                  <h5 class="text-center overline mb-3">Wingardium Leviosa</h5>
                </v-card-text>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="pt-6 pb-6 vcenter">
              <v-card-text>
                <h1 class="text-center display-1 mb-10 deep-orange--text font-weight-light">
                  {{ $t('login.title') }}
                </h1>
                <v-form class="login-form-form" @submit.prevent="submit">
                  <v-text-field
                      class="pt-5"
                      :label="$t('login.email')"
                      type="email"
                      prepend-inner-icon="mdi-email"
                      v-model="email"
                      :rules="[rulesRequired, rulesEmail]"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :rules="[rulesRequired]"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      v-model="password"
                      :label="$t('login.password')"
                      prepend-inner-icon="mdi-lock"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <div class="text-center mt-6">
                    <div v-if="loginLoading" class="py-3 text-center">
                      <v-progress-circular indeterminate color="deep-orange"/>
                    </div>

                    <v-alert v-model="loginError" dense close-icon="mdi-close" type="error" dismissible>
                      {{ loginError }}
                    </v-alert>
                    <v-btn @click="submit" color="deep-orange" outlined block :disabled="!isLoginButtonEnabled">
                      {{ $t('login.login_button') }}
                    </v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('login.to_register.text') }}
                    </span>
                    <router-link to="/register" class="link font-weight-light"> {{ $t('login.to_register.register') }}</router-link>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('login.to_password_reset.text') }}
                    </span>
                    <router-link to="/password" class="link font-weight-light"> {{ $t('login.to_password_reset.reset') }}</router-link>
                  </div>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import {EMAIL_REGEX} from "@/data/ApplicationConstants";

@Component({
  name: "LoginPage"
})
export default class LoginPage extends Vue {
  showPassword: boolean = false
  email: string = ""
  password: string = ""
  isLoginButtonEnabled: boolean = false

  get rulesRequired() {
    return value => !!value || this.$t('login.rules.required');
  }

  get rulesEmail() {
    return (value) => {
      return EMAIL_REGEX.test(value) || this.$t('login.rules.email');
    }
  }

  get computeLoginButton() {
    return (this.rulesEmail(this.email) === true && this.email !== '' && this.password !== '');
  }

  get loginLoading() {
    const value = this.$store.state.status.loggingIn;
    return value ? value : false
  }

  get loginError() {
    const value = this.$store.state.error;
    return value ? value : false
  }

  @Watch("email")
  emailChanged() {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  @Watch("password")
  passwordChanged() {
    this.isLoginButtonEnabled = this.computeLoginButton;
  }

  // noinspection JSUnusedGlobalSymbols
  beforeRouteLeave(to, from, next) {
    this.$store.state.error = null;
    next();
  }

  submit() {
    this.$store.dispatch("login", {
      email: this.email,
      password: this.password,
    });
  }
}
</script>

<style scoped lang="scss">
a.no-text-decoration {
  text-decoration: none;
}

.login-form-form {
  max-width: 25rem;
  margin: 0 auto;
}

.card {
  overflow-x: hidden;
  overflow-y: auto;
  height: 97vh;
}

.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.link {
  color: #ff5722;
}
</style>
