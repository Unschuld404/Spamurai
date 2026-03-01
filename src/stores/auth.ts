import { defineStore } from 'pinia'

const SESSION_KEY = "auth.token"

export const useAuthStore = defineStore ("auth", {
  state: () => ({
    token: null as string | null,
  }),

  getters: {
    isAuthed: (s) => !!s.token,
  },

  actions: {
    initFromSession() {
      const t = sessionStorage.getItem(SESSION_KEY)
      this.token = t && t.length > 0 ? t : null
    },

    setToken(t: string) {
      this.token = t
      sessionStorage.setItem(SESSION_KEY, t)
    },

    clear() {
      this.token = null
      sessionStorage.removeItem(SESSION_KEY)
    },
  },
})