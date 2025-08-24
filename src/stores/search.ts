import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const results = ref<string[]>([])

  function setResults(newResults: string[]) {
    results.value = newResults
  }

  return { results, setResults }
})
