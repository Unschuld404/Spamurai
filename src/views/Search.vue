<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'
import { useEmailStore } from '@/stores/email.ts'
import { useRouter } from 'vue-router'
import Item from '@/components/Item.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const needle = computed({
  get: () => searchStore.needle,
  set: (v: string) => searchStore.setNeedle(v),
})

const results = ref<any[]>([])
const auth = useAuthStore()
const searchStore = useSearchStore()
const emailStore = useEmailStore()
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const router = useRouter()

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
      searchStore.setNeedle(needle.value)
    }
  }, 200)
})

onMounted(() => {
  if (needle.value.length < 1) return
  search()
})

function newEmail() {
  searchStore.setNeedle(needle.value)
  searchStore.goEdit()
  router.push('new-email')
}

function openEmailDetails(id: number) {
  emailStore.setID(id)
  console.log('Ich merke mir die ID: ' + id)
  router.push(`/email-details/${id}`)
}
</script>

<template>
  <div class="container">
    <div class="row gap">
      <input
        id="email-search"
        v-model="needle"
        type="search"
        name="email_search"
        placeholder="E-Mail"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        data-lpignore="true"
        data-1p-ignore="true"
      />
      <GlowingButtonBox @click="newEmail" name="+" class="btn-small" />
    </div>
    <div class="list">
      <ul>
        <li v-for="item in results" :key="item.id" @click="openEmailDetails(item?.id)">
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
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 1rem;
}

input {
  width: 300px;
}

.btn-small {
  width: 50px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
