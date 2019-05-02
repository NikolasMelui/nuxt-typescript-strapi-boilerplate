<template lang="pug">
  .toolbar
    nuxt-link.link(to="/")
      h3 Main page
    nuxt-link.link(to="/posts/")
      h3 Posts page
</template>

<script lang="ts">
import { Vue } from "nuxt-property-decorator";

export default class Toolbar extends Vue {}
</script>

<style lang="sass">
.toolbar
  display: flex
  flex-direction: row
  border-width: 2px 0
  border-style: solid
  border-color: wheat
  .link
    max-height: 39px
    padding: 10px
    h3
      color: wheat
      font-size: 18px
      line-height: 20px
      transition: .3s
      &:hover
        color: white
        font-size: 21px
</style>
