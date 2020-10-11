<template>
  <v-app>
    <v-main class="mx-auto mt-5">
      <h1>Messages Feature</h1>
      <h1>Our team works hard to develop this feature.</h1>
      <h1>
        See you soon
        <span class="red--text"> {{ name }} </span>.
      </h1>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "MessagesPage",
  data: () => ({
    user: {},
  }),
  computed: {
    name() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style>
</style>