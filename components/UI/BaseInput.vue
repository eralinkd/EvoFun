<template>
  <div class="input-container">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="base-input"
        :class="{ 'has-error': error }"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" class="input-error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

.input-label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: $light-text;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.base-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid rgba($border-color, 0.3);
  border-radius: 8px;
  background-color: rgba($dark-background, 0.2);
  color: $light-text;
  transition: border-color $transition-speed $transition-ease, 
              box-shadow $transition-speed $transition-ease;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.3);
  }
  
  &::placeholder {
    color: rgba($light-text, 0.5);
  }
  
  &.has-error {
    border-color: #f44336;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.input-error {
  margin-top: 6px;
  font-size: 12px;
  color: #f44336;
}
</style> 