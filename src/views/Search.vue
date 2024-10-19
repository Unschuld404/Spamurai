<script setup lang="ts">

</script>

<template>
  <div class="search">
    <div class="scroll-box">
      <ul>
        <li>eins@email.de</li> <!-- klick und ab in die Zwischenablage -->
        <li>zwei@email.de</li>
        <li>drei@email.de</li>
        <li>vier@email.de</li>
        <li>fuenf@email.de</li>
        <li>sechs@email.de</li>
        <li>sieben@email.de</li>
        <li>eins@email.de</li> <!-- klick und ab in die Zwischenablage -->
        <li>zwei@email.de</li>
        <li>drei@email.de</li>
        <li>vier@email.de</li>
        <li>fuenf@email.de</li>
        <li>sechs@email.de</li>
        <li>sieben@email.de</li>
      </ul>
    </div>
    <div class="search-bar">
      <input type="text" name="alias" id="alias" placeholder=Suche>
      <button>Neu</button>
    </div>
  </div>
</template>

<style scoped>

.search {
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8vh;
}

.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-box {
  border: 1px solid red;
  border-radius: 5px;
  width: 90vw;
  height: 45vh;
  position: relative;
  overflow: scroll;
}

li {
  list-style: none;
  font-size: 3vh;
  text-align: center;
  line-height: 5vh;
  margin-bottom: 1vh;
  border-bottom: 1px solid red;
  margin-left: 0;
  padding-left: 0;
}

li:last-child {
  border-bottom: 0;
}

ul {
  padding: 0;
}

</style>/