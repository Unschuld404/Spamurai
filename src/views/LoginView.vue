<script setup lang="ts">

// function login() {
//   localStorage.setItem('auth', '1')
//   location.href = '/admin'
// }

const url = 'https://api.curatest.de/auth/v1/user';

async function login() {

  const username = ('admin');
  const password = ('geheim');
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
    alert("Login Erfolgreich!");
    localStorage.setItem('auth', '1')
    location.href = '/admin'
  } catch (err) {
    console.error('Login-Fehler:', err);
  }
}

</script>
£
<template>
  <main>
    <form @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" placeholder="Benutzername" id="username"/>
      <input type="password" placeholder="Passwort" id="password"/>
      <button type="submit">Anmelden</button>
    </form>
  </main>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 10px;
}

</style>
