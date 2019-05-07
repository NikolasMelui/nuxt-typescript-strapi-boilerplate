<template lang="pug">
  div
    h2 Error layout
    h3 {{error}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import ToolBar from "~/components/ToolBar.vue";

@Component({
  components: {
    ToolBar
  }
})
export default class extends Vue {
  @Prop(Object) error: Error;
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
</style>
