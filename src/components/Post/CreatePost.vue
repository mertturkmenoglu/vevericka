<template>
  <v-card
    class="px-5"
    flat
  >
    <v-card-title>
      <v-avatar
        size="40"
        class="ml-n3"
      >
        <v-img
          class="rounded-circle"
          :src="user.image"
          contain
          width="12"
          aspect-ratio="1"
          alt="Profile"
        />
      </v-avatar>
      <span class="ml-5 font-weight-light text--primary hidden-sm-and-down">{{ user.name }}</span>
      <span class="ml-2 font-weight-thin text--primary">@{{ user.username }}</span>
    </v-card-title>
    <v-textarea
      v-model="postContent"
      flat
      rows="2"
      row-height="12"
      clearable
      auto-grow
      no-resize
      class="text--primary"
      clear-icon="mdi-close-circle"
      counter
      color="deep-orange"
      type="text"
      name="create-post-text-area"
      :rules="postTextAreaRules()"
      :label="$t('home_page.post_create.post_text_field')"
      @click:clear="postContent = ''"
    />

    <v-card-actions>
      <v-spacer />
      <transition name="fade">
        <v-progress-circular
          v-if="typingProgress !== 0"
          :value="typingProgress"
          :color="typingProgress <= 100 ? 'deep-orange' : 'black'"
          size="28"
          rotate="270"
          class="mr-2"
        />
      </transition>
      <v-btn
        text
        small
        rounded
        plain
        color="deep-orange"
        class="mr-n2"
        :disabled="typingProgress > 100"
        @click="createPost"
      >
        {{ $t('home_page.post_create.post_button') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import PostService from '@/api/post';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import IUser from '@/api/responses/IUser';
import VueI18n from 'vue-i18n';
import LocaleMessages = VueI18n.LocaleMessages;

@Component({})
export default class CreatePost extends Vue {
  @Prop({ required: true }) user!: IUser;
  postContent = '';

  postTextAreaRules(): [(v: string) => boolean | (() => string | LocaleMessages)] {
    return [(v: string): boolean | (() => string | LocaleMessages) => v.length <= 255 || this.postTextAreaError];
  }

  postTextAreaError(): string {
    return this.$t('home_page.post_create.post_character_limit_error').toString();
  }

  get typingProgress(): number {
    const MAX_CHARACTERS = 255;
    return this.postContent.length / MAX_CHARACTERS * 100;
  }

  async createPost(): Promise<void> {
    if (this.postContent.length > 255 || this.postContent.length === 0) {
      return;
    }

    try {
      await PostService.createPost({
        createdBy: this.$store.state.user.userId,
        content: this.postContent,
      });
      this.postContent = '';
      this.$emit('postCreated');
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
