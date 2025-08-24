<script setup lang="ts">

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

const needle = ref('')
const timer = ref<number | null>(null)
const url = 'https://api.blackserver.de/spamurai/search/'
const results = ref<string[]>([])
const router = useRouter()
const searchStore = useSearchStore()

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

  const data = await res.json()
  searchStore.setResults(data)
  console.log("Suche erfolgreich.")
  }
  catch (err) {
    console.error("Search-Fehler:", err);
  }
}

function addNew() {
  router.push("/add-new")
}

</script>

<template>
  <div class="search">
    <input type="search" placeholder="Suche" id="needle" v-model="needle" />
    <button @click="addNew">+</button>
  </div>
</template>

<style scoped>

button {
  background: var(--color-accent);
  color: var(--color-secondary);
  font-weight: bold;
  margin-top: 2rem;
  width: 5rem;
  padding: 0;
}

.search {
  position: absolute;
  bottom: 3rem;
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
}

</style>
