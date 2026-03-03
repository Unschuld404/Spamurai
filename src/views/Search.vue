<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import GlowingButton from '@/components/GlowingButton.vue'
import Item from '@/components/Item.vue'

const needle = ref('')
const results = ref<any[]>([])
const auth = useAuthStore()
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const router = useRouter()

// Suchfunktion über API
async function search() {
  error.value = null
  results.value = []
  loading.value = true

  try {
    const res = await fetch(
      `https://api.blackserver.de/spamurai/search/${encodeURIComponent(needle.value)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      },
    )

    if (!res.ok) {
      error.value = 'Suche fehlgeschlagen'
      loading.value = false
      return
    }

    const data = await res.json()
    console.log(data)
    results.value = data
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

let timeout: ReturnType<typeof setTimeout> | null = null

watch(needle, (newValue) => {
  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    if (newValue.length > 0) {
      search()
    }
  }, 200)
})
</script>

<template>
  <div class="container">
    <p v-if="loading">Lade ...</p>
    <p v-if="error">{{ error }}</p>
    <div class="list">
      <ul>
        <li v-for="item in results" :key="item.id" @click="router.push('/email-details')">
          <Item
            :email="item.email"
            :active="item.active"
            :hasTarget="item.has_target"
            :inSpace="item.in_space"
            :isShared="item.is_shared"
            :isOwner="item.is_owner"
          />
        </li>
      </ul>
    </div>
    <input type="text" placeholder="E-Mail" v-model="needle" />
    <GlowingButton @click="router.push('new-email')" name="Neu" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
