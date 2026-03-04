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
  <div class="item noTarget inactive" v-if="isOwner && !active">{{ email }}</div>
  <div class="item noTarget" v-if="isOwner && active && !hasTarget">{{ email }}</div>
  <div class="item" v-if="isOwner && active && hasTarget">{{ email }}</div>
  <div class="item noTarget row" v-if="!isOwner && active && inSpace">
    {{ email }}<span class="material-symbols-rounded"> eye_tracking </span>
  </div>
  <div class="item noTarget" v-if="!isOwner && active && isShared && !hasTarget">
    {{ email }}<span class="material-symbols-rounded"> notifications </span>
  </div>
  <div class="item" v-if="!isOwner && active && isShared && hasTarget">
    {{ email }}<span class="material-symbols-rounded"> notifications </span>
  </div>
</template>

<style scoped>
.item {
  height: 3rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  border: 1px solid var(--color-secondary);
  border-radius: 5px;
  color: var(--color-secondary);
  background-color: var(--color-background-secondary);
  margin: 1rem 0.5rem;
  cursor: pointer;
  justify-content: space-between;
}

.inactive {
  text-decoration: line-through;
}

.noTarget {
  border-color: var(--color-primary-transparent);
  background-color: var(--color-background-primary);
  color: var(--color-primary);
}
</style>
