<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToSearch() {
  router.push('/search'); // Navigiert zur Route "/search"
}

</script>

<template>
<div class="container">
  <img src="../assets/spamurai_rot.png" alt="Spamurai" />
  <form>
    <h1>Login</h1>
    <div class="login-input">
      <input class="shadow" type="text" autocapitalize="off" name="user" id="user" placeholder="Benutzer" required/>
      <input class="shadow" type="password" name="password" id="password" placeholder="Passwort" required/>
    </div>
    <div class="paper-frame">
      <button @click="navigateToSearch">Los geht's</button>
    </div>
  </form>
</div>
</template>

<style scoped>

</style>/