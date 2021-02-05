<template>
  <div>
    <div v-for="(post, idx) in feed" :key="idx">
      <PostCard
          :post="post"
          class="my-8"
          @shareLinkCopied="() => $emit('shareLinkCopied')"
          @shareDM="() => $emit('shareDM')"
          @postSaved="() => $emit('postSaved')"
          @postReported="() => $emit('postReported')"
          @postDeleted="() => $emit('postDeleted')"
          @userUnfollowed="() => $emit('userUnfollowed')"
      />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/Post/PostCard";

export default {
  name: "UserFeed",
  props: ["feed"],
  components: {PostCard},
}
</script>

<style scoped>

</style>