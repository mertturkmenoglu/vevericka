<template>
  <v-container>
    <h1 class="font-weight-light">Contact Us</h1>
    <v-divider></v-divider>
    <h2 class="font-weight-light">For any problem, you can contact with the site administrator
      <router-link :to="`/user/${administratorUsername}`" class="deep-orange--text">@{{administratorUsername}}</router-link>
    </h2>
    <h2 class="font-weight-light">You can reach us at <span class="deep-orange--text">{{contactMail}}</span></h2>
  </v-container>
</template>

<script>
export default {
  name: "ContactPage",
  data: () => ({
    administratorUsername: "adminmert",
    contactMail: "contactvevericka@gmail.com"
  })
}
</script>

<style scoped>

</style>