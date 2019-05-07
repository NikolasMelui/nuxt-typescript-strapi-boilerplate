<template lang="pug">
  main
    Toolbar
    .content
      nuxt
    BottomBar(:email="info.email" :phone="info.phone" :address="info.address" :addresslink="info.addresslink")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import ToolBar from "~/components/ToolBar.vue";
import BottomBar from "~/components/BottomBar.vue";

import { Info } from "~/types";

@Component({
  components: {
    ToolBar,
    BottomBar
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
