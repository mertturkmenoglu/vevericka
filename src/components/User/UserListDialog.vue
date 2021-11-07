<template>
  <v-dialog
    v-model="showList"
    scrollable
    max-width="600"
  >
    <v-card>
      <v-card-title class="deep-orange text--darken-2 white--text">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <div
          v-if="list.length <= 0"
          class="em-1 text-center"
        >
          <span>{{ $t('user_list_dialog.no_user') }}</span>
        </div>
        <div v-else>
          <div
            v-for="(u, idx) in list"
            :key="idx"
            class="my-1 mx-5"
          >
            <router-link
              :to="`/user/${u.username}`"
              @click="onItemClick"
            >
              <UserCard
                :user="u"
                class="card-style"
              />
            </router-link>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import UserCard from '@/components/UserCard.vue';
import IUser from '@/api/responses/IUser';

@Component({
  components: {
    UserCard,
  },
})
export default class UserListDialog extends Vue {
  @Prop({ required: true }) title!: string;

  @Prop({ required: true }) list!: IUser[];

  @Prop({ required: true }) onItemClick!: () => never

  showList = true

  @Watch('showList')
  showListWatch(): void {
    this.onItemClick();
  }
}
</script>

<style scoped>
  .card-style {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
</style>
