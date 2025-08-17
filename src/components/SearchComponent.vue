<script setup lang="ts">

import { ref, watch } from 'vue'

const needle = ref('')
const timer = ref<number | null>(null)
const url = 'https://api.blackserver.de/spamurai/search/'
const results = ref<string[]>([])

watch(needle, () => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(search, 500) as unknown as number
})

async function search() {
  const searchUrl = url + needle.value

  try {
    const res = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      ContentType: "application/json; charset=UTF-8",
      Authorization: `Bearer `+localStorage.getItem('token'),
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  results.value = await res.json()
  console.log("Suche erfolgreich.", results.value)
  }
  catch (err) {
    console.error("Search-Fehler:", err);
  }
}

</script>

<template>
  <div class="container">
    <input type="search" placeholder="Suche" id="needle" v-model="needle" />
    <div class="listing">
      <ul>
        <li v-for="(item, i) in results" :key="i">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  border-bottom: 1px solid var(--color-primary);
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
}

li:last-of-type {
  border-bottom: none;
}

.listing {
  overflow-y: scroll;
}

.container {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}

input {
  color: var(--color-secondary);
  background-color: var(--color-primary);
  border: 1px solid var(--color-secondary);
  border-radius: 2rem;
  margin: 2rem 1rem 0 1rem;
  text-align: center;
}

input::placeholder {
  color: var(--color-background);
}

</style>
