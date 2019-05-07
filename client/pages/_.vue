<template lang="pug">
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "error"
})
export default class extends Vue {
  layout(context) {
    return "error";
  }
  asyncData({ redirect }) {
    redirect("/404");
  }
}
</script>
