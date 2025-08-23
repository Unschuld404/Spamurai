<script setup lang="ts">

import { ref, watch } from 'vue'

const needle = ref('')
const timer = ref<number | null>(null)
const url = 'https://api.blackserver.de/spamurai/search/'
const results = ref<string[]>([])
const highlightedIndex = ref<number|null>(null)

function highlight(i: number) {
  highlightedIndex.value = i
  setTimeout(() => (highlightedIndex.value = null), 1000)
}

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
  console.log("Suche erfolgreich.")
  }
  catch (err) {
    console.error("Search-Fehler:", err);
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    console.log("Kopiert:", text)
  } catch (err) {
    // Fallback für Safari/iOS
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    console.log("Kopiert (Fallback):", text)
  }
}

</script>

<template>
  <div class="container">
    <input type="search" placeholder="Suche" id="needle" v-model="needle" />
    <div class="search-result">
      <ul>
        <li v-for="(item, i) in results" :key="i">
          <div class="item">
            {{ item }}
          </div>
          <i class="bx bxs-copy"
             :class="{ copied: highlightedIndex === i }"
             @click="copyToClipboard(item, i); highlight(i)">
          </i>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}

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
  padding-right: 1rem;
  justify-content: space-between;
}

li:last-of-type {
  border-bottom: none;
}

.search-result {
  overflow-y: scroll;
  scrollbar-width: none;
  height: 70vh;
}

.search-result::-webkit-scrollbar { /* Chrome/Safari */
  display: none;
}

</style>
