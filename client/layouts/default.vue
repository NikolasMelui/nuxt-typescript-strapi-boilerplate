<template lang="pug">
  main
    Toolbar
    .content
      nuxt
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import Toolbar from "~/components/Toolbar.vue";

@Component({
  components: {
    Toolbar
  }
})
export default class extends Vue {}
</script>

<style lang="sass">
.content
  padding: 30px 10px
</style>
