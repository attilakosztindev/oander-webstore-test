<script setup>
import { computed } from 'vue'
const props = defineProps({
  icon: { type: String, required: false },
  disabled: { type: Boolean, required: true },
  disabledText: { String, required: true },
  availableText: { String, required: true},
  ariaLabel: {
    type: String,
    required: false,
    default: 'CTA Button'
  }
})

const getIcon = computed(() => {
  if (!props.icon) return ''
  return new URL(`/src/assets/${props.icon}`, import.meta.url).href
})
</script>

<template lang="pug">
div
  button.cta(type="button" :class="{'cta-available': !disabled}" :aria-label="ariaLabel" :disabled="disabled")
    img(v-if="!disabled" :src="getIcon")
    .cta-text {{disabled ? disabledText : availableText}}
</template>

<style lang="sass" scoped>
.cta
  cursor: pointer
  outline: none
  border: 0
  display: flex
  align-items: center
  justify-content: center
  width: 288px
  height: 56px
  gap: 10px
  font-weight: 700
  font-size: 16px
  line-height: 26px
  background-color: transparent
  box-shadow: inset 0 0 0 2px #F0EFED
  color: $custom-dark
  transition: all .4s
  img
    height: 24px
    width: 24px
  @media (max-width: 599px)
    min-width: 156px
    height: 40px
    max-width: 208px
    img
      display: none
  &-available
    align-items: flex-end
    width: 100%
    padding: 14px 25px 14px 25px
    box-shadow: none
    font-weight: 900
    line-height: 20px
    font-size: 18px
    color: white
    background-color: $custom-orange
    @media (max-width: 599px)
      padding: 0 20px 0 20px
      align-items: center
      justify-content: center
      font-size: 16px
      line-height: 20px
    .cta-text
      width: 100%
</style>