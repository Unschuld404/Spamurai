<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'
import RadioButtonComponent from '@/components/RadioButtonComponent.vue'

const router = useRouter()
const searchStore = useSearchStore()
const alias = ref(searchStore.needle)
const domain = ref("@unschuld.org")
const url = 'https://api.blackserver.de/spamurai/add/'

function cancel() {
  router.push('/search')
}

async function addName() {
  const name = alias.value + domain.value
  const addNameUrl = url + encodeURIComponent(name)
  try {
    const res = await fetch(addNameUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer `+localStorage.getItem('token'),
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json()
    console.log(data)
  }
  catch (err) {
    console.error("Search-Fehler:", err);
  }
}

</script>

<template>
  <h1>Neue E-Mail:</h1>
  <h2>{{ alias }}{{ domain }}</h2>
  <div class="choose-domain">
    <div class="domain">
      <input type="radio" id="unschuld" value="@unschuld.org" name="domain" v-model="domain" />
      <label for="unschuld">@unschuld.org</label>
    </div>
    <div class="domain">
      <input type="radio" id="blackserver" value="@blackserver.de" name="domain" v-model="domain" />
      <label for="blackserver">@blackserver.de</label>
    </div>
    <div class="domain">
      <input type="radio" id="test" value="@test.com" name="domain" v-model="domain"/>
      <label for="test">@test.org</label>
    </div>
  </div>
  <RadioButtonComponent />
  <input type="text" v-model="alias" />
  <footer>
    <span class="material-symbols-outlined" @click="cancel">u_turn_left</span>
    <span class="material-symbols-outlined" @click="addName">check</span>
  </footer>
</template>

<style scoped>

.choose-domain {
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  margin-bottom: 2rem;
}

.domain {
  border: 1px solid green;
}

input[type=text] {
  position: absolute;
  left: 0;
  bottom: 8rem;
  width: 100%;
  text-align: center;
}

span {
  font-weight: bold;
  font-size: 4rem;
}

footer {
  position: absolute;
  bottom: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
}

</style>
