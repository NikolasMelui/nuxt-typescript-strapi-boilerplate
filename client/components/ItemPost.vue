<template lang="pug">
  nuxt-link(:to="`/post/${post.slug}`")
    h3 {{post.title_ru}}
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
h3
  margin: 10px;
  color: wheat;
</style>
