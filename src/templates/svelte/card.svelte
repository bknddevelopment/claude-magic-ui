<script lang="ts">
  export let variant: 'default' | 'elevated' | 'outlined' = 'default'
  export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md'
  export let header: string = ''
  export let footer: string = ''
  export let className: string = ''

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

  $: cardClasses = [
    baseClasses,
    variants[variant],
    className
  ].join(' ')

  $: contentClasses = paddings[padding]

  $: headerClasses = [
    'border-b border-gray-200 pb-4 mb-4',
    paddings[padding]
  ].join(' ')

  $: footerClasses = [
    'border-t border-gray-200 pt-4 mt-4',
    paddings[padding]
  ].join(' ')
</script>

<div class={cardClasses} {...$$restProps}>
  {#if header || $$slots.header}
    <div class={headerClasses}>
      <slot name="header">
        {header}
      </slot>
    </div>
  {/if}
  
  <div class={contentClasses}>
    <slot />
  </div>
  
  {#if footer || $$slots.footer}
    <div class={footerClasses}>
      <slot name="footer">
        {footer}
      </slot>
    </div>
  {/if}
</div>

<style>
  /* Additional custom styles can be added here if needed */
</style>