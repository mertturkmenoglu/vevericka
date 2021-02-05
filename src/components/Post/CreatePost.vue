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
      <span class="ml-5 font-weight-light text--primary">{{ user.name }}</span>
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
        label="Say what you must, don't leave it there."
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
        Post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CreatePost",
  components: {},
  props: ['user'],
  data: () => ({
    postTextAreaRules: [v => v.length <= 255 || 'Max 255 characters'],
    postContent: '',
  }),
  methods: {
    async createPost() {
      if (this.postContent.length > 255 || this.postContent.length === 0) {
        return;
      }

      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/post/`;

      const requestBody = {
        content: this.postContent,
        comments: [],
        username: this.user.username,
        date: (new Date()).toISOString(),
        countdown: 24
      }

      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
      };

      await fetch(URL, requestOptions);
      this.postContent = '';
      this.$emit("postCreated");
    }
  },
  computed: {
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