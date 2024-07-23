<script lang="ts" setup>
const props = defineProps({
  bgColor: {
    required: true
  },
  ariaLabel: {
    required: true
  }
})
</script>

<template lang="pug">
span.product-badge(:aria-label="ariaLabel" :style="{ backgroundColor: bgColor }")
  slot
</template>

<style lang="sass" scoped>
.product-badge
  font-size: 16px
  height: 30px
  width: 60px
  color: white
  text-transform: uppercase
  display: flex
  justify-content: center
  align-items: center
  font-weight: 800
</style>