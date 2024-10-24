<script setup lang="ts">

</script>

<template>

  <div class="modal-wrapper">
    <div class="modal-container">
      <div class="email">eins@email.de</div>

      <ul>
        <li>
          <div class="delete"><i class='bx bxs-trash'></i></div>
          <div class="forward">weiterleitung@domain.de</div>
        </li>
        <li>
          <div class="delete"><i class='bx bxs-trash'></i></div>
          <div class="forward">weiterleitung@domain.de</div>
        </li>
        <li>
          <div class="delete"><i class='bx bxs-trash'></i></div>
          <div class="forward">weiterleitung@domain.de</div>
        </li>
      </ul>

      <input type="text" name="forwarding" id="forwarding" placeholder="Neues Ziel">

      <div class="buttons">
        <button><i class='bx bx-arrow-back'></i></button>
        <button><i class='bx bx-plus' ></i></button>
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

.email {
  color: var(--font-color);
  font-size: 4vh;
  padding-bottom: 1vh;
}

.delete {
  color: black;
}

input {
  margin-top: 4vh;
}

button i {
  color: var(--background-color);
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  width: 15vh;
  text-align: center;
}

</style>/