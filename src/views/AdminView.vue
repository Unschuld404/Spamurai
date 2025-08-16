<script setup lang="ts">

function logout() {
  localStorage.removeItem('auth')
  location.href = '/login'
}

</script>

<template>
  <main>
    <h1>Verwaltung</h1>
    <button @click="logout">Logout</button>
  </main>
</template>
