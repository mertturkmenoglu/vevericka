<template>
  <v-card class="pt-5 px-5">
    <v-row>
      <v-col cols="6" xs="6" sm="6" md="2" lg="1" class="mx-auto hidden-md-and-down">
        <v-img
            class="rounded-circle mx-auto mt-2"
            :src="user.image"
            aspect-ratio="1"
            elevation="12"
            alt="User image"
        />
      </v-col>

    <v-textarea
        outlined
        rows="3"
        clearable
        no-resize
        clear-icon="mdi-close-circle"
        counter
        color="deep-orange text--darken-2"
        type="text"
        name="create-post-text-area"
        :rules="postTextAreaRules"
        label="Say what you must, don't leave it there."
        v-model="postContent"
        append-outer-icon="mdi-send"
        @click:append-outer="createPost"
    />
    </v-row>
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
      if (this.postContent.length > 255) {
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