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

<script lang="ts">
import Vue from "vue";
import PostCard from "@/components/Post/PostCard.vue";
import CommentCard from "@/components/Post/CommentCard.vue";
import {Component} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import IPost from "@/api/responses/IPost";
// eslint-disable-next-line no-unused-vars
import IComment from "@/api/responses/IComment";

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
  comments: Array<IComment> = []

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
      await this.fetchComments()
      this.loading = false
    })
  }

  async fetchPost() {
    // const [result, err] = await PostService.getPostById(this.id)
    //
    // if (err === null && result !== null) {
    //   this.post = result
    // }
  }

  async fetchComments() {
    // for (const commentId of this.post.comments) {
    //   const [result, err] = await PostService.getCommentById(commentId)
    //
    //   if (err === null && result !== null) {
    //     this.comments.push(result)
    //   }
    // }
    //
    // this.comments = this.comments.reverse()
  }

  async createComment() {
    //await PostService.createComment(this.id, this.commentContent, this.$store.state.user.username)
    window.location.reload()
  }

  linkCopied() {
    this.snackbarMessage = this.$t('post_detail_page.snackbar.message').toString()
    this.snackbar = true
  }
}
</script>

<style scoped>

</style>