<script setup lang="ts">
defineProps({
  email: String,
  active: Boolean,
  hasTarget: Boolean,
  inSpace: Boolean,
  isShared: Boolean,
  isOwner: Boolean,
})
</script>

<template>
  <div class="item">{{ email }}</div>
</template>

<style scoped>
span {
  padding-right: 0.5rem;
}

.item {
  height: 3rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  border-bottom: 1px solid var(--color-text-transparent);
  cursor: pointer;
}

</style>
