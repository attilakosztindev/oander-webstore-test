<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel.ts'
import { ref, watch } from 'vue'
import { useFilterType } from '@/composables/useFilterType'
import AppDropDownMenu from "@/components/AppDropDownMenu.vue"

const { filterType, setFilterType } = useFilterType()
const dropDownIsActive = ref<boolean>(false)
const selectedFilter = ref<Object>(filterType.value)
const dropDownFilters = ref<Array>([
  { label: 'NO FILTER', val: 'no-filter' },
  { label: 'NEW', val: 'new' },
  { label: 'DISCOUNTED', val: 'discounted' }
])
const props = defineProps({
  selectedId: {
    type: String,
    required: true
  },
  categories: {
    type: Object,
    required: true
  }
})

const selectedId = useVModel(props, 'selectedId')
const updateFilter = () => {
  setFilterType(selectedFilter.value)
}

watch(selectedFilter, (newVal) => {
  setFilterType(newVal)
})
</script>

<template lang="pug">
.app-header
  h1.app-header__title TOP TRENDING NOW
  nav.app-header__navigation
    ul.app-header__categories
      li.app-header__category(@click="selectedId = category.id" v-for="category in categories" :key="category.id" :class="{'app-header__category--selected': selectedId === category.id}") {{category.title}}
    div.app-header__actions
      span.app-header__more-products MORE PRODUCTS
      div.app-header__filters(@click="dropDownIsActive =! dropDownIsActive" :class="{'app-header__filters--active': dropDownIsActive}")
        span.app-header__filter FILTER
        AppDropDownMenu(
          dropdown-title="Filter"
          :is-active="dropDownIsActive"
          :options="dropDownFilters"
          v-model:selected-option="selectedFilter"
          @change="updateFilter"
        )
</template>

<style lang="sass">
.app-header
  display: flex
  align-items: center
  justify-content: space-between
  margin-bottom: 80px

  @media (max-width: 1300px)
    flex-direction: column

  @media (max-width: 599px)
    margin-bottom: 60px
    gap: 35px

  &__title
    font-size: 34px
    font-weight: 900
    line-height: 46px

    @media (max-width: 950px) and (min-width: 600px)
      margin-bottom: 35px !important

    @media (max-width: 599px)
      font-size: 20px
      line-height: 28px

  &__navigation
    display: flex
    flex: 1
    max-width: 66.66%
    justify-content: space-between

    @media (max-width: 1300px)
      max-width: unset
      gap: 40px

    @media (max-width: 950px)
      gap: 35px
      flex-direction: column

  &__categories
    display: flex
    gap: 10px
    list-style: none
    padding: 0
    margin: 0

    @media (max-width: 599px)
      gap: 3px

  &__category
    padding: 10px
    cursor: pointer
    font-weight: 800
    text-transform: uppercase
    font-size: 16px
    line-height: 20px
    transition: background-color .4s, box-shadow .4s
    box-shadow: inset 0px -3px 0px 0px transparent
    display: flex

    @media (max-width: 599px)
      font-size: 11px
      line-height: 12px
      padding: 6px
      box-shadow: inset 0px -2px 0px 0px transparent
    &--selected
      background-color: $custom-light
      box-shadow: inset 0px -3px 0px 0px $custom-light-gray

      @media (max-width: 599px)
        box-shadow: inset 0px -2px 0px 0px $custom-light-gray

  &__actions
    display: flex
    align-items: center
    gap: 80px

    @media (max-width: 950px)
      justify-content: space-between

  &__more-products,
  &__filters
    font-size: 16px
    font-weight: 800
    line-height: 20px
    cursor: pointer
    &--active .dropdown__button-chevron
      transform: rotate(180deg)

    @media (max-width: 599px)
      font-size: 13px
      line-height: 17px

  &__more-products
    text-decoration: underline
    color: $custom-dark

  &__filters
    display: flex
    align-items: center
    gap: 15px
    user-select: none

    &--active .app-header__filter-button img
      transform: rotate(180deg)

  &__filter
    height: 100%

  .app-header__filter-button
    background: none
    border: none
    cursor: pointer
    display: inline-flex
    align-items: center
    padding: 0 !important
</style>