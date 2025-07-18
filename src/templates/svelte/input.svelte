<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let value: string = ''
  export let variant: 'default' | 'filled' | 'outlined' = 'default'
  export let type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text'
  export let placeholder: string = ''
  export let disabled: boolean = false
  export let error: boolean = false
  export let helperText: string = ''
  export let label: string = ''
  export let required: boolean = false
  export let className: string = ''

  const dispatch = createEventDispatcher<{
    input: string
    change: string
  }>()

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

  const baseClasses = 'w-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    default: 'border border-gray-300 bg-white rounded-md focus:border-blue-500',
    filled: 'border-0 bg-gray-100 rounded-md focus:bg-white focus:ring-1 focus:ring-blue-500',
    outlined: 'border-2 border-gray-300 bg-transparent rounded-md focus:border-blue-500'
  }

  $: inputClasses = [
    baseClasses,
    variants[variant],
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
    className
  ].join(' ')

  $: helperTextClasses = [
    'text-xs mt-1',
    error ? 'text-red-500' : 'text-gray-500'
  ].join(' ')

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    value = target.value
    dispatch('input', value)
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    dispatch('change', target.value)
  }
</script>

<div class="w-full">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {#if required}
        <span class="text-red-500 ml-1">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    id={inputId}
    class={inputClasses}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    on:input={handleInput}
    on:change={handleChange}
    {...$$restProps}
  />
  
  {#if helperText}
    <p class={helperTextClasses}>
      {helperText}
    </p>
  {/if}
</div>

<style>
  /* Additional custom styles can be added here if needed */
</style>