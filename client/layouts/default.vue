<template lang="pug">
  div
    Toolbar
    .main-container
      nuxt
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

// Import components
import Toolbar from "~/components/Toolbar.vue";

@Component({
  components: {
    Toolbar
  }
})
export default class extends Vue {}
</script>

<style lang="sass">
.main-container
  padding: 30px 10px
</style>
