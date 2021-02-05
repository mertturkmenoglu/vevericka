<template>
  <v-container class="mx-auto mt-3 message-container" v-if="!otherUsername">
    <v-card flat>
      <v-row align="center" class="py-2 pr-3" no-gutters>
        <v-col>
          <h1 class="em-13 font-weight-light deep-orange--text">Recent Chats</h1>
        </v-col>
        <v-btn outlined color="deep-orange text--darken-2" class="font-weight-light mr-n3" @click="showNewChatDialog = !showNewChatDialog">New Chat</v-btn>
      </v-row>
    </v-card>

    <v-divider></v-divider>

    <div v-if="users.length > 0" class="mt-3">
      <div v-for="(u, idx) in users" :key="idx" @click="onCardClick(u)">
        <UserCard :user="u" class="card-style mb-3"/>
      </div>
    </div>
    <div v-else-if="!isLoading" class="mt-5 em-13 font-weight-light text-center">
      No chats
    </div>
    <v-dialog v-model="showNewChatDialog" scrollable max-width="600">
      <v-card>
        <v-card-title class="deep-orange text--darken-2 white--text">New Chat</v-card-title>
        <v-card-text>
          <div v-if="following.length <= 0" class="em-1 text-center">
            <span>No user</span>
          </div>
          <div v-else>
            <div v-for="(u, idx) in following" :key="idx" class="my-1 mx-5">
              <router-link :to="`/user/${u.username}`" @click="onCardClick(u)">
                <UserCard :user="u" class="card-style"/>
              </router-link>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange"/>
    </div>
  </v-container>

  <v-container class="mx-auto mt-5 message-container" v-else>
    <v-row align="center">
      <div class="font-weight-thin em-16 ml-3">{{ otherUsername }}</div>
    </v-row>
    <v-divider></v-divider>
    <div v-if="messages.length <= 0" class="em-14 font-weight-light text-center">
      <span>No messages</span>
    </div>
    <div v-else class="scrollable-content">
      <div v-for="(m, idx) in messages" :key="idx" class="my-1">
        <MessageCard :message="m" class="my-2"/>
      </div>
    </div>
    <v-col>
      <v-text-field
          v-model="newMessage"
          append-icon="mdi-send"
          rows="1"
          outlined
          flat
          solo
          dense
          class="ml-n3 mr-n3 font-weight-thin"
          color="deep-orange"
          label="Type a message"
          type="text"
          @keyup.enter.native="sendMessage"
          @click:append="sendMessage"/>
    </v-col>
  </v-container>
</template>

<script>
  import UserCard from "../components/UserCard";
  import MessageCard from "../components/Message/MessageCard";

  export default {
    name: "MessagesPage",
    components: {MessageCard, UserCard},
    data: () => ({
      user: {followers: [], following: [], bio: ""},
      otherUsername: '',
      followers: [],
      following: [],
      chats: [],
      users: [],
      messages: [],
      showNewChatDialog: false,
      newMessage: '',
      msgListener: {},
      isLoading: true,
    }),
    mounted() {
      this.fetchUser();
      this.fetchUserChats();
      this.msgListener = setInterval(() => {
        if (this.otherUsername === '') return;
        console.log('Fetching messages')
        this.fetchMessages()
      }, 15000);
    },
    beforeDestroy() {
      clearInterval(this.msgListener);
    },
    methods: {
      async sendMessage() {
        if (this.newMessage === "") return;
        let chatId = await this.getChatId();

        if (!chatId) {
          chatId = await this.createNewChat();
        }

        const BASE = "https://vevericka-message-service.herokuapp.com";
        const URL = `${BASE}/message/new_message/${chatId}`;

        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({content: this.newMessage, sent_by: this.username}),
        };

        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.status_code) {
          console.log('Send message status_code')
          return
        }

        this.messages = [...this.messages, data.message]
        this.newMessage = '';
      },
      async getChatId() {
        const BASE = "https://vevericka-message-service.herokuapp.com";
        const URL = `${BASE}/message/get_chat/${this.username}/${this.otherUsername}`;

        const response = await fetch(URL);
        const data = await response.json();

        if (data['chat']) {
          return data['chat']['_id'];
        }

        return undefined;
      },
      onCardClick(u) {
        this.showNewChatDialog = false;
        this.otherUsername = u.username;
      },
      async fetchUser() {
        const BASE_URL = "https://user-info-service.herokuapp.com/user";
        const URL = `${BASE_URL}/username/${this.username}`;
        const response = await fetch(URL);
        const data = await response.json();
        this.user = data.user[0];

        if (this.user.followers.length > 0) {
          this.followers = await this.getUsersFromUsernames(this.user.followers);
        }

        if (this.user.following.length > 0) {
          this.following = await this.getUsersFromUsernames(this.user.following);
        }
      },
      async fetchUserChats() {
        const BASE = "https://vevericka-message-service.herokuapp.com";
        const URL = `${BASE}/message/get_chats/${this.username}`;

        const response = await fetch(URL);
        const {chats} = await response.json();

        this.chats = chats;
        this.users = await this.getUsersFromUsernames(chats.map(c => c.fst !== this.username ? c.fst : c.snd));
        this.isLoading = false;
      },
      async getUsersFromUsernames(list) {
        if (list.length === 0) return [];
        const BASE = "https://user-info-service.herokuapp.com";
        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({list}),
        };

        const URL = `${BASE}/user/get_all_by_username/`;
        const response = await fetch(URL, requestOptions);
        const {users} = await response.json();

        return users;
      },
      async createNewChat() {
        if (this.otherUsername === '') return;

        const BASE = "https://vevericka-message-service.herokuapp.com";
        const URL = `${BASE}/message/new_chat`;

        const requestOptions = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({'fst': this.username, 'snd': this.otherUsername}),
        };

        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if (data.status_code) {
          return;
        }

        return data?.chat?._id;
      },
      async fetchMessages() {
        const BASE = "https://vevericka-message-service.herokuapp.com";
        const URL = `${BASE}/message/get_messages/${this.username}/${this.otherUsername}`;

        const response = await fetch(URL);
        const data = await response.json();

        if (data.status_code) return;

        this.messages = data.messages;
      }
    },
    computed: {
      name() {
        return this.$store.state.user.name;
      },
      username() {
        return this.$store.state.user.username;
      },
    },
    watch: {
      otherUsername() {
        if (this.otherUsername === '') return;
        this.fetchMessages()
      }
    }
  };
</script>

<style>
  .card-style {
    cursor: pointer;
  }

  .scrollable-content {
    height: 65vh;
    overflow: auto;
  }

  a {
    text-decoration: none;
  }

  .message-container {
    width: min(1000px, calc(70% + 100px));
  }

  .em-1 {
    font-size: 1em;
  }

  .em-13 {
    font-size: 1.3em;
  }

  .em-16 {
    font-size: 1.6em;
  }
</style>
