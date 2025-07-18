<template>
  <div :class="cardClasses" v-bind="$attrs">
    <div 
      v-if="header || $slots.header" 
      :class="headerClasses"
    >
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    
    <div :class="contentClasses">
      <slot>
        {{ children }}
      </slot>
    </div>
    
    <div 
      v-if="footer || $slots.footer" 
      :class="footerClasses"
    >
      <slot name="footer">
        {{ footer }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  header?: string
  footer?: string
  children?: string
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  class: ''
})

const baseClasses = 'bg-white rounded-lg transition-all duration-200'

const variants = {
  default: 'border border-gray-200 shadow-sm hover:shadow-md',
  elevated: 'shadow-lg hover:shadow-xl border-0',
  outlined: 'border-2 border-gray-300 shadow-none hover:border-gray-400'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const cardClasses = computed(() => {
  return [
    baseClasses,
    variants[props.variant],
    props.class
  ].join(' ')
})

const contentClasses = computed(() => {
  return paddings[props.padding]
})

const headerClasses = computed(() => {
  return [
    'border-b border-gray-200 pb-4 mb-4',
    paddings[props.padding]
  ].join(' ')
})

const footerClasses = computed(() => {
  return [
    'border-t border-gray-200 pt-4 mt-4',
    paddings[props.padding]
  ].join(' ')
})
</script>