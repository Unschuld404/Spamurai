<script setup lang="ts">

</script>

<template>
<div class="view">
  <form>
    <h1>Login</h1>
    <input class="login-input" type="text" name="user" id="user" placeholder="Benutzer" required/>
    <input class="login-input" type="password" name="password" id="password" placeholder="Passwort" required/>
    <button>Anmelden</button>
  </form>
</div>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 2vh;
  width: 100%;
  position: absolute;
  top: 50%;
}

</style>/