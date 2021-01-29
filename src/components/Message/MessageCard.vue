<template>
  <v-card class="px-8 v-card" :class="[ isThisUser ? 'this-user' : 'other-user']">
        <v-row>
          <div class="em-1 py-3 font-weight-light">
            {{ message.sent_by }}:
          </div>
          <div class="em-1 font-weight-light py-3 ml-4"> {{ message.content }}</div>
          <v-spacer></v-spacer>
          <div class="em-1 font-weight-light pt-1 ml-4"> {{ (new Date(message.createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) }}</div>
        </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "MessageCard",
    props: ["message"],
    computed: {
      isThisUser() {
        return this.$store.state.user.username === this.message.sent_by
      }
    }
  }
</script>

<style scoped>
  .v-card {
    border: 1px solid black !important;
  }

  .this-user {
    background-color: #f45d22;
    color: white;
  }

  .other-user {
    background-color: rgb(247, 247, 247);
    color: black;
  }

  .em-1 {
    font-size: 1em;
  }
</style>
