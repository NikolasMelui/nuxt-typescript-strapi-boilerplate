<template lang="pug">
  nuxt-link.post(:to="`/posts/${post.slug}`")
    h3 {{post.title_ru}}
    img(:src="post.previewimage.url" :alt="post.title_ru" :title="post.title_ru")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Post } from "~/types";

@Component
export default class ItemPost extends Vue {
  @Prop(Object) post!: Post;
}
</script>

<style lang="sass">
.post
  h3
    color: wheat
  img
    max-width: 250px;
</style>
