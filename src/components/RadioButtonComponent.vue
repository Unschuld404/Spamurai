<script setup lang="ts">
import { ref } from 'vue'

const picked = ref("")
</script>

<template>

  <div class="radio-group">
    <input type="radio" id="one" value="one" v-model="picked" hidden />
    <label for="one">One</label>

    <input type="radio" id="two" value="two" v-model="picked" hidden />
    <label for="two">Two</label>

    <input type="radio" id="three" value="three" v-model="picked" hidden />
    <label for="three">Three</label>
  </div>

</template>

<style scoped>

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;
  margin-left: auto;
  margin-right: auto;
}

/* Label wie Button */
.radio-group label {
  padding: .5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  background: var(--color-primary);
  transition: all .2s;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Aktiver Zustand */
.radio-group input:checked + label {
  background: var(--color-secondary);
  color: var(--color-accent);
}

</style>
