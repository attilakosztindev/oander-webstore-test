<script setup lang="ts">
import {type PropType, ref} from 'vue'
import {formatCurrency} from '@/utils/formatCurrency.ts'
import ProductBadge from '@/components/ProductBadge.vue'
import ProductCounter from '@/components/ProductCounter.vue'
import CTA from '@/components/AppCTA.vue'
import type {Product} from '@/types/Product'

const isActive = ref<boolean>(false)
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

//for some reason, the product.background_color property does not work as it should, so here is a workaround
const getBgColor = (title: string) => {
  return props.product.badges.find(badge => badge.title === title).background_color;
}
</script>

<template lang="pug">
section.product__container(:class="{'product__container--active': isActive, 'product__container--variants': product.variants.length > 0}" @mouseleave="isActive = false")
  .product__animation-layer(:class="{'product__animation-layer--active': isActive}" tabindex="0")
  article.product__card(:class="{'product__card--active': isActive, 'product__card--variants': product.variants.length > 0}" :aria-label="product.name" @mouseover="isActive = true")
    button.product__favourite(aria-label="Favourite")
      img.product__favourite--img(alt="Favorite icon" src="@/assets/icon_favourite.svg")
    .product__badges
      ProductBadge(v-if="product.badges" v-for="(badge, index) in product.badges" :bg-color="getBgColor(badge.title)" :key="index" :aria-label="badge.title") {{ badge.title }}
    img.product__image(:src="product.image" :alt="product.name")
    .product__info
      h2.product__name {{ product.name }}
      p.product__price
        span.product__price--special(v-if="product.price.special") {{ formatCurrency(product.price.special) }}
        span.product__price--normal(v-if="product.price.normal" :class="{'product__price--discounted': product.price.special}") {{ formatCurrency(product.price.normal) }}
      ul.product__variants(:class="{'product__variants--active': isActive, 'product__variants--exist': product.variants.length > 0}" role="list")
        li.product__variant--dot(v-for="(color, index) in product.variants" :key="index" :style="{backgroundColor: color}" role="listitem" aria-label="Color Variant")
    .product__actions(:class="{'product__actions--active': isActive, 'product__actions--unavailable': !product.in_stock}" role="list")
      ProductCounter(v-if="product.in_stock")
      CTA(icon="icon_cart.svg" aria-label="Add to Cart" :disabled="!product.in_stock" disabled-text="out of stock" available-text="ADD TO CART")
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

.product__container
  opacity: 1
  position: relative
  width: 357px
  height: 500px
  z-index: 10
  transition: z-index .1s ease-in-out

  @media (max-width: 599px)
    width: 280px
    height: 436px
    &.product__container--variants
      height: 468px

  &--active
    z-index: 100000

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
      bottom: -15px
      z-index: -1
      background-color: $custom-light-gray

  @media (max-width: 599px)
    &:not(:last-child)::after
      bottom: -25px

  .product__animation-layer
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

    &--active
      height: 600px
      width: 387px
      top: -16px

      @media (max-width: 599px)
        top: 0
        width: 357px
        height: 568px

      @extend .border
      @extend .box-shadow

  .product__card
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

      &.product__variants
        height: 468px

    .product__badges
      display: flex
      gap: 2px
      position: absolute
      left: 0
      top: 0

    .product__variants
      width: 100%
      justify-content: center
      display: flex
      gap: 20px
      height: 12px

      &:not(.product__variants--exist)
        @media (max-width: 599px)
          display: none

      .product__variant--dot
        opacity: 0
        transition: visibility .3s ease-in-out, opacity .3s ease-in-out
        border-radius: 50%
        height: 12px
        width: 12px
        visibility: hidden

        &:nth-child(2)
          //this is for dummy selection
          box-shadow: 0 0 0 3px $custom-light-gray

        @media (max-width: 599px)
          opacity: 1
          visibility: visible

      &--active
        .product__variant--dot
          opacity: 1
          visibility: visible

    .product__favourite
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      transition: all .3s ease-in-out
      position: absolute
      right: 0
      top: 0
      padding: 0
    .product__image
      width: 357px
      height: 357px
      cursor: pointer

      @media (max-width: 599px)
        width: 280px
        height: 280px

    .product__info
      display: flex
      flex-direction: column
      align-items: center
      gap: 15px
      padding: 15px 20px 18px 20px

      @media (max-width: 599px)
        padding: 15px 20px 15px 20px
        gap: 20px

      .product__name
        font-size: 16px
        line-height: 26px
        font-weight: 400
        text-align: center

        @media (max-width: 599px)
          font-size: 14px
          line-height: 20px

      .product__price
        display: flex
        gap: 20px
        font-size: 20px
        font-weight: 900
        line-height: 28px

        @media (max-width: 599px)
          font-size: 18px
          line-height: 26px

        .product__price--special
          color: $custom-red

        .product__price--normal
          color: $custom-dark
          text-decoration: unset

          &--discounted
            font-weight: 400
            color: $custom-gray
            text-decoration: line-through

    .product__actions
      opacity: 0
      visibility: hidden
      display: flex
      justify-content: center
      width: 100%
      gap: 20px
      transition: all .15s ease-in-out

      @media (max-width: 599px)
        justify-content: space-between
        visibility: visible
        opacity: 1

      &--active
        opacity: 1 !important
        visibility: visible !important

      &--unavailable
        @media (max-width: 599px)
          justify-content: center !important
</style>
