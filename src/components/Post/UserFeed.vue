<template>
  <div>
    <div v-for="(post, idx) in feed" :key="idx">
      <PostCard :post="post" class="my-2" @shareLinkCopied="() => $emit('shareLinkCopied')"/>
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