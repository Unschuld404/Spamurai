<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingBackButton from '@/components/GlowingBackButton.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>Neue Email</h1>
    <GlowingBackButton @click="router.push('/')"  name="Zurück" />
  </div>
</template>

<style scoped>


</style>
