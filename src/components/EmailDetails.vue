<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="row">
    <div class="container">
      <h2>beispiel@email.de</h2>
      <div class="commentary">
        <p>Das hier ist ein Beispielkommentar.</p>
      </div>
      <div class="row gap">
        <button @click="router.push('/')" class="cancel-btn">zurück</button>
        <button>kopieren</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 130px;
}
</style>
