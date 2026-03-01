<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="row">
    <div class="container">
      <form action="">
        <h1>Benutzer einladen</h1>
        <input type="email" placeholder="E-Mail" />
        <input type="text" placeholder="Benutzername" />
        <input type="text" placeholder="Präfix" />
        <div class="row gap">
          <button @click="router.push('/')" class="cancel-btn">zurück</button>
          <button type="submit">einladen</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

button {
  width: 140px;
}
</style>
