<script setup lang="ts">

import { ref, watch } from 'vue'

const needle = ref('')
const timer = ref<number | null>(null)

function whatIsNeedle() {
  console.log(needle.value);
}

watch(needle, () => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(whatIsNeedle, 500) as unknown as number
})

</script>

<template>
  <div class="container">
    <input type="search" placeholder="Suche" id="needle" v-model="needle"/>
    <div class="listing"></div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid green;
  height: 100%;
}

.listing {
  border: 1px solid saddlebrown;
  height: 100%;
}

input {
  border: 1px solid bisque;
  margin-top: 2rem;
  text-align: center;
}

</style>
