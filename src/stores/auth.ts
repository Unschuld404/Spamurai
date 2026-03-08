import { defineStore } from 'pinia'

const SESSION_KEY = "auth.token"
const USER_KEY = "auth.username"

export const useAuthStore = defineStore ("auth", {
  state: () => ({
    token: null as string | null,
    username: null as string | null,
  }),

  getters: {
    isAuthed: (s) => !!s.token,
  },

  actions: {
    initFromSession() {
      const t = sessionStorage.getItem(SESSION_KEY)
      const u = sessionStorage.getItem(USER_KEY)

      this.token = t && t.length > 0 ? t : null
      this.username = u && u.length > 0 ? u : null
    },

    setToken(t: string) {
      this.token = t
      sessionStorage.setItem(SESSION_KEY, t)
    },

    setUsername(u: string) {
      this.username = u
      sessionStorage.setItem(USER_KEY, u)
    },

    clear() {
      this.token = null
      sessionStorage.removeItem(SESSION_KEY)
    },
  },
})
