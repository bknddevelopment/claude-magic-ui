<template>
  <div class="w-full">
    <label 
      v-if="label" 
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <input
      :id="inputId"
      :class="inputClasses"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      @input="handleInput"
      v-bind="$attrs"
    />
    <p 
      v-if="helperText" 
      :class="helperTextClasses"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface InputProps {
  modelValue?: string
  variant?: 'default' | 'filled' | 'outlined'
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  label?: string
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  variant: 'default',
  type: 'text',
  disabled: false,
  error: false,
  required: false,
  class: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const baseClasses = 'w-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    default: 'border border-gray-300 bg-white rounded-md focus:border-blue-500',
    filled: 'border-0 bg-gray-100 rounded-md focus:bg-white focus:ring-1 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 bg-transparent rounded-md focus:border-blue-500'
  }

  const errorClasses = props.error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  return [
    baseClasses,
    variants[props.variant],
    errorClasses,
    props.class
  ].join(' ')
})

const helperTextClasses = computed(() => {
  return [
    'text-xs mt-1',
    props.error ? 'text-red-500' : 'text-gray-500'
  ].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>