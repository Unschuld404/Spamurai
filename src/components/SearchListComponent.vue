<script setup lang="ts">

import { ref } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

const searchStore = useSearchStore()
const highlightedIndex = ref<number|null>(null)
const results = JSON.parse(localStorage.getItem('searchResults') || '[]')

function highlight(i: number) {
  highlightedIndex.value = i
  setTimeout(() => (highlightedIndex.value = null), 1000)
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
  <div class="search-result">
    <ul>
      <li v-for="(item, i) in searchStore.results" :key="i">
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
</template>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  scrollbar-width: none;
  max-height: 60vh;
  width: 100vw;
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
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  bottom: 8rem;
}

ul::-webkit-scrollbar { /* Chrome/Safari */
  display: none;
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

</style>
