<script setup lang="ts">

const props = defineProps({
  name: String,
  type: String
})

</script>

<template>
  <button class="btn">{{ name }}</button>
</template>

<style scoped>

.btn {
  background-color: var(--color-secondary);
  box-shadow: 0 0 10px 2px var(--color-secondary-transparent);
  color: var(--color-background);
}

</style>
