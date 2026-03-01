<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

async function onSubmit() {
  error.value = null

  const basic = btoa(`${username.value}:${password.value}`)

  const res = await fetch('https://api.blackserver.de/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basic}`,
    },
  })

  if (!res.ok) {
    error.value = 'Login fehlgeschlagen.'
    return
  }

  const token = (await res.text()).trim()
  if (!token) {
    error.value = 'Kein Token in Antwort gefunden.'
    return
  }

  auth.setToken(token)
  await router.replace(typeof route.query.redirect === 'string' ? route.query.redirect : '/')
}
</script>

<template>
  <div class="row">
    <div class="container">
      <form @submit.prevent="onSubmit">
        <div class="column">
          <h1>Spamurai</h1>
          <input v-model="username" type="text" placeholder="Benutzername" />
          <input v-model="password" type="password" placeholder="Passwort" />
          <button type="submit">Anmelden</button>
          <p v-if="error">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.column {
  align-items: center;
  gap: 10px;
}
</style>
