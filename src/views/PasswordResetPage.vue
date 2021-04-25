<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
      no-gutters
    >
      <v-col cols="12">
        <v-card class="elevation-12 card">
          <v-row class="fill-height">
            <v-col
              cols="12"
              md="8"
              class="vcenter deep-orange"
            >
              <div>
                <div class="text-center mb-6">
                  <v-img
                    class="mx-auto"
                    max-height="256"
                    max-width="256"
                    src="../assets/icon_white.svg"
                  />
                </div>
                <v-card-text class="white--text">
                  <h1 class="text-center text-h2 headline mb-3">
                    Vevericka
                  </h1>
                  <h5 class="text-center overline mb-3">
                    Wingardium Leviosa
                  </h5>
                </v-card-text>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="4"
              class="pt-6 pb-6 vcenter"
            >
              <v-card-text>
                <h1 class="text-center display-1 mb-10 deep-orange--text font-weight-light">
                  {{ $t('password_reset.title') }}
                </h1>
                <v-form
                  class="reset-form-form"
                  @submit.prevent="sendPasswordResetEmail"
                >
                  <div class="text-center mt-5 text-body-2">
                    <div class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.info.first_sentence') }}
                    </div>
                    <div class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.info.second_sentence') }}
                    </div>
                  </div>
                  <v-text-field
                    v-if="!emailSend"
                    v-model="email"
                    class="pt-5"
                    type="email"
                    color="deep-orange"
                    :label="$t('password_reset.email')"
                    prepend-inner-icon="mdi-email"
                    :rules="[rulesRequired, rulesEmail]"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-if="emailSend"
                    v-model="resetCode"
                    class="pt-5"
                    type="text"
                    :label="$t('password_reset.reset_code')"
                    color="deep-orange text--darken-2"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-if="emailSend"
                    v-model="password"
                    class="pt-5"
                    :label="$t('password_reset.new_password')"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    color="deep-orange text--darken-2"
                    outlined
                    dense
                    @click:append="showPassword = !showPassword"
                  />
                  <div class="text-center mt-3">
                    <v-btn
                      v-if="!emailSend"
                      :disabled="!isSendResetCodeButtonEnabled"
                      color="deep-orange"
                      outlined
                      block
                      @click="sendPasswordResetEmail"
                    >
                      {{ $t('password_reset.send_reset_code_button') }}
                    </v-btn>
                    <v-btn
                      v-else
                      color="deep-orange"
                      outlined
                      block
                      @click="resetPassword"
                    >
                      {{ $t('password_reset.reset_password_button') }}
                    </v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.to_login.text') }}
                    </span>
                    <router-link
                      to="/login"
                      class="link font-weight-light"
                    >
                      {{ $t('password_reset.to_login.login') }}
                    </router-link>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.to_register.text') }}
                    </span>
                    <router-link
                      to="/register"
                      class="link font-weight-light"
                    >
                      {{ $t('password_reset.to_register.register') }}
                    </router-link>
                  </div>
                  <v-snackbar
                    v-model="snackbar"
                    absolute
                    right
                  >
                    {{ snackbarMessage }}
                    <template v-slot:action="{ attrs }">
                      <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                      >
                        {{ $t('password_reset.snackbar.close') }}
                      </v-btn>
                    </template>
                  </v-snackbar>
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
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {EMAIL_REGEX} from '@/data/ApplicationConstants';
import AuthService from '@/api/auth';

@Component({})
export default class PasswordResetPage extends Vue {
  email = ''
  snackbar = false
  snackbarMessage = ''
  emailSend = false
  resetCode = ''
  password = ''
  showPassword = false
  isSendResetCodeButtonEnabled = false

  get rulesRequired() {
    return (value: string): string | true => !!value || this.$t('password_reset.rules.required').toString();
  }

  get rulesEmail() {
    return (value: string): string | true => {
      return EMAIL_REGEX.test(value) || this.$t('password_reset.rules.email').toString();
    };
  }

  get computeSendResetCodeButton(): boolean {
    return (this.rulesEmail(this.email) === true && this.email !== '');
  }

  @Watch('email')
  emailChanged(): void {
    this.isSendResetCodeButtonEnabled = this.computeSendResetCodeButton;
  }

  async sendPasswordResetEmail(): Promise<void> {
    try {
      const resp = await AuthService.sendPasswordResetEmail(this.email);


      if (resp) {
        this.emailSend = true;
      }
    } catch (e) {
      this.snackbar = true;
      this.snackbarMessage = e.message;
    }
  }

  async resetPassword(): Promise<void> {
    try {
      await AuthService.resetPassword(this.email, this.resetCode, this.password);
      this.snackbar = true;
      this.snackbarMessage = 'Sent';
    } catch (e) {
      this.snackbar = true;
      this.snackbarMessage = e.message;
    }
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

