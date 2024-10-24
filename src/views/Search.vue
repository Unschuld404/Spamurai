<script setup lang="ts">

import CreateNew from "@/components/CreateNew.vue";
import EditExisting from "@/components/EditExisting.vue";
</script>

<template>

  <div class="search">
    <div class="scroll-box">
      <ul>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">spamurai@email.de</div>
        </li>
        <li>
          <div class="copy"><i class='bx bxs-copy'></i></div>
          <div class="mail">i-love-you@forever</div>
        </li>
      </ul>
    </div>
    <div class="search-bar">
      <input type="text" name="alias" id="alias" placeholder=Suche>
      <button>+</button>
    </div>
  </div>
</template>

<style scoped>

.search {
  display: flex;
  height: 90vh;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

button {
  width: 6vh;
  height: 6vh;
  display: flex;
  justify-content: center;
  line-height: 5.7vh;
}

.scroll-box {
  display: flex;
  flex-direction: column-reverse;
  border-radius: 5px;
  width: 90vw;
  height: 70vh;
  overflow: scroll;
}

</style>/