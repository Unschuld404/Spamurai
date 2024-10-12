<script setup lang="ts">

</script>

<template>
<div class="view">
  <form>
    <input class="login-input" type="text" name="user" id="user" placeholder="Benutzer" required/>
    <input class="login-input" type="password" name="password" id="password" placeholder="Passwort" required/>
    <button type="submit">Anmelden</button>
  </form>
  <img alt="Samurai-Wächter vor Spam" src="../assets/spamurai-icon.png">
</div>
</template>

<style scoped>

img {
  max-width: 40vw;
  height: 40vh;
}

</style>/