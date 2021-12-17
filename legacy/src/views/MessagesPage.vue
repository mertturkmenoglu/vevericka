<template>
  <!-- List of Chats-->
  <v-container v-if="!chatId" class="mt-3 message-container">
    <v-card flat>
      <v-card-title>
        <h2 class="font-weight-light deep-orange--text">
          {{ $t("messages_page.title") }}
        </h2>
        <v-spacer />
        <v-btn
          class="font-weight-light"
          text
          color="deep-orange"
          @click="showNewChatDialog = !showNewChatDialog"
        >
          {{ $t("messages_page.new_chat") }}
        </v-btn>
      </v-card-title>
    </v-card>

    <div v-if="chats.length > 0" class="mt-2">
      <div v-for="(c, idx) in chats" :key="idx">
        <v-card class="mt-2" flat @click="selectChat(c)">
          <v-card-title>
            <div v-for="u in c.users.slice(0, 2)" :key="u._id">
              <v-avatar size="32" :class="idx !== 0 && 'ml-n3'" color="white">
                <v-img :src="u.image" :alt="u.name" contain aspect-ratio="1" />
              </v-avatar>
            </div>
            <div class="ml-3">
              {{ c.chatName }}
            </div>
            <v-spacer />
            <div class="text-caption text--disabled hidden-xs-only">
              {{ getFormattedChatUpdatedAtDate(c) }}
            </div>
          </v-card-title>
          <v-card-text>
            {{
              c.lastMessage !== null ? c.lastMessage.content : $t("messages_page.chat.text_field")
            }}
          </v-card-text>
          <v-divider v-if="idx !== chats.length - 1" />
        </v-card>
      </div>
    </div>

    <div v-else-if="!isLoading" class="mt-5 em-13 font-weight-light text-center">
      {{ $t("messages_page.no_chat") }}
    </div>

    <v-dialog v-if="!isLoading" v-model="showNewChatDialog" scrollable max-width="600">
      <v-card>
        <v-card-title class="deep-orange text--darken-2 white--text">
          {{ $t("messages_page.dialog.title") }}
        </v-card-title>
        <v-card-text>
          <div v-if="user.following.length <= 0" class="em-1 text-center">
            <span>{{ $t("messages_page.dialog.no_user") }}</span>
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
            :disabled="newChatUsers.length < 1"
            @click="startNewChat"
          >
            {{ $t("messages_page.dialog.action") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-show="isLoading" class="py-3 text-center">
      <v-progress-circular indeterminate color="deep-orange" />
    </div>
  </v-container>

  <!-- Chat page -->
  <v-container v-else-if="chat" class="mx-auto mt-5 message-container">
    <v-card flat class="chat-top">
      <v-card-title>
        <v-btn icon color="deep-orange" @click="goBackToChatList">
          <v-icon color="deep-orange"> mdi-arrow-left </v-icon>
        </v-btn>
        <div class="font-weight-thin em-16 ml-3">
          {{ chat.chatName }}
        </div>

        <v-spacer />

        <!-- Chat options menu -->
        <v-menu left bottom nudge-left="24" nudge-bottom="48" transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs, value }">
            <v-btn icon v-bind="attrs" color="deep-orange" aria-label="Menu" v-on="on">
              <v-avatar size="40">
                <v-icon color="deep-orange" size="32">
                  {{ value ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <!-- Edit Chat Name -->
          <v-list flat class="text-decoration-none font-weight-light" dense>
            <v-list-item @click="showEditChatDialog = true">
              <v-list-item-icon>
                <v-icon color="deep-orange"> mdi-pencil </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("messages_page.chat_options.edit_chat_name") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Edit Users -->
            <v-list-item @click="showEditChatUsersDialog = true">
              <v-list-item-icon>
                <v-icon color="deep-orange"> mdi-account-group </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("messages_page.chat_options.users") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- Delete Chat -->
            <v-list-item @click="showDeleteChatDialog = true">
              <v-list-item-icon>
                <v-icon color="red"> mdi-delete-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t("messages_page.chat_options.delete_chat") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider />
    </v-card>

    <!-- Messages container -->
    <div class="main-content">
      <div v-if="messages.length <= 0" class="em-14 font-weight-light mx-auto">
        <span>No messages</span>
      </div>
      <div v-else id="messages" class="messages">
        <div v-for="(m, idx) in messages" :key="idx" class="my-2 mx-8">
          <MessageCard :message="m" class="my-2" />
          <v-divider v-if="idx !== 0" class="mx-8" />
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
        @keyup.enter="sendMessage"
        @click:append="sendMessage"
      />
    </div>

    <!-- Edit chat name dialog -->
    <v-dialog v-model="showEditChatDialog" scrollable max-width="600">
      <v-card>
        <v-card-title class="deep-orange white--text">
          {{ $t("messages_page.edit_chat_name_dialog.title") }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="chat.chatName"
            class="pt-5"
            :label="$t('messages_page.edit_chat_name_dialog.text_field_label')"
            color="deep-orange"
            dense
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text class="deep-orange--text" block @click="editChat">
            {{ $t("messages_page.edit_chat_name_dialog.action") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit chat users dialog -->
    <v-dialog v-model="showEditChatUsersDialog" scrollable max-width="600">
      <v-card flat>
        <v-card-title class="deep-orange white--text">
          {{
            showChatUsersFlag
              ? $t("messages_page.edit_chat_users_dialog.title.current_users")
              : $t("messages_page.edit_chat_users_dialog.title.add_user")
          }}
        </v-card-title>
        <v-card-text>
          <div v-if="showChatUsersFlag">
            <v-btn text block color="deep-orange" class="mt-2" @click="showChatUsersFlag = false">
              {{ $t("messages_page.edit_chat_users_dialog.actions.add_new_user") }}
            </v-btn>
            <!-- Current Users -->
            <div v-for="user in chat.users" :key="user._id" class="mt-4">
              <v-chip
                close
                close-icon="mdi-close"
                label
                outlined
                @click:close="removeUserFromChat(user)"
              >
                {{ user.name }}
              </v-chip>
            </div>
          </div>
          <div v-else>
            <v-btn text block color="deep-orange" class="mt-2" @click="showChatUsersFlag = true">
              {{ $t("messages_page.edit_chat_users_dialog.actions.view_users") }}
            </v-btn>
            <!-- Add user -->
            <div v-if="userFollowingFilterNotInChat().length <= 0" class="em-1 text-center">
              <span>{{ $t("messages_page.dialog.no_user") }}</span>
            </div>
            <div v-else>
              <div v-for="(u, idx) in userFollowingFilterNotInChat()" :key="idx" class="mx-5">
                <v-btn outlined text class="p-2 mt-2" @click="addUserToChat(u)">
                  {{ u.name }}
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteChatDialog" width="400">
      <v-card>
        <v-card-title class="font-weight-light">
          {{ $t("messages_page.delete_chat_dialog.title") }}
        </v-card-title>

        <v-card-text>
          {{ $t("messages_page.delete_chat_dialog.content") }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="showDeleteChatDialog = false">
            {{ $t("messages_page.delete_chat_dialog.actions.cancel") }}
          </v-btn>
          <v-btn color="red" text @click="deleteChat">
            {{ $t("messages_page.delete_chat_dialog.actions.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';
import { Component, Watch } from 'vue-property-decorator';
import UserCard from '../components/UserCard.vue';
import MessageCard from '../components/Message/MessageCard.vue';
import IUser, { UserPopulated } from '@/api/responses/IUser';
import UserService from '@/api/user';
import MessageService from '@/api/message';
import IChat, { ChatUser } from '@/api/responses/IChat';
import IMessage from '@/api/responses/IMessage';

@Component({
  components: { MessageCard, UserCard },
})
export default class MessagesPage extends Vue {
  user?: IUser;

  chatId = '';

  chat?: IChat = undefined;

  chats: IChat[] = [];

  messages: IMessage[] = [];

  showNewChatDialog = false;

  newMessage = '';

  isLoading = true;

  newChatUsers: string[] = [];

  showEditChatDialog = false;

  showEditChatUsersDialog = false;

  showChatUsersFlag = true;

  showDeleteChatDialog = false;

  mounted(): void {
    this.fetchUser().then(async () => {
      await this.fetchUserChats();
      this.isLoading = false;
    });
  }

  get name(): string {
    return this.$store.state.user.name;
  }

  get username(): string {
    return this.$store.state.user.username;
  }

  userFollowingFilterNotInChat(): UserPopulated[] | undefined {
    return this.user?.following.filter((u) => !this.chat?.users.some((it) => it._id === u._id));
  }

  @Watch('chatId')
  async chatIdChanged(): Promise<void> {
    if (this.chatId === '') {
      return;
    }

    await this.fetchChatMessages();
  }

  async fetchUser(): Promise<void> {
    try {
      this.user = await UserService.getUserByUsername(this.username);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchUserChats(): Promise<void> {
    try {
      this.chats = await MessageService.getUserChats(this.username);
    } catch (e) {
      console.error(e);
      this.chats = [];
    }
  }

  async fetchChatMessages(): Promise<void> {
    try {
      this.messages = await MessageService.getChatMessages(this.chatId);
      this.messages = this.messages.reverse();
    } catch (e) {
      console.error(e);
      this.messages = [];
    }
  }

  selectChat(c: IChat): void {
    this.chatId = c._id;
    this.chat = c;
  }

  async sendMessage(): Promise<void> {
    try {
      await MessageService.createMessage({
        chat: this.chatId,
        content: this.newMessage,
        sender: this.$store.state.user.userId,
      });
      await this.fetchChatMessages();
      this.newMessage = '';
    } catch (e) {
      console.error(e);
    }
  }

  async editChat(): Promise<void> {
    try {
      if (this.chat) {
        await MessageService.updateChatName({
          chat: this.chatId,
          chatName: this.chat.chatName,
        });
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async startNewChat(): Promise<void> {
    const { userId } = this.$store.state.user;
    const users = [userId, ...this.newChatUsers];
    const isGroupChat = users.length > 2;
    const dto = {
      createdBy: userId,
      users,
      isGroupChat,
    };

    try {
      await MessageService.createChat(dto);
      this.showNewChatDialog = false;
      this.chatId = '';
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  getImage(src: string): string {
    if (src === 'chat.png') {
      return '/chat.png';
    }
    return src;
  }

  getFormattedChatUpdatedAtDate(c: IChat): string {
    return format(new Date(c.updatedAt), 'dd/MM/yyy HH:mm');
  }

  getChatUsersNamesConcatenated(c: IChat): string {
    const limit = Math.min(3, c.users.length);
    const firstUsers = c.users.slice(0, limit);
    const concatenated = firstUsers.map((user) => user.name).join(', ');

    if (c.users.length <= 3) {
      return concatenated;
    }

    return `${concatenated} ...`;
  }

  async goBackToChatList(): Promise<void> {
    this.chatId = '';
    this.chat = undefined;
    this.messages = [];
    this.newMessage = '';
    this.chats = [];
    this.showEditChatDialog = false;
    this.showEditChatUsersDialog = false;
    this.showChatUsersFlag = true;
    this.isLoading = true;
    await this.fetchUserChats();
    this.isLoading = false;
  }

  async removeUserFromChat(user: ChatUser): Promise<void> {
    try {
      await MessageService.removeUserFromChat({
        userId: user._id,
        chatId: this.chatId,
      });
      await this.goBackToChatList();
    } catch (e) {
      console.error(e);
    }
  }

  async addUserToChat(user: UserPopulated): Promise<void> {
    try {
      await MessageService.addUserToChat({
        userId: user._id,
        chatId: this.chatId,
      });
      await this.goBackToChatList();
    } catch (e) {
      console.error(e);
    }
  }

  async deleteChat(): Promise<void> {
    try {
      await MessageService.deleteChat(this.chatId);
      this.showDeleteChatDialog = false;
      await this.goBackToChatList();
    } catch (e) {
      console.error(e);
    }
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
