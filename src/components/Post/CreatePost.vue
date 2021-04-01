<template>
  <v-card class="pt-5 px-5" outlined>
    <v-card-title>
      <v-avatar size="40" class="ml-n3">
        <v-img
            class="rounded-circle"
            :src="user.image"
            contain
            width="12"
            aspect-ratio="1"
            alt="Profile"/>
      </v-avatar>
      <span class="ml-5 font-weight-light text--primary hidden-sm-and-down">{{ user.name }}</span>
      <span class="ml-2 font-weight-thin text--primary">@{{ user.username }}</span>
    </v-card-title>
    <v-textarea
        v-model="postContent"
        flat
        rows="2"
        clearable
        auto-grow
        no-resize
        solo
        class="text--primary"
        :background-color="textFieldBackground"
        clear-icon="mdi-close-circle"
        counter
        color="deep-orange"
        type="text"
        name="create-post-text-area"
        :rules="postTextAreaRules"
        :label="$t('home_page.post_create.post_text_field')"
        @click:clear="postContent = ''"
    />

    <v-card-actions>
      <v-spacer></v-spacer>
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
          outlined
          small
          tile
          plain
          color="deep-orange"
          class="mr-n2"
          :disabled="typingProgress > 100"
          @click="createPost">
        {{ $t('home_page.post_create.post_button') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostService from "@/api/post";

export default {
  name: "CreatePost",
  components: {},
  props: ['user'],
  data: () => ({
    postContent: '',
  }),
  methods: {
    async createPost() {
      if (this.postContent.length > 255 || this.postContent.length === 0) {
        return;
      }

      try {
        await PostService.createPost({
          createdBy: this.$store.state.user.userId,
          content: this.postContent,
        });
        this.postContent = '';
        this.$emit("postCreated");
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    postTextAreaRules() {
      return [v => v.length <= 255 || this.postTextAreaError]
    },
    postTextAreaError() {
      return this.$t('home_page.post_create.post_character_limit_error')
    },
    typingProgress() {
      const MAX_CHARACTERS = 255;
      return this.postContent.length / MAX_CHARACTERS * 100;
    },
    textFieldBackground() {
      if (this.$vuetify.theme.dark) {
        return '#272727';
      } else {
        return '#f0f2f5';
      }
    }
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>