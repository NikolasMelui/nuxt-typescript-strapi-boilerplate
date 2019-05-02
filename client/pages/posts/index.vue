<template lang="pug">
  .posts-container
    h1 {{ postsPage.title_en }}
    h3 Total posts - {{ postsTotalCount }}
    .posts
      ItemPost.post(v-for="post in posts" :key="post.id" :post="post")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Action, Getter, namespace } from "vuex-class";
import { RootState, PostsState, Post, Page, PagesState } from "~/types";

// Import components
import ItemPost from "~/components/ItemPost.vue";

const pagesModule = namespace("pages");
const postsModule = namespace("posts");

@Component({
  components: {
    ItemPost
  }
})
export default class extends Vue {
  @postsModule.Getter("getPosts") posts: Array<Post>;
  @postsModule.Getter("getPostsTotalCount") postsTotalCount: number;
  @pagesModule.Getter("getPostsPage") postsPage: Page;
  @pagesModule.Getter("getPostsSeotitle") seoTitle: string;
  @pagesModule.Getter("getPostsSeoDescription") seoDescription: string;
  @pagesModule.Getter("getPostsSeoKeywords") seoKeywords: string;

  async asyncData({ store, params, req }) {
    await store.dispatch("pages/fetchPage", "Posts");
    await store.dispatch("posts/fetchPosts");
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
.posts
  padding-top: 30px
  display: flex
  justify-content: space-between
</style>
