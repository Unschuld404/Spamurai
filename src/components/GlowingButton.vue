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
  background-color: var(--color-secondary);
  box-shadow: 0 0 5px 1px var(--color-secondary-transparent);
  color: var(--color-background);
  font-weight: bold;
}

span {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
