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

      <div v-for="comment in post.comments" :key="comment.id">
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

<script lang="ts">
import Vue from "vue";
import PostCard from "@/components/Post/PostCard.vue";
import CommentCard from "@/components/Post/CommentCard.vue";
import {Component} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";
// eslint-disable-next-line no-unused-vars
import PostService from "@/api/post";
import CommentService from "@/api/comment";

@Component({
  name: "PostDetailPage",
  components: {PostCard, CommentCard}
})
export default class PostDetailPage extends Vue {
  post: IPost = ({} as IPost)
  loading: boolean = true
  snackbar: boolean = false
  snackbarMessage: string = ""
  commentContent: string = ""

  get commentTextAreaRules() {
    return [(v: string) => v.length <= 255 || this.$t('post_detail_page.rules.character_limit')]
  }

  get id(): string {
    return this.$route.params.id
  }

  get textFieldBackground(): string {
    return (this.$vuetify.theme.dark) ? '#272727' : '#f0f2f5'
  }

  mounted() {
    this.fetchPost().then(async () => {
      this.loading = false
    })
  }

  async fetchPost() {
    try {
      this.post = await PostService.getPostById(this.id);
    } catch (e) {
      console.error(e);
    }
  }

  async createComment() {
    try {
      await CommentService.createComment({
        content: this.commentContent,
        createdBy: this.$store.state.user.userId,
        postId: this.id
      })
      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  linkCopied() {
    this.snackbarMessage = this.$t('post_detail_page.snackbar.message').toString()
    this.snackbar = true
  }
}
</script>

<style scoped>

</style>
