<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary'
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let disabled: boolean = false
  export let loading: boolean = false
  export let className: string = ''

  const dispatch = createEventDispatcher<{
    click: MouseEvent
  }>()

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-lg'
  }

  $: buttonClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    className
  ].join(' ')

  function handleClick(event: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', event)
    }
  }
</script>

<button
  class={buttonClasses}
  {disabled}
  on:click={handleClick}
  {...$$restProps}
>
  {#if loading}
    <svg
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  {/if}
  <slot />
</button>

<style>
  /* Additional custom styles can be added here if needed */
</style>