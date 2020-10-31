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
              <v-col cols="12" md="4" class=" pt-6 pb-6 vcenter">
                <v-card-text>
                  <h1 class="text-center display-1 mb-10 deep-orange--text text--darken-2" >
                    Register
                  </h1>
                  <v-form class="login-form-form" @submit.prevent="submit">
                    <v-text-field
                        class="pt-5"
                        label="Email"
                        v-model="email"
                        color="deep-orange text--darken-2"
                        outlined
                        dense
                    />
                    <v-text-field
                        class="pt-5"
                        label="Username"
                        v-model="username"
                        color="deep-orange text--darken-2"
                        outlined
                        dense
                    />
                    <v-text-field
                        class="pt-5"
                        label="Name"
                        v-model="name"
                        color="deep-orange text--darken-2"
                        outlined
                        dense
                    />
                    <v-text-field
                        class="pt-5"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        v-model="password"
                        label="Password"
                        color="deep-orange text--darken-2"
                        outlined
                        dense
                    />
                    <div class="text-center mt-6">
                      <div v-show="registerLoading" class="py-3 text-center">
                        <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
                      </div>

                      <v-alert v-show="registerError" border="left" color="deep-orange text--darken-2" dense outlined type="error">
                        Can't register
                      </v-alert>
                      <v-btn @click="submit" color="deep-orange text--darken-2" outlined block>Register</v-btn>
                    </div>
                    <div class="text-center mt-5 text-body-1">
                      <span class="grey--text text--darken-1">Have an account? </span>
                      <router-link to="/login" class="link">Login</router-link>
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
  }),
  methods: {
    submit() {
      if (
        !this.email.length ||
        !this.username.length ||
        !this.name.length ||
        !this.password.length ||
        this.password < 6
      ) {
        this.$store.state.error = "Can't register";
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
  computed: {
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

  .login-form-form {
    max-width: 25rem;
    margin: 0 auto;
  }

  .card {
    overflow: hidden;
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
