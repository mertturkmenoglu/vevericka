<template>
  <v-container>
    <v-btn text color="deep-orange" depressed tile>
      <h2 class="font-weight-light deep-orange--text">Notifications</h2>
      <v-icon color="deep-orange" right> mdi-bell-outline </v-icon>
    </v-btn>

    <div v-if="isLoading" class="text-center mt-2">
      <v-progress-circular indeterminate color="deep-orange" />
    </div>
    <div v-else class="mt-2">
      <div v-if="notifications.length > 0">
        <div v-for="(notification, idx) in notifications" :key="notification._id">
          <NotificationCard
            :notification="notification"
            class="mt-2"
            @delete-notification="notificationDeleted"
          />
          <v-divider v-if="idx !== notifications.length - 1" />
        </div>
      </div>
      <div v-else class="text-center">
        <h2 class="font-weight-light deep-orange--text">No notifications</h2>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotificationService from '@/api/notification';
import NotificationCard from '@/components/Notification/NotificationCard.vue';
import INotification from '@/api/responses/INotification';

@Component({
  components: { NotificationCard },
})
export default class NotificationsPage extends Vue {
  notifications: INotification[] = [];

  isLoading = true;

  mounted(): void {
    this.fetchNotifications().then(async () => {
      this.isLoading = false;
    });
  }

  async fetchNotifications(): Promise<void> {
    try {
      this.notifications = await NotificationService.getNotifications(
        this.$store.state.user.username,
      );
    } catch (e) {
      console.error(e);
    }
  }

  async notificationDeleted(): Promise<void> {
    this.isLoading = true;
    await this.fetchNotifications();
    this.isLoading = false;
  }
}
</script>

<style scoped></style>
