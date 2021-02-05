<template>
  <v-card class="px-4" flat outlined>
    <v-card-title class="mt-n3">
      <span class="font-weight-light em-08"  :class="[ isThisUser ? 'this-user' : 'other-user']">
        {{ isThisUser ? 'You' : message.sent_by}}
      </span>
    </v-card-title>
    <v-card-subtitle class="font-weight-regular em-06 mt-n6">
     {{formattedMessageTime}} {{ formattedMessageDate }}
    </v-card-subtitle>

    <v-divider class="mt-n5"></v-divider>

    <v-card-text class="font-weight-light mt-n3 mb-n3">
      {{ message.content }}
    </v-card-text>

  </v-card>
</template>

<script>
  export default {
    name: "MessageCard",
    props: ["message"],
    computed: {
      isThisUser() {
        return this.$store.state.user.username === this.message.sent_by;
      },
      formattedMessageTime() {
        return (new Date(this.message.createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
      },
      formattedMessageDate() {
        return (new Date(this.message.createdAt)).toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric'})
      }
    }
  }
</script>

<style scoped>
  .this-user {
    color: #f45d22;
  }

  .other-user {
    color: #555;
  }

  .em-08 {
    font-size: 0.8em;
  }

  .em-06 {
    font-size: 0.6em;
  }
</style>
