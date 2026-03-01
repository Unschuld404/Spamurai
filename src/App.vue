<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.clear()
  router.push('/login')
}
</script>

<template>
  <nav v-if="auth.isAuthed">
    <h2>Spamurai</h2>
    <div class="row">
      <div class="clickable" @click="router.push('/user-settings')">
        <span class="material-symbols-outlined"> settings </span>
      </div>
      <div class="clickable" @click="router.push('/invite-user')">
        <span class="material-symbols-outlined"> person_add </span>
      </div>
      <div @click="logout" class="clickable">
        <span class="material-symbols-outlined"> logout </span>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  align-items: center;
  padding: 0 1rem;
}

span {
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-secondary);
  text-shadow: 0 0 5px var(--color-secondary-transparent);
}

.row {
  width: 40%;
  justify-content: space-between;
}
</style>
