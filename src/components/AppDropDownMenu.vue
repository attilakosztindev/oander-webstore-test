<script lang="ts" setup>
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
  isActive.value = !isActive.value
}

function selectOption(option) {
  selectedOption.value = option
  isActive.value = false
}
</script>

<template lang="pug">
.dropdown
  button.dropdown__button(@click="toggleDropdown" :aria-expanded="isActive" aria-haspopup="listbox")
    img.dropdown__button-chevron(src="@/assets/icon_chevron_down.svg" alt="Toggle Dropdown")
  transition(name="fade")
    .dropdown__menu(v-if="isActive")
      ul.dropdown__list(role="listbox")
        li.dropdown__item(
          @click.prevent="selectOption(option)"
          v-for="option in options"
          :key="option.label"
          :class="{'dropdown__item--selected': selectedOption.val === option.val}"
          role="option"
          :aria-selected="selectedOption.val === option.val"
        )
          input.dropdown__radio(type="radio" :id="option.val" :name="option.val" :checked="selectedOption.val === option.val")
          label.dropdown__label(:for="option.val") {{ option.label }}
</template>

<style scoped lang="sass">
.dropdown
  position: relative
  max-width: 100%
  text-align: center
  z-index: 100000000

  &__button
    background: none
    border: none
    cursor: pointer
    display: inline-flex
    align-items: center
    padding: 0 !important
    &-chevron
      transition: transform .3s

  &__menu
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
    @extend .border
    @extend .box-shadow

    .dropdown__list
      list-style: none
      padding: 0
      margin: 0

      .dropdown__item
        position: relative
        padding: 10px 20px
        display: flex
        align-items: center
        color: #333
        transition: background-color 200ms linear
        cursor: pointer

        &:hover
          background-color: #f0f0f0

        .dropdown__radio
          position: absolute
          opacity: 0
          cursor: pointer

        .dropdown__label
          display: flex
          align-items: center

          &::before
            content: ''
            display: inline-block
            width: 12px
            height: 12px
            border-radius: 50%
            background-color: #ddd
            margin-right: 10px

    .dropdown__item--selected
      .dropdown__radio, .dropdown__label::before
        background-color: #102770 !important

    @media (max-width: 599px)
      min-width: 156px
      max-width: 208px

      img
        width: 17px
        height: 17px

.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>