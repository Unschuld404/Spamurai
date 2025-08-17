<script setup lang="ts">

import { ref } from 'vue';
import spamuraiLogo from '@/assets/spamurai_logo.png';

const url = 'https://api.blackserver.de/auth/user';
const hasError = ref(false);
// das ref<string> muss ich noch recherchieren
const errorMessage = ref<string>('')

async function login() {
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
// Username:Passwort → Base64
  const credentials = btoa(`${username}:${password}`);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        // für GET nicht nötig, aber schadet nicht
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.text();
    localStorage.setItem('auth', '1')
    localStorage.setItem('token', data)
    //durch Router austauschen
    location.href = '/admin'
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
    <img :src="spamuraiLogo" alt="Spamurai"/>
    <div class="box">
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <form @submit.prevent="login">
      <input type="text" placeholder="Benutzername" id="username"/>
      <input type="password" placeholder="Passwort" id="password"/>
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
