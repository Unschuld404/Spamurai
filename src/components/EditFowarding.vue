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
      <h1 class="shadow">Weiterleitungen</h1>
      <h2>für "spamurai@beispiel.de"</h2>
      <ul>
        <li class="select">postfach@unschuld.org</li>
        <li class="select">dj@blackserver.de</li>
      </ul>
      <input class="shadow" type="email" autocapitalize="off" name="forward" id="forward" placeholder="neue Weiterleitung">
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

</style>/