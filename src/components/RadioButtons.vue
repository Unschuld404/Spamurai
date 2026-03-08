<script setup lang="ts">
type Option = {
  value: string | number
  label: string
}

defineProps<{
  modelValue: string | number | null
  name: string
  options: Option[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
</script>

<template>
  <div class="radio-group">
    <label v-for="option in options" :key="option.value" class="radio-button">
      <input
        class="radio-input"
        type="radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="emit('update:modelValue', option.value)"
      />
      <span class="radio-label">
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 10rem;
}

.radio-button {
  position: relative;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 10rem;
}

.radio-label {
  display: block;
  text-align: center;
  border-radius: 5px;
  border: 1px solid var(--color-primary);
  cursor: pointer;
  transition: 0.5s ease;
  line-height: 2rem;
  height: 2rem;
  width: 10rem;
  z-index: -1;
}

.radio-input:checked + .radio-label {
  background: var(--color-background-secondary);
  color: var(--color-secondary);
  border-color: var(--color-secondary);
  width: 10rem;
}
</style>
