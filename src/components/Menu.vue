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
    </div>
  </div>
</template>

<style scoped>
.option {
  height: 4rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-primary);
  border-top: 1px solid var(--color-primary);
  background-color: var(--color-background-input);
}

.block {
  width: 11rem;
  justify-content: start;
  align-items: center;
}

span {
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: 0 0 3px var(--color-primary-transparent);
  padding-right: 1rem;
}

p {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: 0 0 5px var(--color-primary);
  padding: 0;
}
</style>
