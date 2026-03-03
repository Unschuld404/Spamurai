<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import Domain from '@/components/Domain.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <form action=""
    class="gap">
      <h3>Invite</h3>
      <input type="email" placeholder="E-Mail" />
      <input type="text" placeholder="Benutzername" />
      <input type="text" placeholder="Präfix" />
      <div class="row gap">
        <GlowingBackButton @click="router.push('/')" name="zurück" class="btn-small" />
        <GlowingButton type="submit" name="einladen" class="btn-small" />
      </div>
    </form>
  </div>
</template>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
