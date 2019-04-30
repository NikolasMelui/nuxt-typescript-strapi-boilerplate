<template lang="pug">
  section
    h1 Hello
    div
      ItemPost(v-for="post in posts" :key="post.id" :post="post")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { State, Action, Getter, Mutation, namespace } from "vuex-class";
import {
  RootState,
  PagesState,
  Page,
  PostsState,
  Post,
  SeoState
} from "~/types";

import ItemPost from "~/components/ItemPost.vue";

import strapiRequestService from "~/services/strapiRequestService";

const pagesModule = namespace("pages");
const postsModule = namespace("posts");

@Component({
  components: {
    ItemPost
  }
})
export default class extends Vue {
  @pagesModule.Getter("getMainPage") mainPage: Page;
  @pagesModule.Getter("getMainPageSeotitle") seoTitle: string;
  @pagesModule.Getter("getMainPageSeoDescription") seoDescription: string;
  @pagesModule.Getter("getMainPageSeoKeywords") seoKeywords: string;

  public async asyncData({ store, params, req }) {
    await store.dispatch("pages/fetchPage", "Main");
    await store.dispatch("posts/fetchPosts");
    const posts: Array<Post> = store.getters["posts/getPosts"];

    return {
      posts
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

<style lang="sass">
</style>
