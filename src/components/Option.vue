<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <div class="option-box">
    <p>{{ name }}</p>
  </div>
</template>

<style scoped>
.option-box {
  border: 1px solid var(--color-primary);
  width: 10rem;
  text-align: center;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
}

p {
  color: var(--color-primary);
  margin: 0.5rem;
}

</style>
