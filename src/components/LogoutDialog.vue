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
      <h1 class="shadow">Abmelden</h1>
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
  margin-bottom: 2vh;
  width: 70vw;
  justify-content: space-between;
}

h1 {
  margin: 2vh;
  width: 70vw;
}

ul {
  margin: 4vh 0 4vh 0;
  width: 70vw;
}

input {
  width: 66vw;
  margin-bottom: 4vh;
}

h2 {
  text-align: center;
  width: 50vw;
  padding: 4vh 0 4vh 0;
}

</style>/