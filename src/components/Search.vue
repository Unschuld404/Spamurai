<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

const needle = ref('')
const results = ref<any[]>([])
const auth = useAuthStore()
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

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
  if(timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    if (newValue.length > 0) {
      search()
    }
  }, 1000)
})

</script>

<template>
  <div class="row">
    <div class="container">
      <p v-if="loading">Lade ...</p>
      <p v-if="error">{{ error }}</p>
      <div class="list">
        <ul>
          <li v-for="item in results" :key="item.id">
            <div class="item" v-if="item.active && !item.in_space && item.is_owner">
              {{ item.email }}
            </div>
            <div class="item" v-if="!item.active" style="color: #a1a995">
              <s>{{ item.email }}</s>
            </div>
            <div class="item" v-if="item.in_space && !item.is_shared && item.active">
              {{ item.email }}
              <span class="material-symbols-outlined"> groups </span>
            </div>
            <div
              class="item"
              v-if="item.is_shared && !item.is_owner && item.active && !item.has_target"
              style="color: #a1a995"
            >
              {{ item.email }}
              <span class="material-symbols-outlined"> notifications </span>
            </div>
            <div
              class="item"
              v-if="item.is_shared && !item.is_owner && item.active && item.has_target"
            >
              {{ item.email }}
              <span class="material-symbols-outlined"> notifications </span>
            </div>
          </li>
        </ul>
      </div>
      <input type="text" placeholder="E-Mail" v-model="needle" />
      <button>neu</button>
    </div>
  </div>
</template>

<style scoped>
.list {
  border-radius: 10px;
  height: 450px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

list::-webkit-scrollbar {
  display: none;
}

ul {
  padding: 10px;
  margin: 0;
  list-style: none;
}

li {
  font-size: 1rem;
  border-bottom: 1px solid #f3e7d2;
  height: 2.5rem;
  align-content: center;
}

li:last-of-type {
  border-bottom: none;
}

.item {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}
</style>
