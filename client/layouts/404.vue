<template lang="pug">
  div
    Toolbar
    h2 404 error layout
    nuxt
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import Toolbar from "~/components/Toolbar.vue";

@Component({
  components: {
    Toolbar
  }
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
</style>
