<script setup lang="ts">

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const needle = ref('')
const timer = ref<number | null>(null)
const url = 'https://api.blackserver.de/spamurai/search/'
const results = ref<string[]>([])
const highlightedIndex = ref<number|null>(null)
const router = useRouter()

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

function addNew() {
  router.push("/add-new")
}

</script>

<template>
  <div class="container">
    <div class="search">
      <input type="search" placeholder="Suche" id="needle" v-model="needle" />
      <button @click="addNew">+</button>
    </div>
    <div class="search-result">
      <ul>
        <li v-for="(item, i) in results" :key="i">
          <div class="item">
            {{ item }}
          </div>
          <div class="copy" @click="copyToClipboard(item); highlight(i)">
            <span
              class="material-symbols-outlined"
              :class="{ active: highlightedIndex === i }"
            >
            {{ highlightedIndex === i ? 'check' : 'shadow' }}
          </span>
          </div>
        </li>
      </ul>
    </div>
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
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
}

.material-symbols-outlined {
  background-color: transparent;
  font-size: 2rem;
  transition: color 0.2s;
}

.material-symbols-outlined.active {
  color: #6fd75f;
}

.copy {
  display: flex;
  align-items: center;
}

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
  overflow-y: auto;
  scrollbar-width: none;
  max-height: 70vh;
}

.search-result::-webkit-scrollbar { /* Chrome/Safari */
  display: none;
}

</style>
