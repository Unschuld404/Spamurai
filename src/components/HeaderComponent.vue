<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const url = 'https://api.blackserver.de/service/analyze/auth'

function tokenInfo() {
  console.log('Dein Token lautet: ' + localStorage.getItem('token'))
}

function logout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('token')
  router.push("/login")
}

async function check() {
  console.log('check')

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + localStorage.getItem('token'),
      },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    localStorage.setItem('check', data)
    console.log(data)
    console.log('Du bist noch angemeldet.')
  } catch (err) {
    console.error('Check-Fehler:', err)
    console.log('Du bist nicht mehr angemeldet.')
  }
}

</script>

<template>
  <header>
    <span class="material-symbols-outlined" @click="check">menu</span>
    <span class="material-symbols-outlined" @click="tokenInfo">vpn_key</span>
    <span class="material-symbols-outlined" @click="logout">logout</span>
  </header>
</template>

<style scoped>

header {
  height: 8vh;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  padding: 2vw 5vw 0 5vw;
  align-items: center;
  justify-content: space-between;
}

</style>
