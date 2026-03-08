import { defineStore } from 'pinia'

export type SearchMode = 'search' | 'edit'

export const useSearchStore = defineStore('search', {
  state: () => ({
    needle: '' as string,
    mode: 'search' as SearchMode,
  }),

  actions: {
    setNeedle(v: string) {
      this.needle = v
    },
    goSearch() {
      this.mode = 'search'
    },
    goEdit() {
      this.mode = 'edit'
    },
    clear() {
      this.needle = ''
      this.mode = 'search'
    },
  },
})
