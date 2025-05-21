<template>
  <button 
    class="base-button" 
    :class="[variant, { disabled }]" 
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 14px 40px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transform: translateY(0);
  transition: transform $transition-speed $transition-ease, 
              background-color $transition-speed $transition-ease,
              box-shadow $transition-speed $transition-ease;
  
  &:hover:not(.disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  &.primary {
    background-color: $primary-color;
    color: $light-text;
    
    &:hover:not(.disabled) {
      background-color: rgba($primary-color, 0.8);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: $primary-color;
    border: 2px solid $primary-color;
    
    &:hover:not(.disabled) {
      background-color: rgba($primary-color, 0.1);
    }
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style> 