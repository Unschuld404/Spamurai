<script setup lang="ts">

</script>

<template>

  <div class="modal-wrapper">
    <div class="modal-container">
      <div class="new">usecase</div>
      <div class="domains">
        <button>@blackserver.de</button>
        <button>@2busy.de</button>
        <button>@lisawichmann.de</button>
        <button>@unschuld.org</button>
      </div>
    </div>
  </div>

</template>

<style scoped>

.modal-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: var(--primary-color);
  z-index: 1000;
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
}

.modal-container {
  width: 80vw;
  background-color: var(--background-color);
  border-radius: 5vh;
  text-align: center;
  padding: 2vh;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

.new {
  color: var(--font-color);
  font-size: 4vh;
  padding-bottom: 1vh;
}

.domains {
  display: flex;
  flex-direction: column;
}

button {
  width: 100%;
}

</style>/