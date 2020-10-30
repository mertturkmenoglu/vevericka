<template>
  <v-card class="px-8 v-card" :class="[ isThisUser ? 'this-user' : 'other-user']">
        <v-row>
          <div class="text-h6">
            {{ message.sent_by }}:
          </div>
          <div class="text-h6 ml-4"> {{ message.content }}</div>
          <v-spacer></v-spacer>
          <div class="text-h6 ml-4"> {{ (new Date(message.createdAt)).toLocaleTimeString().substr(0, 5) }}</div>
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
  /*.v-card {
    border: 1px solid white !important;
  }*/

  .this-user {
    background-color: rgb(229, 57, 53);
    color: white;
  }

  .other-user {
    background-color: rgb(108, 108, 108);
    color: white;
  }
</style>
