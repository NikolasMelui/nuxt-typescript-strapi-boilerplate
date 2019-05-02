<template lang="pug">
  section
    h1 Multikey strapi template
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
    await store.dispatch("pages/fetchPage", "main");
    await store.dispatch("posts/fetchPosts");
    // const posts = await strapiRequestService(`query {
    //   posts {
    //       _id
    //       title_ru
    //     }
    // }`);
    // console.log(posts);
    const posts: Array<Post> = store.getters["posts/getPosts"];
    // console.log(posts);

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
h1
  margin: 10px;
</style>
