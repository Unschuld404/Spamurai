<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingBackButton from '@/components/GlowingBackButton.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h3>Standards</h3>
    <GlowingBackButton name="zurück" @click="router.push('/')" />
  </div>
</template>

<style scoped></style>
