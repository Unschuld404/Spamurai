<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import spamuraiLogo from '@/assets/spamurai_logo.png'

const username = ref('')
const password = ref('')

const router = useRouter()

const url = 'https://api.blackserver.de/auth/user'
const hasError = ref(false)
const errorMessage = ref<string>('')

async function login() {
  // Username:Passwort → Base64
  const credentials = btoa(`${username.value}:${password.value}`)

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        // für GET nicht nötig, aber schadet nicht
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.text()
    localStorage.setItem('auth', '1')
    localStorage.setItem('token', data)
    await router.push('/admin')
  } catch (err) {
    hasError.value = true
    setTimeout(() => (hasError.value = false), 500)
    console.error('Login-Fehler:', err)
    errorMessage.value = translateError(err)
  }
}

function translateError(err: unknown): string {
  if (err instanceof Error) {
    if (err.message.startsWith('HTTP 401')) return 'Benutzername oder Passwort falsch.'
    if (err.message.startsWith('HTTP 500')) return 'Serverfehler, bitte später versuchen.'
    return 'Unbekannter Fehler: ' + err.message
  }
  return 'Es ist ein unbekannter Fehler aufgetreten.'
}
</script>

<template>
  <main>
    <h1>Spamurai</h1>
    <img :src="spamuraiLogo" alt="Spamurai" />
    <div class="box">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <form @submit.prevent="login">
      <input type="text" placeholder="Benutzername" id="username" v-model="username" />
      <input type="password" placeholder="Passwort" id="password" v-model="password" />
      <button type="submit" :class="{ error: hasError }">Anmelden</button>
    </form>
  </main>
</template>

<style scoped>
.box {
  height: 3rem;
  padding: 0;
  margin-top: 2vh;
}
p {
  margin: 0;
}

button {
  margin-top: 1rem;
  transition: background-color 0.3s;
}

button.error {
  background-color: var(--color-accent);
  transition: background-color 0.2s;
  color: var(--color-secondary);
}

img {
  max-width: 50vw;
  max-height: 30vh;
}

p {
  color: var(--color-accent);
}
</style>
