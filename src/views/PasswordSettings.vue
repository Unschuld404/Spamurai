<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h3>Passwort-System</h3>
    <GlowingButtonBox icon="arrow_left_alt" class="btn-small" @click="router.push('/')" />
  </div>
</template>

<style scoped></style>
