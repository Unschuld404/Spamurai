<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'
import Menu from '@/components/Menu.vue'

const menuOpen = ref(false)
const router = useRouter()
const auth = useAuthStore()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function logout() {
  closeMenu()
  auth.clear()
  router.push('/login')
}
</script>

<template>
  <nav v-if="auth.isAuthed">
    <h2>Spamurai</h2>
    <span class="material-symbols-rounded" @click="toggleMenu"> menu </span>
  </nav>
  <div v-if="menuOpen" class="menu">
    <Menu name="Konto" icon="account_circle" @click="router.push('/user-settings'); closeMenu()"/>
    <Menu name="Passwörter" icon="key" @click="router.push('/password-settings'); closeMenu()"/>
    <Menu name="Standards" icon="blur_linear" @click="router.push('/default-settings'); closeMenu()"/>
    <Menu name="Invite" icon="person_add" @click="router.push('/invite-user'); closeMenu()" />
    <Menu name="Abmelden" icon="door_open" @click="logout" />
  </div>
  <RouterView />
</template>

<style scoped>
.menu {
  position: absolute;
  right: 0;
  width: 100vw;
  height: 75vh;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  height: 3rem;
  align-items: center;
  padding: 0 1rem;
}

span {
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-secondary);
  text-shadow: 0 0 3px var(--color-secondary-transparent);
}
</style>
