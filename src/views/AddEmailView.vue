<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goback() {
  router.push("/admin")
}

</script>

<template>
  <h1>hi</h1>
  <h2 @click="goback">zurück</h2>
</template>

<style scoped>

h2 {
  cursor: pointer;
}

</style>
