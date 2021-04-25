<template>
  <v-card
    class="px-4"
    flat
  >
    <v-card-title class="my-n3">
      <v-avatar
        size="24"
        class=""
      >
        <v-img
          class="rounded-circle"
          :src="message.sender.image"
          contain
          width="6"
          aspect-ratio="1"
          alt="Profile"
        />
      </v-avatar>
      <div
        class="font-weight-light em-08 ml-2"
        :class="[ isThisUser ? 'this-user' : 'other-user']"
      >
        {{ isThisUser ? 'You' : message.sender.name }}
      </div>
      <v-spacer />
      <div class="font-weight-light text-caption em-08">
        {{ getFormattedMessageTime }}
      </div>
    </v-card-title>

    <v-card-text class="font-weight-light ml-8">
      {{ message.content }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {format} from 'date-fns';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import IMessage from '@/api/responses/IMessage';

@Component({})
export default class MessageCard extends Vue {
  @Prop({ required: true }) message!: IMessage

  get isThisUser(): boolean {
    return this.$store.state.user.userId === (this.message.sender as unknown as { _id: string })._id;
  }

  get getFormattedMessageTime(): string {
    return format(new Date(this.message.createdAt), 'HH:mm, dd/MM/yyyy');
  }
}
</script>

<!--suppress CssUnusedSymbol -->
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
