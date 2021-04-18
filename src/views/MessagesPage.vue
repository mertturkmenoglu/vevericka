<template>
  <!-- List of Chats-->
  <v-container class="mx-auto mt-3 message-container" v-if="!chatId">
    <v-card flat>
      <v-row align="center" class="py-2 pr-3" no-gutters>
        <v-col>
          <h1 class="em-13 font-weight-light deep-orange--text">{{ $t('messages_page.title') }}</h1>
        </v-col>
        <v-btn outlined color="deep-orange" class="font-weight-light mr-n3"
               @click="showNewChatDialog = !showNewChatDialog">
          {{ $t('messages_page.new_chat') }}
        </v-btn>
      </v-row>
    </v-card>

    <v-divider></v-divider>

    <div v-if="chats.length > 0" class="mt-2">
      <div v-for="(c, idx) in chats" :key="idx">
        <v-card @click="selectChat(c)" class="mt-2" flat outlined>
          <v-card-title>
            {{ c.chatName }}
          </v-card-title>
          <v-card-subtitle>{{ getChatUsersNamesConcatenated(c) }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="text-caption">{{ getFormattedChatUpdatedAtDate(c) }}</v-card-text>
          <pre></pre>
        </v-card>
      </div>
    </div>

    <div v-else-if="!isLoading" class="mt-5 em-13 font-weight-light text-center">
      {{ $t('messages_page.no_chat') }}
    </div>

    <v-dialog v-model="showNewChatDialog" v-if="!isLoading" scrollable max-width="600">
      <v-card>
        <v-card-title class="deep-orange text--darken-2 white--text">
          {{ $t('messages_page.dialog.title') }}
        </v-card-title>
        <v-card-text>
          <div v-if="user.following.length <= 0" class="em-1 text-center">
            <span>{{ $t('messages_page.dialog.no_user') }}</span>
          </div>
          <div v-else>
            <div v-for="(u, idx) in user.following" :key="idx" class="mx-5">
              <v-checkbox
                v-model="newChatUsers"
                color="deep-orange"
                :label="u.name"
                :value="u._id"
              />
            </div>
          </div>
        </v-card-text>
        <v-card-actions v-if="user.following.length > 0">
          <v-btn
              text
              class="deep-orange--text"
              block
              @click="startNewChat"
              :disabled="newChatUsers.length < 1"
          >
            {{ $t('messages_page.dialog.action') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange"/>
    </div>
  </v-container>

  <!-- Chat page -->
  <v-container v-else-if="chat" class="mx-auto mt-5 message-container">
    <v-card flat class="chat-top">
      <v-card-title>
        <v-btn icon @click="goBackToChatList">
          <v-icon color="deep-orange">mdi-arrow-left</v-icon>
        </v-btn>
        <div class="font-weight-thin em-16 ml-3">{{ chat.chatName }}</div>
        <v-spacer></v-spacer>
        <v-btn text @click="showEditChatDialog = true">
          <v-icon color="deep-orange">mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
    </v-card>
    <div class="main-content">
      <div v-if="messages.length <= 0" class="em-14 font-weight-light mx-auto">
        <span>No messages</span>
      </div>
      <div v-else class="messages" id="messages">
        <div v-for="(m, idx) in messages" :key="idx" class="my-1">
          <MessageCard :message="m" class="my-2 mx-8"/>
        </div>
      </div>
    </div>
    <div class="message-text-area">
      <v-text-field
          v-model="newMessage"
          append-icon="mdi-send"
          rows="1"
          outlined
          flat
          solo
          dense
          class="font-weight-thin"
          color="deep-orange"
          :label="$t('messages_page.chat.text_field')"
          type="text"
          @keyup.enter.native="sendMessage"
          @click:append="sendMessage"/>
    </div>

    <v-dialog v-model="showEditChatDialog" scrollable max-width="600">
      <v-card>
        <v-card-title class="deep-orange white--text">
          Edit Chat
        </v-card-title>
        <v-card-text>
          <v-text-field
              class="pt-5"
              v-model="chat.chatName"
              label="Chat Name"
              color="deep-orange"
              dense
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
              text
              class="deep-orange--text"
              block
              @click="editChat"
          >
            Update Chat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { format } from 'date-fns';
import UserCard from "../components/UserCard.vue";
import MessageCard from "../components/Message/MessageCard.vue";
import {Component, Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser} from "@/api/responses/IUser";
import UserService from "@/api/user";
import MessageService from "@/api/message";
// eslint-disable-next-line no-unused-vars
import IChat from "@/api/responses/IChat";
// eslint-disable-next-line no-unused-vars
import IMessage from "@/api/responses/IMessage";

@Component({
  components: {MessageCard, UserCard},
})
export default class MessagesPage extends Vue {
  user?: IUser
  chatId: string = ''
  chat?: IChat = undefined
  chats: IChat[] = []
  messages: IMessage[] = []
  showNewChatDialog: boolean = false
  newMessage: string = ''
  isLoading: boolean = true
  newChatUsers: string[] = []
  showEditChatDialog: boolean = false

  mounted() {
    this.fetchUser().then(async () => {
      await this.fetchUserChats()
      this.isLoading = false;
    })
  }

  get name() {
    return this.$store.state.user.name;
  }

  get username() {
    return this.$store.state.user.username;
  }

  @Watch('chatId')
  async chatIdChanged() {
    if (this.chatId === '') {
      return
    }

    await this.fetchChatMessages();
  }

  async fetchUser() {
    try {
      this.user = await UserService.getUserByUsername(this.username)
    } catch (e) {
      console.error(e)
    }
  }

  async fetchUserChats() {
    try {
      this.chats = await MessageService.getUserChats(this.username)
    } catch (e) {
      console.error(e)
      this.chats = []
    }
  }

  async fetchChatMessages() {
    try {
      this.messages = await MessageService.getChatMessages(this.chatId)
      this.messages = this.messages.reverse()
    } catch (e) {
      console.error(e)
      this.messages = []
    }
  }

  selectChat(c: IChat) {
    this.chatId = c._id
    this.chat = c
  }

  async sendMessage() {
    try {
      await MessageService.createMessage({
        chat: this.chatId,
        content: this.newMessage,
        sender: this.$store.state.user.userId,
      })
      await this.fetchChatMessages()
      this.newMessage = ''
    } catch (e) {
      console.error(e)
    }
  }

  async editChat() {
    try {
      if (this.chat) {
        await MessageService.updateChatName({
          chat: this.chatId,
          chatName: this.chat.chatName,
        })
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  }

  async startNewChat() {
    const userId = this.$store.state.user.userId;
    const users = [userId, ...this.newChatUsers];
    const isGroupChat = users.length > 2;
    const dto = {
      createdBy: userId,
      users,
      isGroupChat,
    }

    try {
      await MessageService.createChat(dto)
      this.showNewChatDialog = false;
      this.chatId = '';
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  }

  getImage(src: string): string {
    if (src === 'chat.png') {
      return '/chat.png';
    } else {
      return src;
    }
  }

  getFormattedChatUpdatedAtDate(c: IChat): string {
    return format(new Date(c.updatedAt), 'dd/MM/yyy HH:mm');
  }

  getChatUsersNamesConcatenated(c: IChat): string {
    const limit = Math.min(3, c.users.length);
    const firstUsers = c.users.slice(0, limit);
    const concatenated = firstUsers.map(user => user.name).join(', ');

    if (c.users.length <= 3) {
      return concatenated;
    }

    return `${concatenated} ...`
  }

  async goBackToChatList() {
    this.chatId = ''
    this.chat = undefined;
    this.messages = [];
    this.newMessage = '';
    this.chats = [];
    await this.fetchUserChats();
  }
}
</script>

<style>
a {
  text-decoration: none;
}

.message-container {
  width: min(1000px, calc(70% + 100px));
  height: 85vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1 1 0;
  padding: 2rem 0;
  overflow-y: hidden;
}

.messages {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
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
