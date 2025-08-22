<script setup lang="ts">

import SearchComponent from "@/components/SearchComponent.vue";

function logout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('token')
  location.href = '/login'
}

function tokenInfo() {
  console.log("Dein Token lautet: "+ localStorage.getItem('token'));
}

const url = 'https://api.blackserver.de/service/analyze/auth'

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
    localStorage.setItem('check', data)
    console.log(data);
    console.log("Du bist noch angemeldet.");
  }
  catch (err) {
    console.error('Check-Fehler:', err);
    console.log("Du bist nicht mehr angemeldet.");
  }
}

</script>

<template>
  <header>
    <span class="material-symbols-outlined" @click="check">menu</span>
    <span class="material-symbols-outlined" @click="tokenInfo">vpn_key</span>
    <span class="material-symbols-outlined" @click="logout">logout</span>
  </header>
  <main>
    <SearchComponent/>
  </main>
</template>

<style scoped>

main {
  height: 70vh;
}

</style>
