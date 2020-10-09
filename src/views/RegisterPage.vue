<template>
  <v-container class="my-3">
    <v-img
      class="mx-auto"
      max-height="128"
      max-width="128"
      src="../assets/icon_primary.svg"
    />
    <div class="app-name text-center mt-3 text-h2">Vevericka</div>
    <v-card max-width="800" class="mx-auto mt-3 login-card">
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          class="px-5 pt-5"
          label="Email"
          v-model="email"
          color="#dd2c00"
          outlined
          dense
        />
        <v-text-field
          class="px-5 pt-5"
          label="Username"
          v-model="username"
          color="#dd2c00"
          outlined
          dense
        />
        <v-text-field
          class="px-5 pt-5"
          label="Name"
          v-model="name"
          color="#dd2c00"
          outlined
          dense
        />
        <v-text-field
          class="px-5 pt-5"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          label="Password"
          color="#dd2c00"
          outlined
          dense
        />
        <div class="px-5 pb-5">
          <div v-show="registerLoading" class="py-3 text-center">
            <v-progress-circular
              indeterminate
              color="red"
            ></v-progress-circular>
          </div>

          <v-alert
            v-show="registerError"
            border="left"
            color="red"
            dense
            outlined
            type="error"
          >
            Can't Register
          </v-alert>
          <v-btn @click="submit" color="#dd2c00" outlined block> Register </v-btn>
        </div>
      </v-form>
    </v-card>
    <div class="text-center mt-3 text-body-1">
      Have an account? <router-link to="/login">Login</router-link>
    </div>
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

<style>
.app-name {
  color: #dd2c00;
}

.login-card {
  border-color: #dd2c00;
}
</style>