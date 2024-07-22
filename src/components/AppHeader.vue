<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel';
import { ref, watch } from 'vue';
import { useFilterType } from '@/composables/useFilterType';
import AppDropDownMenu from "@/components/AppDropDownMenu.vue";

const { filterType, setFilterType } = useFilterType();
const dropDownIsActive = ref<boolean>(false)
const selectedFilter = ref<Object>(filterType.value);
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
  setFilterType(selectedFilter.value);
};

watch(selectedFilter, (newVal) => {
  console.log('asdadsdasd')
  setFilterType(newVal);
});
</script>

<template lang="pug">
.app-header
  h1.header-title TOP TRENDING NOW
  .navigation
    .categories
      .category(@click="selectedId = category.id" v-for="category in categories" :key="category.id" :class="{'category-selected': selectedId === category.id}") {{category.title}}
    .actions
      .more-products MORE PRODUCTS
      .filters(@click="dropDownIsActive =! dropDownIsActive" :class="{'filters-active': dropDownIsActive}")
        .filter FILTER
        AppDropDownMenu(dropdown-title="Filter" :is-active="dropDownIsActive" :options="dropDownFilters" v-model:selected-option="selectedFilter" @change="updateFilter")
</template>

<style lang="sass">
.app-header
  align-items: center
  display: flex
  justify-content: space-between
  margin-bottom: 80px
  @media (max-width: 1274px)
    flex-direction: column
  @media (max-width: 599px)
    gap: 35px
  .header-title
    font-size: 34px
    font-weight: 900
    line-height: 46px
    @media (max-width: 599px)
      font-size: 20px
      line-height: 28px
  .navigation
    display: flex
    justify-content: space-between
    gap: 40px
    @media (max-width: 899px)
      gap: 35px
      flex-direction: column
      .actions
        justify-content: space-between
    @media (max-width: 599px)
      gap: 35px
    .categories
      display: flex
      gap: 10px
    .category
      padding: 10px
      cursor: pointer
      font-weight: 800
      text-transform: uppercase
      font-size: 16px
      line-height: 20px
      transition: background-color .4s, border-bottom .4s
      border: 3px solid transparent
      @media (max-width: 599px)
        font-size: 11px
        line-height: 12px
        padding: 6px
      &-selected
        background-color: $custom-light
        border-bottom: 3px solid $custom-light-gray
    .actions
      align-items: center
      display: flex
      gap: 80px
      .filters
        user-select: none
        display: flex
        align-items: center
        gap: 15px
        .filter
          height: 100%
        &-active
          button
            img
              transform: rotate(180deg)
      .more-products, .filters
        font-size: 16px
        font-weight: 800
        line-height: 20px
        cursor: pointer
        @media (max-width: 599px)
          font-size: 13px
          line-height: 17px
        label
          cursor: pointer
      .more-products
        text-decoration: underline
        color: $custom-dark
</style>