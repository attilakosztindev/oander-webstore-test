<script lang="ts" setup>
import { ref } from 'vue'
import { useVModel } from '@/composables/useVModel'

const props = defineProps({
  isActive: {
    type: Boolean,
    required: false
  },
  options: {
    type: Array,
    required: true
  },
  selectedOption: {
    type: Object,
    required: true
  }
})

const selectedOption = useVModel(props, 'selectedOption')
const isActive = useVModel(props, 'isActive')

function toggleDropdown() {
  isActive.value = !props.isActive
}

function selectOption(option) {
  selectedOption.value = option
  isActive.value = false
}
</script>

<template lang="pug">
.sec-center
  button.dropdown-button(@click="toggleDropdown" :aria-expanded="isActive" aria-haspopup="listbox")
    img(src="@/assets/icon_chevron_down.svg" alt="Toggle Dropdown")
  transition(name="fade")
    .section-dropdown(v-if="isActive")
      ul(role="listbox")
        li(@click.prevent="selectOption(option)" v-for="option in options" :key="option.label" :class="{'option-selected': selectedOption.val === option.val}" role="option" :aria-selected="selectedOption.val === option.val")
          input(type="radio" :id="option.val" :name="option.val" :checked="selectedOption.val === option.val")
          label(:for="option.val") {{option.label}}
</template>

<style scoped lang="sass">
.sec-center
  position: relative
  max-width: 100%
  text-align: center
  z-index: 100000000

.dropdown-button
  background: none
  border: none
  cursor: pointer
  display: inline-flex
  align-items: center
  padding: 0 !important
.section-dropdown
  transition: all .3s linear
  transform: translateY(20px)
  opacity: 1
  position: absolute
  padding: 5px
  background-color: #fff
  right: 0
  width: 220px
  border-radius: 4px
  z-index: 2
  will-change: transform
  @extend .box-shadow
  @extend .border
ul
  list-style: none
  padding: 0
  margin: 0

li
  position: relative
  padding: 10px 20px
  display: flex
  align-items: center
  color: #333
  transition: background-color 200ms linear

li:hover
  background-color: #f0f0f0

input[type="radio"]
  position: absolute
  opacity: 0
  cursor: pointer

label
  display: flex
  align-items: center

img
  will-change: transform
  transition: transform .3s ease-in-out
  cursor: pointer
  @media (max-width: 599px)
    width: 17px
    height: 17px

input[type="radio"] + label::before
  content: ''
  display: inline-block
  width: 12px
  height: 12px
  border-radius: 50%
  background-color: #ddd
  margin-right: 10px

.option-selected
  input[type="radio"], label::before
    background-color: #102770 !important

.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>