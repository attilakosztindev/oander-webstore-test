<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency.ts'
import ProductBadge from '@/components/ProductBadge.vue'
import ProductCounter from '@/components/ProductCounter.vue'
import CTA from '@/components/CTA.vue'
import type { Product } from '@/types/Product'

const isActive = ref<boolean>(false)
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

//for some reason, the product.background_color property does not work as it should, so here is a workaround
const getBgColor = (title) => {
  return props.product.badges.find(badge => badge.title === title).background_color;
}
</script>

<template lang="pug">
.product-container(:class="{'product-container-active': isActive, 'product-variants-exist': product.variants.length > 0}" @mouseleave="isActive = false")
  .product-animation-layer(:class="{'product-animation-layer-active': isActive}")
  div.product-card(:class="{'product-card-active': isActive, 'product-variants-exist': product.variants.length > 0}" tabindex="0" :aria-label="product.name" @mouseover="isActive = true")
    img.product-favourite(alt="select" src="@/assets/icon_favourite.svg")
    .product-badges
      ProductBadge(v-if="product.badges" v-for="(badge, index) in product.badges" :bg-color="getBgColor(badge.title)" :key="index" :aria-label="badge.title") {{ badge.title }}
    img.product-image(:src="product.image" :alt="product.name")
    div.product-info
      h2.product-name {{ product.name }}
      p.product-price
        span.special-price(v-if="product.price.special") {{ formatCurrency(product.price.special) }}
        span.normal-price(v-if="product.price.normal" :class="{'normal-price--discounted': product.price.special}") {{ formatCurrency(product.price.normal) }} {{}}
      .product-variants(:class="{'product-variants-active': isActive, 'product-variants-exist': product.variants.length > 0}" role="list")
        span.variant-dot(v-for="(color, index) in product.variants" :key="index" :style="{backgroundColor: color}" role="listitem" aria-label="Color Variant")
    .product-actions(:class="{'product-actions-active': isActive, 'product-actions-unavailable': !product.in_stock}" role="list")
        ProductCounter(v-if="product.in_stock")
        CTA(icon="icon_cart" aria-label="Add to Cart" :disabled="!product.in_stock" disabled-text="out of stock" available-text="ADD TO CART")
</template>

<style lang="sass" scoped>
@mixin vertical-line($nth-child)
  &:not(:last-child):not(:nth-child(#{$nth-child}))::after
    content: ""
    position: absolute
    top: 0
    bottom: 0
    width: 1px
    background-color: $custom-light-gray
    right: -4.6%
.product-container
  opacity: 1
  position: relative
  width: 357px
  height: 500px
  z-index: 10
  transition: z-index .1s ease-in-out
  @media (max-width: 599px)
    width: 280px
    height: 436px
    &.product-variants-exist
      height: 468px
  &-active
    z-index: 100000
    .product-actions
      opacity: 1 !important
      visibility: visible !important
  @media (min-width: 1600px)
    @include vertical-line(4n)
  @media (max-width: 1599px) and (min-width: 1240px)
    @include vertical-line(3n)
  @media (max-width: 1239px) and (min-width: 855px)
    @include vertical-line(2n)
  @media (max-width: 854px)
    &:not(:last-child)::after
      content: ""
      position: absolute
      height: 1px
      width: 100%
      bottom: -25px
      background-color: $custom-light-gray
  .product-animation-layer
    width: 100%
    position: absolute
    transition: all .3s ease-in-out
    padding: 0
    top: 0
    left: 50%
    will-change: transform
    transform: translate(-50%, 0)
    height: 500px
    background-color: white
    border: 1px solid transparent
    @media (max-width: 599px)
      display: none
    &-active
      height: 600px
      width: 387px
      top: -16px
      @media (max-width: 599px)
        top: 0
        width: 357px
        height: 568px
      @extend .border
      @extend .box-shadow
  .product-card
    width: 357px
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    padding: 0
    top: 0
    left: 50%
    will-change: transform
    transform: translate(-50%, 0)
    height: 568px
    background-color: transparent
    @media (max-width: 599px)
      width: 280px
      height: 436px
      &.product-variants-exist
        height: 468px
    .product-badges
      display: flex
      gap: 2px
      position: absolute
      left: 0
      top: 0
    .product-variants
      width: 100%
      justify-content: center
      display: flex
      gap: 20px
      height: 12px
      &:not(.product-variants-exist)
        @media (max-width: 599px)
          display: none
      .variant-dot
        opacity: 0
        transition: visibility .3s ease-in-out, opacity .3s ease-in-out
        border-radius: 50%
        height: 12px
        width: 12px
        visibility: hidden
        @media (max-width: 599px)
          opacity: 1
          visibility: visible
      &-active
        .variant-dot
          opacity: 1
          visibility: visible
    .product-favourite
      cursor: pointer
      transition: all .3s ease-in-out
      position: absolute
      right: 0
      top: 0
    .product-image
      width: 357px
      height: 357px
      cursor: pointer
      @media (max-width: 599px)
        width: 280px
        height: 280px
    .product-info
      display: flex
      flex-direction: column
      align-items: center
      gap: 16px
      padding: 15px 20px 15px 20px
      @media (max-width: 599px)
        gap: 20px
      .product-name
        font-size: 16px
        line-height: 26px
        font-weight: 400
        text-align: center
        @media (max-width: 599px)
          font-size: 14px
          line-height: 20px
      .product-price
        display: flex
        gap: 20px
        font-size: 20px
        font-weight: 900
        line-height: 28px
        @media (max-width: 599px)
          font-size: 18px
          line-height: 26px
        .special-price
          color: $custom-red
        .normal-price
          color: $custom-dark
          text-decoration: unset
          &--discounted
            font-weight: 400
            color: $custom-gray
            text-decoration: line-through
    .product-actions
      opacity: 0
      visibility: hidden
      display: flex
      justify-content: center
      width: 100%
      gap: 20px
      transition: all .1s ease-in-out
      @media (max-width: 599px)
        justify-content: space-between
        visibility: visible
        opacity: 1
      &-unavailable
        @media (max-width: 599px)
          justify-content: center !important
</style>
