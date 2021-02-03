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
                  Register
                </h1>
                <v-form class="reset-form-form" @submit.prevent="submit">
                  <v-text-field
                      class="pt-5"
                      label="E-mail"
                      type="email"
                      v-model="email"
                      prepend-inner-icon="mdi-email"
                      :rules="[rules.required, rules.email]"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      label="Username"
                      prepend-inner-icon="mdi-at"
                      type="text"
                      :rules="[rules.required]"
                      v-model="username"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      label="Name"
                      prepend-inner-icon="mdi-account-outline"
                      :rules="[rules.required]"
                      v-model="name"
                      color="deep-orange"
                      outlined
                      dense
                  />
                  <v-text-field
                      class="pt-5"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi-lock"
                      @click:append="showPassword = !showPassword"
                      v-model="password"
                      hint="Your password must be at least 8 characters long"
                      label="Password"
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
                      By signing up, you agree to the
                      <router-link to="/terms" class="link">Terms of Service</router-link>
                      and
                      <router-link to="/privacy" class="link">Privacy Policy</router-link>
                      , including Cookie use.
                    </p>

                    <v-btn @click="submit" color="deep-orange text--darken-2" outlined block :disabled="!isRegisterButtonEnabled">Register</v-btn>
                  </div>
                  <div class="text-center mt-5 text-body-1">
                    <span class="grey--text text--darken-1 font-weight-light">Have an account? </span>
                    <router-link to="/login" class="link font-weight-light">Login</router-link>
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
      if (this.email.length === 0) {
        this.$store.state.error = "E-mail cannot be empty";
        return;
      } else if (this.email.length < 6) {
        this.$store.state.error = "E-mail cannot be shorter than 6 characters";
        return;
      } else if (this.email.length > 255) {
        this.$store.state.error = "E-mail cannot be longer than 255 characters";
        return;
      }

      if (this.username.length === 0) {
        this.$store.state.error = "Username cannot be empty";
        return;
      } else if (this.username.length > 32) {
        this.$store.state.error = "Username cannot be longer than 32 characters";
        return;
      }

      if (this.name.length === 0) {
        this.$store.state.error = "Name cannot be empty";
        return;
      } else if (this.name.length > 255) {
        this.$store.state.error = "Name cannot be longer than 255 characters";
        return;
      }

      if (this.password.length === 0) {
        this.$store.state.error = "Password cannot be empty";
        return;
      } else if (this.password.length < 8) {
        this.$store.state.error = "Password cannot be shorter than 8 characters";
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
    computeRegisterButton() {
      return !!(this.rules.email(this.email) === true
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
