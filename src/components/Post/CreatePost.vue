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
      <span class="ml-5 font-weight-light">{{user.name}}</span>
      <span class="ml-2 font-weight-thin">@{{user.username}}</span>
    </v-card-title>
    <v-textarea
        flat
        rows="2"
        clearable
        auto-grow
        no-resize
        solo
        background-color="#f0f2f5"
        clear-icon="mdi-close-circle"
        counter

        color="deep-orange text--darken-2"
        type="text"
        name="create-post-text-area"
        :rules="postTextAreaRules"
        label="Say what you must, don't leave it there."
        v-model="postContent"
    />

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn outlined small tile plain color="deep-orange text--darken-2" class="mr-n2" @click="createPost">
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
  }
}
</script>

<style scoped>

</style>