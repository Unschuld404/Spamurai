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
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
}
</style>
