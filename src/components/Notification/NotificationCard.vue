<template>
  <v-card flat>
    <v-card-title>
      <v-avatar
        size="40"
        class="ml-n3"
      >
        <v-img
          class="rounded-circle"
          :src="userImage"
          contain
          width="12"
          aspect-ratio="1"
          alt="Profile"
        />
      </v-avatar>
      <div class="ml-3">
        {{ notification.origin.name }}
      </div>

      <v-spacer />
      <v-btn
        icon
        color="deep-orange"
        @click="deleteNotification"
      >
        <v-icon color="deep-orange">
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>
    <router-link :to="notificationDirection">
      <v-card-text class="ml-10">
        {{ notificationText }}
      </v-card-text>
    </router-link>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Emit, Prop} from 'vue-property-decorator';
import NotificationService, {NotificationType} from '@/api/notification';
import INotification from '@/api/responses/INotification';

@Component({})
export default class NotificationCard extends Vue{
  @Prop({ required: true }) notification!: INotification

  get userImage(): string {
    const img = this.notification.origin.image;
    if (img === 'profile.png') {
      return '/profile.png';
    } else {
      return img;
    }
  }

  get notificationText(): string {
    if (this.notification.type === NotificationType.ON_MENTION) {
      return this.notification.origin.username + ' mentioned you in a post';
    } else if (this.notification.type === NotificationType.ON_USER_FOLLOW) {
      return this.notification.origin.username + ' started following you';
    }
    return '';
  }

  get notificationDirection(): string {
    if (this.notification.type === NotificationType.ON_MENTION) {
      return `/post/${this.notification.metadata}`;
    } else if (this.notification.type === NotificationType.ON_USER_FOLLOW) {
      return `/user/${this.notification.metadata}`;
    }
    return '/';
  }

  @Emit()
  async deleteNotification(): Promise<void> {
    try {
      await NotificationService.deleteNotification(this.notification._id);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
