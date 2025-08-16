<script setup lang="ts">

function logout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('token')
  location.href = '/login'
}

function tokenInfo() {
  console.log(localStorage.getItem('token'))
}

const url = 'https://api.curatest.de/webapi/auth/check'

async function check() {
  console.log("check")

  try {
    const res = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `+localStorage.getItem('token'),
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(data);
  }
  catch (err) {
    console.error('Check-Fehler:', err);
  }
}

</script>

<template>
  <main>
    <h1>Verwaltung</h1>
    <button @click="logout">Logout</button>
    <button @click="tokenInfo">Token?</button>
    <button @click="check">Check!</button>
  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 10px;
}

</style>
