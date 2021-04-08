<template>
  <v-container class="mx-auto mt-3 message-container" v-if="!otherUsername">
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

    <div v-if="chats.length > 0" class="mt-3">
      <div v-for="(c, idx) in chats" :key="idx">
        <v-card @click="selectChat(c)">
          <v-card-title>
          {{ c.chatName }}
          </v-card-title>
          <v-card-subtitle>{{ c.users.map(it => it.name).join(', ') }}</v-card-subtitle>
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
            <div v-for="(u, idx) in user.following" :key="idx" class="my-1 mx-5">
              <div @click="onCardClick(u)">
                <UserCard :user="u" class="card-style" />
              </div>
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
          :label="$t('messages_page.chat.text_field')"
          type="text"/>
      <!--          @keyup.enter.native="sendMessage"-->
      <!--          @click:append="sendMessage"/>-->
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "../components/UserCard.vue";
import MessageCard from "../components/Message/MessageCard.vue";
import {Component, Watch} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {IUser, UserPopulated} from "@/api/responses/IUser";
import UserService from "@/api/user";
import MessageService from "@/api/message";
// eslint-disable-next-line no-unused-vars
import IChat from "@/api/responses/IChat";

@Component({
  components: {MessageCard, UserCard},
})
export default class MessagesPage extends Vue {
  user?: IUser
  otherUsername: string = ''
  chats: IChat[] = []
  users = []
  messages = []
  showNewChatDialog: boolean = false
  newMessage: string = ''
  isLoading: boolean = true

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

  @Watch('otherUsername')
  async otherUsernameChanged() {
    if (this.otherUsername === '') {
      return
    }
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

  selectChat(c: IChat) {
    console.log(c)
  }

  async onCardClick(u: UserPopulated) {
    const uid = this.$store.state.user.userId

    const dto = {
      createdBy: uid,
      users: [u._id, uid],
      isGroupChat: false,
    };

    try {
      await MessageService.createChat(dto)
      this.showNewChatDialog = false;
      this.otherUsername = u.username;
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
}
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
