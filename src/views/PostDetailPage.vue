<template>
  <v-container>
    <div v-if="!loading">
      <PostCard :post="post" class="mb-2" @shareLinkCopied="linkCopied"/>
      <v-card class="pt-5 px-5 mb-8" outlined flat>
        <v-textarea
            flat
            rows="1"
            clearable
            no-resize
            solo
            :background-color="textFieldBackground"
            clear-icon="mdi-close-circle"
            counter
            color="deep-orange"
            type="text"
            name="create-post-text-area"
            :rules="commentTextAreaRules"
            :label="$t('post_detail_page.add_comment')"
            v-model="commentContent"
            append-icon="mdi-send"
            @click:append="createComment"
        />
      </v-card>

      <div v-for="comment in comments" :key="comment.id">
        <CommentCard :comment="comment" class="my-2"/>
      </div>
    </div>
    <div v-else>
      <div v-show="loading" class="py-3 text-center">
        <v-progress-circular indeterminate color="deep-orange text--darken-2"/>
      </div>
    </div>

    <v-snackbar v-model="snackbar" bottom right>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          {{ $t('post_detail_page.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import PostCard from "@/components/Post/PostCard";
import CommentCard from "@/components/Post/CommentCard";

export default {
  name: "PostDetailPage",
  components: {PostCard, CommentCard},
  data: () => ({
    post: {
      id: "",
      content: "",
      comments: [],
      username: "",
      date: "",
      countdown: 0,
    },
    loading: true,
    snackbar: false,
    snackbarMessage: "",
    commentContent: '',
    comments: []
  }),
  methods: {
    async fetchPost() {
      const BASE = "https://vevericka-post-service.herokuapp.com/post";
      const URL = `${BASE}/${this.id}`;
      const response = await fetch(URL);
      const {data} = await response.json();
      this.post = data;
    },
    async fetchComments() {
      for (const commentId of this.post.comments) {
        const comment = await this.fetchComment(commentId);
        this.comments.push(comment)
      }
      this.comments = this.comments.reverse();
    },
    async fetchComment(commentId) {
      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/post/comment/${commentId}`;
      const response = await fetch(URL);
      const { data } = await response.json();
      return data;
    },
    async createComment() {
      if (this.commentContent.length > 255 || this.commentContent.length === 0) {
        return;
      }

      const requestBody = {
        postId: this.id,
        content: this.commentContent,
        username: this.$store.state.user.username,
        date: (new Date()).toISOString()
      }

      const BASE = "https://vevericka-post-service.herokuapp.com";
      const URL = `${BASE}/post/comment/`;

      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requestBody),
      };

      await fetch(URL, requestOptions);
      window.location.reload();
    },
    linkCopied() {
      this.snackbarMessage = this.$t('post_detail_page.snackbar.message');
      this.snackbar = true;
    }
  },
  mounted() {
    this.fetchPost().then(async () => {
      await this.fetchComments();
      this.loading = false;
    })
  },
  computed: {
    commentTextAreaRules() {
      return [v => v.length <= 255 || this.$t('post_detail_page.rules.character_limit')];
    },
    id() {
      return this.$route.params.id;
    },
    textFieldBackground() {
      if (this.$vuetify.theme.dark) {
        return '#272727';
      } else {
        return '#f0f2f5';
      }
    },
  }
}
</script>

<style scoped>

</style>