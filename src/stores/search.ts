import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const needle = ref('')
  const results = ref<string[]>([])

  function setResults(list: string[]) {
    results.value = list
  }

  return { needle, results, setResults }
})

