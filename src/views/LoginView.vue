<script setup lang="ts">

import { ref } from 'vue'

const url = 'https://api.curatest.de/auth/v1/user';

const hasError = ref(false);

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
    console.log('OK:', data);
    localStorage.setItem('auth', '1')
    localStorage.setItem('token', data)
    location.href = '/admin'
  } catch (err) {
    hasError.value = true
    setTimeout(() => (hasError.value = false), 500)
    console.error('Login-Fehler:', err);
  }
}

</script>

<template>
  <main>
    <form @submit.prevent="login">
      <input type="text" placeholder="Benutzername" id="username"/>
      <input type="password" placeholder="Passwort" id="password"/>
      <button type="submit" :class="{ error: hasError }">Anmelden</button>
    </form>
  </main>
</template>

<style scoped>

button {
  margin-top: 2rem;
  transition: background-color 0.3s;
}

button.error {
  background-color: var(--color-accent);
  transition: background-color 0.1s;
  color: var(--color-secondary);
}

</style>
