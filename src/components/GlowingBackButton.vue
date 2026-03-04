<script setup lang="ts">
const props = defineProps({
  name: String,
  type: String,
  icon: String,
})
</script>

<template>
  <button class="btn">
    {{ name }}<span class="material-symbols-rounded">{{ icon }}</span>
  </button>
</template>

<style scoped>
.btn {
  background-color: rgba(244, 68, 73, 0.1);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 5px var(--color-primary-transparent);
}
</style>
