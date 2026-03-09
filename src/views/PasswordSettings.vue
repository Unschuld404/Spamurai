<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPreferences } from '@/api/preferences.api.ts'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import type { Preferences } from '@/types/preferences.type.ts'
import { setPreferences } from '@/api/setPreferences.api.ts'

const router = useRouter()
const preferences = ref<Preferences>()

const pwSystem = ref(false)
const usePW = ref(false)
const pwCore = ref('')

onMounted(async () => {
  try {
    preferences.value = await getPreferences()
    pwSystem.value = preferences.value.use_password_system
    usePW.value = preferences.value.use_passwords
    pwCore.value = preferences.value.password_core
    console.log(preferences.value)
  } catch (error) {}
})

function togglePwSystem() {
  pwSystem.value = !pwSystem.value
  if (pwSystem.value) {
    usePW.value = false
  }
  savePreferences()
}

function toggleUsePW() {
  usePW.value = !usePW.value
  if (usePW.value) {
    pwSystem.value = false
  }
  savePreferences()
}

async function savePreferences() {
  try {
    preferences.value = await setPreferences({
      use_password_system: pwSystem.value,
      use_passwords: usePW.value,
      password_core: pwCore.value,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="container gap">
    <h3>Passwort-System</h3>
    <div class="column gap">
      <GlowingBackButton name="Passwort-Speicher" v-if="!usePW" @click="toggleUsePW" />
      <GlowingButtonBox name="Passwort-Speicher" v-if="usePW" @click="toggleUsePW" />
      <GlowingBackButton name="Passwort-Kern" v-if="!pwSystem" @click="togglePwSystem" />
      <GlowingButtonBox name="Passwort-Kern" v-if="pwSystem" @click="togglePwSystem" />
      <input type="text" placeholder="Passwort-Kern" v-model="pwCore" v-if="pwSystem" @change="savePreferences"/>
    </div>
    <GlowingBackButton icon="arrow_left_alt" class="btn-small" @click="router.push('/')" />
  </div>
</template>

<style scoped>
input {
  margin-top: 5rem;
}

.column {
  height: 50vh;
}
</style>
