<template lang="pug">
  .bottombar
    h4 Email - {{ email }}
    h4 Phone - {{ phone }}
    h4 Address - {{ address }}
    h4 Addresslink - {{ addresslink }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class BottomBar extends Vue {
  @Prop(String) email!: string;
  @Prop(String) phone!: string;
  @Prop(String) address!: string;
  @Prop(String) addresslink!: string;
}
</script>

<style lang="sass">
.bottombar
  margin: 10px
</style>
