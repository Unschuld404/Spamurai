<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <h1>beispiel@email.de</h1>
    <div class="commentary">
      <p>Das hier ist ein Beispielkommentar.</p>
    </div>
    <div class="row gap">
      <GlowingBackButton @click="router.push('/')" name="zurück" class="btn-small" />
      <GlowingButton name="Kopieren" class="btn-small" />
    </div>
  </div>
</template>

<style scoped>

.container {
  margin-top: 4rem;
}

</style>
