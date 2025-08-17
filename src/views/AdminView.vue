<script setup lang="ts">

import SearchComponent from "@/components/SearchComponent.vue";

function logout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('token')
  location.href = '/login'
}

function tokenInfo() {
  console.log(localStorage.getItem('token'))
  alert("Dein Token lautet: "+ localStorage.getItem('token'));
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
    localStorage.setItem('check', data)
    console.log(data);
    alert("Du bist noch angemeldet.");
  }
  catch (err) {
    console.error('Check-Fehler:', err);
    alert("Du bist nicht mehr angemeldet.");
  }
}

</script>

<template>
  <header>
    <i class='bx bx-menu' @click="check"></i>
    <i class='bx bxs-key' @click="tokenInfo"></i>
    <i class='bx bxs-door-open' @click="logout"></i>
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
