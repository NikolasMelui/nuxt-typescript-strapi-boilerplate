<template lang="pug">
  div
    h1.main Strapi multikey template
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { State, Action, Getter, Mutation, namespace } from "vuex-class";
import { RootState, Page, Info } from "~/types";

const pagesModule = namespace("pages");

@Component
export default class extends Vue {
  @pagesModule.Getter("getMainPage") mainPage: Page;
  @pagesModule.Getter("getMainPageSeotitle") seoTitle: string;
  @pagesModule.Getter("getMainPageSeoDescription") seoDescription: string;
  @pagesModule.Getter("getMainPageSeoKeywords") seoKeywords: string;

  async asyncData({ store, userAgent }) {
    await store.dispatch("pages/fetchPage", "Main");
    console.log(userAgent);
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
