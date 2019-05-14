<template lang="pug">
  main
    Toolbar
    .content
      nuxt
    Bottombar(:email="info.email" :phone="info.phone" :address="info.address" :addresslink="info.addresslink")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import Toolbar from "~/components/Toolbar.vue";
import Bottombar from "~/components/Bottombar.vue";

import { Info } from "~/types";

@Component({
  components: {
    Toolbar,
    Bottombar
  }
})
export default class extends Vue {
  info: Info = this.$store.getters.getInfo;
}
</script>

<style lang="sass">
.content
  padding: 30px 10px
</style>
