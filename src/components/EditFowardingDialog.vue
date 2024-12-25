<script setup lang="ts">

const props = defineProps({
  show: Boolean, // Prop für die Sichtbarkeit
});

const emit = defineEmits(['close']); // Event, um den Dialog zu schließen

</script>

<template>
  <div v-if="show">
    <div class="frost"></div>
    <div class="paper popup">
      <h1>Weiterleitungen</h1>
      <h2>für "spamurai@beispiel.de"</h2>
      <ul>
        <li class="select row">
          <div>postfach@unschuld.org</div>
          <i class='bx bxs-trash' ></i>
        </li>
        <li class="select row">
          <div>dj@blackserver.de</div>
          <i class='bx bxs-trash' ></i>
        </li>
      </ul>
      <div class="row">
        <div class="paper-frame">
          <button class="back" @click="$emit('close')">zurück</button>
        </div>
        <div class="paper-frame">
          <button class="add">neu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.row {
  justify-content: space-between;
  gap: 5dvw;
}

ul {
  margin: 4dvh 0 4dvh 0;
  width: 95%;
}

button {
  height: 100%;
}

</style>/