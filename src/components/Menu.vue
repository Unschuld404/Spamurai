<script setup lang="ts">
defineProps({
  name: String,
  icon: String,
})
</script>

<template>
  <div class="option row">
    <div class="block row">
      <span class="material-symbols-rounded">{{ icon }}</span>
      <p class="text">{{ name }}</p>
      <span class="material-symbols-rounded"> chevron_forward </span>
    </div>
  </div>
</template>

<style scoped>
.option {
  height: 4rem;
  justify-content: center;
  border: 1px solid var(--color-secondary);
  background-color: var(--color-background-secondary);
  margin: 0.5rem;
  cursor: pointer;
}

.block {
  width: 90vw;
  justify-content: space-between;
  align-items: center;
}

span {
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-secondary);
  text-shadow: 0 0 3px var(--color-secondary-transparent);
}

p {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-secondary);
  text-shadow: 0 0 5px var(--color-secondary-transparent);
  padding: 0;
}
</style>
