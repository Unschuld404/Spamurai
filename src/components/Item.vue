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
  <div class="item inactive" v-if="!active">{{ email }}</div>
  <div class="item target" v-if="hasTarget && !isOwner">
    <span class="material-symbols-rounded"> notifications </span>
    {{ email }}
  </div>
  <div class="item shared" v-if="isShared && active && !hasTarget">{{ email }}</div>
  <div class="item space" v-if="inSpace && !isOwner && active && hasTarget">
    <span class="material-symbols-rounded"> visibility </span>
    {{ email }}
  </div>
  <div class="item space" v-if="inSpace && isOwner && active">
    <span class="material-symbols-rounded"> group </span>
    {{ email }}
  </div>
  <div class="item" v-if="isOwner && active && !inSpace">{{ email }}</div>
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

.inactive {
  text-decoration: line-through;
  color: var(--color-text-transparent);
}

.shared {
  color: var(--color-text-transparent);
}

.space {
  color: var(--color-text);
}
</style>
