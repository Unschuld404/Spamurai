<script setup lang="ts">
function login() {
  localStorage.setItem('auth', '1')
  location.href = '/admin'
}
</script>

<template>
  <main>
    <form @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" placeholder="Benutzername" required/>
      <input type="password" placeholder="Passwort" required/>
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
