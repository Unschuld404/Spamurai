<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import {useSearchStore} from '@/stores/search.ts'
import { ref } from 'vue'
import Menu from '@/components/Menu.vue'

const menuOpen = ref(false)
const router = useRouter()
const auth = useAuthStore()
const searchStore = useSearchStore()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function logout() {
  closeMenu()
  auth.clear()
  searchStore.clear()
  router.push('/login')
}
</script>

<template>
  <nav v-if="auth.isAuthed">
    <h2>Spamurai</h2>
    <span class="material-symbols-rounded" @click="toggleMenu"> menu </span>
  </nav>
  <div class="backdrop" v-if="menuOpen"></div>
  <div v-if="menuOpen" class="menu">
    <Menu
      name="Konto"
      icon="account_circle"
      @click="
        router.push('/user-settings');
        closeMenu()
      "
    />
    <Menu
      name="Passwörter"
      icon="key"
      @click="
        router.push('/password-settings');
        closeMenu()
      "
    />
    <Menu
      name="Standards"
      icon="blur_linear"
      @click="
        router.push('/default-settings');
        closeMenu()
      "
    />
    <Menu
      name="Invite"
      icon="person_add"
      @click="
        router.push('/invite-user');
        closeMenu()
      "
    />
    <Menu name="Abmelden" icon="door_open" @click="logout"/>
  </div>
  <RouterView />
</template>

<style scoped>
span {
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: 0 0 2px var(--color-primary-transparent);
}
</style>
