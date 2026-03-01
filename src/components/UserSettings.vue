<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="row">
    <div class="container">
      <h1>Benutzer Einstellungen</h1>
      <button @click="router.push('/')" class="cancel-btn">zurück</button>
    </div>
  </div>
</template>

<style scoped></style>
