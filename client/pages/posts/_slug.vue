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
  @postPageModule.Getter("getPostPageSeoTitle") seoTitle: string;
  @postPageModule.Getter("getPostPageSeoDescription") seoDescription: string;
  @postPageModule.Getter("getPostPageSeoKeywords") seoKeywords: string;

  async asyncData({ store, params, req, redirect }) {
    await store.dispatch("postPage/fetchPostPage", params.slug);
    const postPage = store.getters["postPage/getPostPage"];
    if (typeof postPage === "undefined") redirect("/404");
    return {
      postPage
    };
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
