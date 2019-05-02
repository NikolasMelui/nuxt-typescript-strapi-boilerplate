<template lang="pug">
  div
    Toolbar
    h3 {{ error }}
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
  @Prop(Object) error!: Error;

  // async asyncData({ store, params, req, error, redirect }) {
  // return redirect("/404");
  // }
}
</script>

<style lang="sass">
</style>
