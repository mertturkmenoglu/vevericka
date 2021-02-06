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

<script>
export default {
  name: "RegisterPage",
  data: () => ({
    showPassword: false,
    email: "",
    username: "",
    name: "",
    password: "",
    bgColor: 'deep-orange darken-2',
    fgColor: 'white',
    isRegisterButtonEnabled: false,
  }),
  beforeRouteLeave(to, from, next) {
    this.$store.state.error = null;
    next();
  },
  methods: {
    submit() {
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

      this.$store.dispatch("register", {
        email: this.email,
        username: this.username,
        name: this.name,
        password: this.password,
      });
    },
  },
  watch: {
    email() {
      this.isRegisterButtonEnabled = this.computeRegisterButton;
    },
    username() {
      this.isRegisterButtonEnabled = this.computeRegisterButton;
    },
    name() {
      this.isRegisterButtonEnabled = this.computeRegisterButton;
    },
    password() {
      this.isRegisterButtonEnabled = this.computeRegisterButton;
    },
  },
  computed: {
    rulesRequired() {
      return value => !!value || this.$t('register.rules.required');
    },
    rulesEmail() {
      return (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || this.$t('register.rules.email');
      }
    },
    computeRegisterButton() {
      return !!(this.rulesEmail(this.email) === true
          && this.email.length !== 0
          && this.username.length !== 0
          && this.name.length !== 0
          && this.password.length >= 8);
    },
    registerLoading() {
      const value = this.$store.state.status.registering;
      if (value) {
        return value;
      } else {
        return false;
      }
    },
    registerError() {
      const value = this.$store.state.error;
      if (value) {
        return value;
      } else {
        return false;
      }
    },
  },
};
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
