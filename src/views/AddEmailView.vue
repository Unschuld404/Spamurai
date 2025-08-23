<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goback() {
  router.push("/search")
}

</script>

<template>
  <div class="frame">
    <h1>Deine neue E-Mail-Adresse</h1>
  </div>
  <div class="frame">
    <h1>Deine Domain</h1>
  </div>
  <h2 @click="goback">zurück</h2>
</template>

<style scoped>

.frame {
  background-color: var(--color-accent);
  margin: 2vh 1rem 0 1rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

h2 {
  cursor: pointer;
}

</style>
