<script setup lang="ts">
defineProps({
  email: String,
})
</script>

<template>
  <div class="box row">
    {{ email }}<span class="material-symbols-rounded"> do_not_disturb_on </span>
  </div>
</template>

<style scoped>
.box {
  border: 1px solid var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary-transparent);
  height: 2rem;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 10px;
  box-sizing: border-box;
}

.row {
  justify-content: space-between;
  cursor: default;
}

span {
  font-size: 1rem;
  color: var(--color-primary);
  text-shadow: 0 0 5px var(--color-primary-transparent);
  cursor: pointer;
}
</style>
