<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  show: Boolean, // Prop für die Sichtbarkeit
});

const emit = defineEmits(['close']); // Event, um den Dialog zu schließen


</script>

<template>
  <div v-if="show">
    <div class="frost"></div>
    <div class="paper popup">
      <h1>Passwort ändern</h1>
      <input type="text" class="shadow" placeholder="altes Passwort">
      <input type="text" class="shadow" placeholder="neues Passwort">
      <input type="text" class="shadow" placeholder="neues Passwort wiederholen">
      <div class="row">
        <div class="paper-frame">
          <button class="back" @click="$emit('close')">zurück</button>
        </div>
        <div class="paper-frame">
          <button class="ok">ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.row {
  gap: 5dvw;
}

button {
  height: 100%;
  text-align: center;
}

input {
  margin-bottom: 2dvh;
}

</style>/