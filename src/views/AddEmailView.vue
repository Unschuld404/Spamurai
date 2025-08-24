<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

const router = useRouter()
const searchStore = useSearchStore()
const alias = ref(searchStore.needle)
const domain = "@test.de"
const url = 'https://api.blackserver.de/spamurai/add/'

console.log(searchStore.needle)

function cancel() {
  router.push('/search')
}

async function addName() {
  const name = alias.value + domain
  const addNameUrl = url + encodeURIComponent(name)
  try {
    const res = await fetch(addNameUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer `+localStorage.getItem('token'),
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json()
    console.log(data)
  }
  catch (err) {
    console.error("Search-Fehler:", err);
  }
}

</script>

<template>
  <h1>Neue E-Mail:</h1>
  <h2>{{ alias }}{{ domain }}</h2>
  <input type="text" v-model="alias" />
  <footer>
    <span class="material-symbols-outlined" @click="cancel">u_turn_left</span>
    <span class="material-symbols-outlined" @click="addName">check</span>
  </footer>
</template>

<style scoped>

input {
  position: absolute;
  left: 0;
  bottom: 8rem;
  width: 100%;
  text-align: center;
}

span {
  font-weight: bold;
  font-size: 4rem;
}

footer {
  position: absolute;
  bottom: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
}

</style>
