<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="row">
    <div class="container">
      <h2>freigegebene@email.de</h2>
      <div class="commentary">
        <p>Das hier ist ein Beispielkommentar.</p>
      </div>
      <div class="row" style="justify-content: space-evenly; width: 100%">
        <div class="column">
          <div class="abo"><span class="material-symbols-outlined"> notifications_off </span></div>
          <button @click="router.push('/')" class="cancel-btn">zurück</button>
        </div>
        <div class="column">
          <div class="abo active">
            <span class="material-symbols-outlined active"> notifications_active </span>
          </div>
          <button>kopieren</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

span {
  cursor: pointer;
  font-size: 50px;
  font-weight: bold;
  color: #9bc264;
}

button {
  width: 130px;
}

.abo {
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 4px solid #9bc264;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 50px;
}

.active {
  color: white;
  background-color: #9bc264;
}

.column {
  align-items: center;
}

</style>
