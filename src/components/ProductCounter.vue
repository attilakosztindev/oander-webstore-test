<script lang="ts" setup>
import { ref } from 'vue'

const productQty = ref<number>(0)
</script>

<template lang="pug">
.product-counter
  button.product-counter__button.product-counter__button--decrement(@click="productQty > 0 ? productQty-- : void 0" aria-label="Decrease quantity")
    img(alt="Remove Product" src="@/assets/icon_minus.svg")
  span.product-counter__number {{ productQty }}
  button.product-counter__button.product-counter__button--increment(@click="productQty++" aria-label="Increase quantity")
    img(alt="Add Product" src="@/assets/icon_plus.svg")
</template>

<style scoped lang="sass">
.product-counter
  height: 56px
  display: flex
  align-items: center
  justify-content: space-between
  border: 2px solid #F0EFED
  width: 125px

  @media (max-width: 599px)
    width: 104px
    height: 40px

  &__number
    font-size: 18px
    font-weight: 700
    line-height: 26px
    text-align: center
    @media (max-width: 599px)
      font-size: 16px
  &__button
    user-select: none
    display: flex
    height: 100%
    align-items: center
    cursor: pointer
    padding: 0 15px
    background: none
    border: none

    @media (max-width: 599px)
      padding: 0 11px

    img
      height: 10px
      width: 10px
</style>
