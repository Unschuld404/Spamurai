<script setup lang="ts">
import { ref } from 'vue';
import CreateNew from "@/components/CreateNew.vue";
import EditFowarding from "@/components/EditFowarding.vue";

const showCreateNewDialog = ref(false); // Steuert die Sichtbarkeit des Dialogs
const showEditForwarding = ref(false); // Steuert die Sichtbarkeit des Dialogs

function copyToClipboard(event: MouseEvent) {
  const text = (event.target as HTMLElement).innerText;
  navigator.clipboard.writeText(text);
}

</script>

<template>
  <CreateNew :show="showCreateNewDialog" @close="showCreateNewDialog = false" />
  <EditFowarding :show="showEditForwarding" @close="showEditForwarding = false" />
  <div class="container">
    <h1 class="shadow">Email Adressen</h1>
    <div class="result">
      <ul>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
        <li class="select" @click="showEditForwarding = true">spamurai@email.de</li>
      </ul>
    </div>
    <div class="row search">
      <div class="paper-frame">
        <button @click="showCreateNewDialog = true">neu</button>
      </div>
      <input class="shadow" type="text" autocapitalize="off" name="alias" id="alias" placeholder="Suche">
    </div>

  </div>
</template>

<style scoped>

.row {
  width: 100%;
  justify-content: space-between;
}

input {
  width: 60vw;
}

.paper {
  width: 20vw;
}

button {
  width: 100%;
}

</style>/