<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-12 card">
          <v-row class="fill-height">
            <v-col cols="12" md="8" class="darken-2 vcenter" :class="`${bgColor}`">
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
                  Login
                </h1>
                <v-form class="login-form-form" @submit.prevent="submit">
                  <v-text-field
                      class="pt-5"
                      label="E-mail"
                      type="email"
                      prepend-inner-icon="mdi-email"
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :rules="[rules.required]"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      v-model="password"
                      label="Password"
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
                      Login
                    </v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">New user? </span>
                    <router-link to="/register" class="link font-weight-light">Register</router-link>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">Forgot password? </span>
                    <router-link to="/password" class="link font-weight-light">Reset</router-link>
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
  name: "LoginPage",
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    bgColor: 'deep-orange',
    fgColor: 'white',
    isLoginButtonEnabled: false,
    rules: {
      required: value => !!value || 'This field is required',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Please enter a valid email address';
      },
    }
  }),
  beforeRouteLeave(to, from, next) {
    this.$store.state.error = null;
    next();
  },
  methods: {
    submit() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  watch: {
    email() {
      this.isLoginButtonEnabled = this.computeLoginButton;
    },
    password() {
      this.isLoginButtonEnabled = this.computeLoginButton;
    },
  },
  computed: {
    computeLoginButton() {
      return !!(this.rules.email(this.email) === true && this.email !== '' && this.password !== '');
    },
    loginLoading() {
      const value = this.$store.state.status.loggingIn;
      if (value) {
        return value;
      } else {
        return false;
      }
    },
    loginError() {
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
  color: #E64A19;
}
</style>
