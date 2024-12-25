<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  show: Boolean, // Prop für die Sichtbarkeit
});

const emit = defineEmits(['close']); // Event, um den Dialog zu schließen

function navigateToLogin() {
  router.push('/login');
  emit('close');
}

</script>

<template>
  <div v-if="show">
    <div class="frost"></div>
    <div class="paper popup">
      <h2>Bist du dir sicher, dass du dich abmelden möchtest?</h2>
      <div class="row">
        <div class="paper-frame">
          <button class="back" @click="$emit('close')">nein</button>
        </div>
        <div class="paper-frame">
          <button class="ok" @click="navigateToLogin">ja</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.row {
  gap: 5dvh;
}

h2 {
  text-align: center;
  padding: 4dvh 0 2dvh 0;
}

button {
  height: 100%;
}

</style>/