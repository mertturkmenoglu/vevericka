<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-12 card">
          <v-row class="fill-height">
            <v-col cols="12" md="8" class="vcenter" :class="`${bgColor}`">
              <div>
                <div class="text-center mb-6">
                  <v-img class="mx-auto" max-height="256" max-width="256" src="../assets/icon_white.svg"/>
                </div>
                <v-card-text :class="`${fgColor}--text`">
                  <h1 class="text-center text-h2 headline mb-3">Vevericka</h1>
                  <h5 class="text-center overline mb-3">Wingardium Leviosa</h5>
                </v-card-text>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="pt-6 pb-6 vcenter">
              <v-card-text>
                <h1 class="text-center display-1 mb-10 deep-orange--text font-weight-light">
                  {{ $t('password_reset.title') }}
                </h1>
                <v-form class="reset-form-form" @submit.prevent="sendPasswordResetEmail">
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
                      class="pt-5"
                      type="email"
                      v-model="email"
                      color="deep-orange"
                      :label="$t('password_reset.email')"
                      prepend-inner-icon="mdi-email"
                      :rules="[rulesRequired, rulesEmail]"
                      outlined
                      dense
                  />
                  <v-text-field
                      v-if="emailSend"
                      class="pt-5"
                      type="text"
                      :label="$t('password_reset.reset_code')"
                      v-model="resetCode"
                      color="deep-orange text--darken-2"
                      outlined
                      dense
                  />
                  <v-text-field
                      v-if="emailSend"
                      class="pt-5"
                      :label="$t('password_reset.new_password')"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      v-model="password"
                      color="deep-orange text--darken-2"
                      outlined
                      dense
                  />
                  <div class="text-center mt-3">
                    <v-btn v-if="!emailSend" :disabled="!isSendResetCodeButtonEnabled" @click="sendPasswordResetEmail" color="deep-orange" outlined block>
                      {{ $t('password_reset.send_reset_code_button') }}
                    </v-btn>
                    <v-btn v-else @click="resetPassword" color="deep-orange" outlined block>
                      {{ $t('password_reset.reset_password_button') }}
                    </v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.to_login.text') }}
                    </span>
                    <router-link to="/login" class="link font-weight-light">
                      {{ $t('password_reset.to_login.login') }}
                    </router-link>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">
                      {{ $t('password_reset.to_register.text') }}
                    </span>
                    <router-link to="/register" class="link font-weight-light">
                      {{ $t('password_reset.to_register.register') }}
                    </router-link>
                  </div>
                  <v-snackbar v-model="snackbar" absolute right>
                    {{ snackbarMessage }}
                    <template v-slot:action="{ attrs }">
                      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
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

<script>
export default {
  name: "PasswordResetPage",
  data: () => ({
    email: "",
    bgColor: 'deep-orange darken-2',
    fgColor: 'white',
    snackbar: false,
    snackbarMessage: "",
    emailSend: false,
    resetCode: "",
    password: "",
    showPassword: false,
    isSendResetCodeButtonEnabled: false,
  }),
  methods: {
    async sendPasswordResetEmail() {
      const BASE = "https://vevericka-auth-service.herokuapp.com";
      const URL = `${BASE}/auth/send_password_reset_email`;
      const requestBody = {
        email: this.email
      };

      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(URL, requestOptions);
      const {data} = await response.json();

      if (data.error) {
        this.snackbar = true;
        this.snackbarMessage = data.error.message;
      } else {
        this.snackbar = true;
        this.snackbarMessage = data.message;
        this.emailSend = true;
      }
    },
    async resetPassword() {
      const BASE = "https://vevericka-auth-service.herokuapp.com";
      const URL = `${BASE}/auth/reset_password`;

      const requestBody = {
        email: this.email,
        code: this.resetCode,
        newPassword: this.password
      };

      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(URL, requestOptions);
      const {data} = await response.json();

      if (data.error) {
        this.snackbar = true;
        this.snackbarMessage = data.error.message;
      } else {
        this.snackbar = true;
        this.snackbarMessage = data.message;
        this.emailSend = true;
      }
    }
  },
  watch: {
    email() {
      this.isSendResetCodeButtonEnabled = this.computeSendResetCodeButton;
    },
  },
  computed: {
    rulesRequired() {
      return value => !!value || this.$t('password_reset.rules.required')
    },
    rulesEmail() {
      return (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || this.$t('password_reset.rules.email');
      }
    },
    computeSendResetCodeButton() {
      return !!(this.rulesEmail(this.email) === true && this.email !== '');
    },
  },
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

