<script setup lang="ts">

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

const router = useRouter()
const searchStore = useSearchStore()
const timer = ref<number | null>(null)
const url = 'https://api.blackserver.de/spamurai/search/'

watch(() => searchStore.needle, () => {
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(search, 500)
})

async function search() {
  const searchUrl = url + encodeURIComponent(searchStore.needle)
  try {
    const res = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer `+localStorage.getItem('token'),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json()
  searchStore.setResults(data)
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
    <input type="search" placeholder="Suche" v-model="searchStore.needle" />
    <span class="material-symbols-outlined" @click="addNew">add</span>
  </div>
</template>

<style scoped>

span {
  margin-top: 2rem;
  align-content: center;
  font-weight: bold;
  font-size: 4rem;
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
