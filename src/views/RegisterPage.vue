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
                  {{  $t('register.title') }}
                </h1>
                <v-form class="reset-form-form" @submit.prevent="submit">
                  <v-text-field
                      class="pt-5"
                      :label="$t('register.email')"
                      type="email"
                      v-model="email"
                      prepend-inner-icon="mdi-email"
                      :rules="[rulesRequired, rulesEmail]"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :label="$t('register.username')"
                      prepend-inner-icon="mdi-at"
                      type="text"
                      :rules="[rulesRequired]"
                      v-model="username"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :label="$t('register.name')"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="[rulesRequired]"
                      v-model="name"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="[rulesRequired]"
                      prepend-inner-icon="mdi-lock"
                      @click:append="showPassword = !showPassword"
                      v-model="password"
                      :hint="$t('register.password.hint')"
                      :label="$t('register.password.label')"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <div class="text-center mt-6">
                    <div v-show="registerLoading" class="py-3 text-center">
                      <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
                    </div>

                    <v-alert v-model="registerError" dense close-icon="mdi-close" type="error" dismissible>
                      {{ registerError }}
                    </v-alert>

                    <p>
                      {{ $t('register.info.first_sentence') }}
                      <router-link to="/terms" class="link">{{ $t('register.info.tos') }}</router-link>
                      {{ $t('register.info.and') }}
                      <router-link to="/privacy" class="link">{{ $t('register.info.privacy') }}</router-link>
                      {{ $t('register.info.last_sentence') }}
                    </p>

                    <v-btn @click="submit" color="deep-orange text--darken-2" outlined block :disabled="!isRegisterButtonEnabled">
                      {{ $t('register.register_button') }}
                    </v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('register.to_login.text') }}
                    </span>
                    <router-link to="/login" class="link font-weight-light">
                      {{ $t('register.to_login.login') }}
                    </router-link>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('register.to_password_reset.text') }}
                    </span>
                    <router-link to="/password" class="link font-weight-light">
                      {{ $t('register.to_password_reset.reset') }}
                    </router-link>
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
import Vue from "vue"
import {Component, Watch} from "vue-property-decorator"
import {EMAIL_REGEX} from "@/data/ApplicationConstants"

@Component({
  name: "RegisterPage"
})
export default class RegisterPage extends Vue {
  showPassword: boolean = false
  email: string = ""
  username: string = ""
  name: string = ""
  password: string = ""
  isRegisterButtonEnabled: boolean = false

  get rulesRequired() {
    return (value: string) => !!value || this.$t('register.rules.required').toString()
  }

  get rulesEmail() {
    return (value: string) => EMAIL_REGEX.test(value) || this.$t('register.rules.email').toString()
  }

  get computeRegisterButton() {
    return (this.rulesEmail(this.email) === true
        && this.email.length !== 0
        && this.username.length !== 0
        && this.name.length !== 0
        && this.password.length >= 8)
  }

  get registerLoading() {
    const value = this.$store.state.registerStatus;
    return value === 'loading' ? value : false
  }

  get registerError() {
    const value = this.$store.state.error;
    return value ? value : false
  }

  @Watch("email")
  emailChanged() {
    this.isRegisterButtonEnabled = this.computeRegisterButton
  }

  @Watch("username")
  usernameChanged() {
    this.isRegisterButtonEnabled = this.computeRegisterButton
  }

  @Watch("name")
  nameChanged() {
    this.isRegisterButtonEnabled = this.computeRegisterButton
  }

  @Watch("password")
  passwordChanged() {
    this.isRegisterButtonEnabled = this.computeRegisterButton
  }

  // noinspection JSUnusedGlobalSymbols
  beforeRouteLeave(_to: any, _from: any, next: any) {
    this.$store.state.error = null;
    next();
  }

  submit() {
    if (this.email.length === 0) {
      this.$store.state.error = this.$t('register.errors.email.empty')
      return
    } else if (this.email.length < 6) {
      this.$store.state.error = this.$t('register.errors.email.short')
      return
    } else if (this.email.length > 255) {
      this.$store.state.error = this.$t('register.errors.email.long')
      return
    }

    if (this.username.length === 0) {
      this.$store.state.error = this.$t('register.errors.username.empty')
      return
    } else if (this.username.length > 32) {
      this.$store.state.error = this.$t('register.errors.username.long')
      return
    }

    if (this.name.length === 0) {
      this.$store.state.error = this.$t('register.errors.name.empty')
      return
    } else if (this.name.length > 255) {
      this.$store.state.error = this.$t('register.errors.name.long')
      return
    }

    if (this.password.length === 0) {
      this.$store.state.error = this.$t('register.errors.password.empty')
      return
    } else if (this.password.length < 8) {
      this.$store.state.error = this.$t('register.errors.password.short')
      return
    }

    this.$store.dispatch("register", {
      email: this.email,
      username: this.username,
      name: this.name,
      password: this.password,
    })
  }
}
</script>


<style scoped lang="scss">
a.no-text-decoration {
  text-decoration: none;
}

.reset-form-form {
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
  color: #E64A19;
}
</style>
