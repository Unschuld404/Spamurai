<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import GlowingButton from '@/components/GlowingButton.vue'

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

async function onSubmit() {
  error.value = null

  const basic = btoa(`${username.value}:${password.value}`)

  const res = await fetch('https://api.blackserver.de/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basic}`,
    },
  })

  if (!res.ok) {
    error.value = 'Login fehlgeschlagen'
    return
  }

  const token = (await res.text()).trim()
  if (!token) {
    error.value = 'Kein Token in Antwort gefunden'
    return
  }

  auth.setToken(token)
  await router.replace(typeof route.query.redirect === 'string' ? route.query.redirect : '/')
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="column gap center">
        <h1>Spamurai</h1>
        <div class="input-box">
          <span class="material-symbols-rounded"> identity_platform </span>
          <input v-model="username" type="text" placeholder="Benutzername" />
        </div>
        <div class="input-box">
          <span class="material-symbols-rounded"> key </span>
          <input v-model="password" type="password" placeholder="Passwort" />
        </div>
        <GlowingButton type="submit" name="Anmelden" />
        <p v-if="error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  margin-top: 5vh;
}

span {
  color: var(--color-primary);
  text-shadow: 0 0 10px var(--color-primary);
  font-size: 1.5rem;
  padding-left: 0.5rem;
  z-index: 1;
}

input {
  top: 0;
  position: absolute;
}

.input-box {
  position: relative;
  height: 50px;
  width: 300px;
  display: flex;
  align-items: center;
}

.input-box:last-of-type {
  margin-bottom: 30px;
}

</style>
