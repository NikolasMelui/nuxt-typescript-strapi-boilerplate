<template lang="pug">
  main
    .post-container
      h3.title {{ postPage.title_en }}
      h3.description {{ postPage.content_en }}
      img.img(:src="postPage.image.url" :alt="postPage.title_en" :title="postPage.title_en")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { State, Action, Getter, Mutation, namespace } from "vuex-class";
import { RootState, PostPageState, PostPage, Post, PostsState } from "~/types";
import ItemPost from "~/components/ItemPost.vue";

const postPageModule = namespace("postPage");

@Component({
  components: {
    ItemPost
  }
})
export default class extends Vue {
  @postPageModule.Getter("getPostPage") postPage: PostPage;
  @postPageModule.Getter("getPostPageSeoTitle") seoTitle: string;
  @postPageModule.Getter("getPostPageSeoDescription") seoDescription: string;
  @postPageModule.Getter("getPostPageSeoKeywords") seoKeywords: string;

  async asyncData({ store, params, req }) {
    await store.dispatch("postPage/fetchPostPage", params.slug);
  }

  head() {
    return {
      title: this.seoTitle,
      htmlAttrs: {
        lang: "ru"
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seoDescription
        }
      ]
    };
  }
}
</script>

<style lang="sass" scoped>
</style>
