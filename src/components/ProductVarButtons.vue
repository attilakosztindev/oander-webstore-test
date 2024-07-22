<script setup>
const props = defineProps({
  variants: {
    type: Object,
    required: true
  }
})
</script>

<template lang="pug">
.product-variants(role="list")
  span.variant-dot(v-for="(color, index) in variants" :key="index" :style="{backgroundColor: color}" role="listitem" aria-label="Color Variant")
</template>

<style lang="sass" scoped>
.product-variants
  display: flex
  gap: 5px
  height: 12px
  .variant-dot
    border-radius: 50%
    height: 12px
  width: 12px
</style>