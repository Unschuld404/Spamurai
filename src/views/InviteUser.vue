<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import Domain from '@/components/Domain.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <form action="" class="gap">
      <h3>Invite</h3>
      <input type="email" placeholder="E-Mail" />
      <input type="text" placeholder="Benutzername" />
      <input type="text" placeholder="Präfix" />
      <div class="row">
        <GlowingBackButton @click="router.push('/')" icon="arrow_back" class="btn-small" />
        <GlowingButtonBox type="submit" icon="outgoing_mail" class="btn-small" />
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

.row {
  width: 100%;
  justify-content: space-between;
}
</style>
