<script setup lang="ts">
import { ref } from 'vue'
import { copyToClipboard } from '@/api/CopyToClipboard.ts'

const props = defineProps<{ password: string }>()

const passwordIsVisible = ref(false)

function togglePassword() {
  passwordIsVisible.value = !passwordIsVisible.value
}

async function copyPassword(password: string) {
  await copyToClipboard(password)
}
</script>

<template>
  <div class="row">
    <div>Passwort:</div>
    <div v-if="!passwordIsVisible">********************</div>
    <div v-if="passwordIsVisible" class="pw">{{ props.password }}</div>
    <div @click="togglePassword">
      <span class="material-symbols-rounded" @click="copyPassword(props.password)"> visibility </span>
    </div>
  </div>
</template>

<style scoped>
.row {
  width: 350px;
}

.pw {
  color: var(--color-secondary);
}
</style>
