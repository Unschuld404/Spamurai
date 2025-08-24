<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

const router = useRouter()
const searchStore = useSearchStore()

console.log(searchStore.needle)

function goback() {
  router.push('/search')
}
</script>

<template>
  <div class="frame">
    <h1>{{ searchStore.needle }}</h1>
  </div>
  <div class="frame">
    <h1>Deine Domain</h1>
  </div>
  <span class="material-symbols-outlined" @click="goback">u_turn_left</span>
</template>

<style scoped>
span {
  font-weight: bold;
  font-size: 4rem;
  position: absolute;
  bottom: 2rem;
  left: 1rem;
}

.frame {
  background-color: var(--color-accent);
  margin: 2vh 1rem 0 1rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
