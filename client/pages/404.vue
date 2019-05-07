<template lang="pug">
  .404-error
    h1 404
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { State, Action, Getter, Mutation, namespace } from "vuex-class";
import { RootState, Page } from "~/types";

@Component({
  layout: "404"
})
export default class extends Vue {
  head() {
    return {
      title: "404",
      htmlAttrs: {
        lang: "ru"
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content: "The page did not found"
        }
      ]
    };
  }
}
</script>

<style lang="sass">
  .404-error
    margin: 10px
</style>
