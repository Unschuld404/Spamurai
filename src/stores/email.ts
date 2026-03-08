import {defineStore} from 'pinia';

export const useEmailStore = defineStore('email', {
  state: () => ({
    id: null as number | null,
  }),

  actions: {
    setID(id: number) {
      this.id = id;
    },
    clearID(id: number) {
      this.id = null;
    }
  }
})
