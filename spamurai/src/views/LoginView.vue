<script setup lang="ts">

</script>

<template>
<div class="view">
  <img alt="Samurai-Wächter vor Spam" src="../assets/spamurai-icon.png">
  <form>
    <h1>Login</h1>
    <input class="login-input" type="text" name="user" id="user" placeholder="Benutzer" required/>
    <input class="login-input" type="password" name="password" id="password" placeholder="Passwort" required/>
    <button type="submit"><i class='bx bx-check'></i></button>
  </form>
</div>
</template>

<style scoped>

img {
  margin-top: 5vh;
  max-width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: center;
}

</style>/