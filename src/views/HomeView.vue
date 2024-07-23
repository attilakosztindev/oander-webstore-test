<script lang="ts" setup>
import AppPage from '@/components/AppPage.vue'
import AppHeader from '@/components/AppHeader.vue'
import ProductsList from '@/components/ProductsList.vue'
import { useProducts } from '@/composables/useProducts'
import { useFilterType } from '@/composables/useFilterType'
import { onMounted, ref, computed } from 'vue'
import type { Product, Category } from '@/types/Product'
import AppSpinner from "@/components/AppSpinner.vue"

const { fetchProducts, error, loading } = useProducts()
const { filterType } = useFilterType()
const selectedCategoryId = ref<String>('0')
const products = ref<Product[]>([])

//assuming this would come from another endpoint
const categories = ref([
  { id: '0', title: 'All'},
  { id: '1', title: 'Category 1'},
  { id: '2', title: 'Category 2'},
  { id: '3', title: 'Category 3'}
])

onMounted(async () => {
  products.value = await fetchProducts()
  products.value = products.value.map(product => ({
    ...product,
    badges: product.price.special !== null
        //for demonstration purposes only a static badge is hardcoded
        ? [...product.badges, { title: '-25%', background_color: '#EB333C' }]
        : product.badges,
  }))
})

//products can be filtered by multiple criteria
const filteredProducts = computed(() => {
  let filtered = products.value
  if (selectedCategoryId.value !== '0') {
    filtered = filtered.filter(product => product.category.id === selectedCategoryId.value)
  }

  if (filterType.value.val === 'new') {
    filtered = filtered.filter(product => product.badges.some(badge => badge.title === 'New'))
  } else if (filterType.value.val === 'discounted') {
    filtered = filtered.filter(product => product.price.special !== null)
  }
  return filtered
})
</script>

<template lang="pug">
.home-view
  app-header(:categories="categories" v-model:selectedId="selectedCategoryId")
  app-page
    template.home-view__content(#pageContent)
      AppSpinner(v-if="loading")
      ProductsList(v-else :products="filteredProducts")
</template>

<style scoped lang="sass">
.home-view
  padding: 40px 40px 100px 40px

  @media (max-width: 599px)
    padding: 30px 15px 60px 15px

  &__content
    display: flex
    justify-content: center
</style>