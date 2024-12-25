<script setup lang="ts">
import { ref } from 'vue';
import CreateNewEmailDialog from "@/components/CreateNewEmailDialog.vue";
import EditFowardingDialog from "@/components/EditFowardingDialog.vue";

const showCreateNewDialog = ref(false); // Steuert die Sichtbarkeit des Dialogs
const showEditForwarding = ref(false); // Steuert die Sichtbarkeit des Dialogs

function copyToClipboard(event: MouseEvent) {
  const text = (event.target as HTMLElement).innerText;
  navigator.clipboard.writeText(text);
}

</script>

<template>
  <CreateNewEmailDialog :show="showCreateNewDialog" @close="showCreateNewDialog = false" />
  <EditFowardingDialog :show="showEditForwarding" @close="showEditForwarding = false" />
  <div class="container">
    <div class="row search">
      <div class="paper-frame">
        <button @click="showCreateNewDialog = true">neu</button>
      </div>
      <input class="shadow" type="text" autocapitalize="off" name="alias" id="alias" placeholder="was brauchst du?">
    </div>
    <div class="result">
      <ul>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
        <li class="select">
          <div class="row">
            <div @click="showEditForwarding = true">spamurai@email.de</div>
            <i class='bx bxs-copy'></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.row {
  justify-content: space-between;
  gap: 5dvw;
}

input {
  width: 100%;
}

button {
  width: 100%;
}

.search {
  margin-top: 2vh;
  width: 90dvw;
}

.container {
  height: 91dvh;
}

</style>/