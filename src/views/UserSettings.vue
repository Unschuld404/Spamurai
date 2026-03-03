<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButton from '@/components/GlowingButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'

const router = useRouter()
const editUserMode = ref(false)
const editPasswordMode = ref(false)
const editEmailMode = ref(false)

function toggleEditUserMode() {
  editUserMode.value = !editUserMode.value
  editPasswordMode.value = false
  editEmailMode.value = false
}

function toggleEditPasswordMode() {
  editPasswordMode.value = !editPasswordMode.value
  editUserMode.value = false
  editEmailMode.value = false
}

function toggleEditEmailMode() {
  editEmailMode.value = !editEmailMode.value
  editPasswordMode.value = false
  editUserMode.value = false
}
</script>

<template>
  <div class="container">
    <h3>Benutzer-Name</h3>
    <div class="column gap">
      <div>deineEmail@unschuld.org</div>
      <GlowingButtonBox
        name="Benutzername ändern"
        @click="toggleEditUserMode"
        v-if="!editUserMode"
      />
      <input type="text" placeholder="neuer Benutzername" v-if="editUserMode" />
      <div class="row" v-if="editUserMode">
        <GlowingBackButton name="abbrechen" @click="toggleEditUserMode" class="btn-small" />
        <GlowingButton name="speichern" @click="toggleEditUserMode" class="btn-small" />
      </div>

      <GlowingButtonBox name="Email ändern" @click="toggleEditEmailMode" v-if="!editEmailMode" />
      <input type="text" placeholder="neue E-Mail" v-if="editEmailMode" />
      <div class="row" v-if="editEmailMode">
        <GlowingBackButton name="abbrechen" @click="toggleEditEmailMode" class="btn-small" />
        <GlowingButton name="speichern" @click="toggleEditEmailMode" class="btn-small" />
      </div>

      <GlowingButtonBox
        name="Benutzername ändern"
        @click="toggleEditPasswordMode"
        v-if="!editPasswordMode"
      />
      <input type="text" placeholder="altes Passwort" v-if="editPasswordMode" />
      <input type="text" placeholder="neues Passwort" v-if="editPasswordMode" />
      <input type="text" placeholder="neues Passwort" v-if="editPasswordMode" />
      <div class="row" v-if="editPasswordMode">
        <GlowingBackButton name="abbrechen" @click="toggleEditPasswordMode" class="btn-small" />
        <GlowingButton name="speichern" @click="toggleEditPasswordMode" class="btn-small" />
      </div>
    </div>
    <GlowingBackButton @click="router.push('/')" name="zurück" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column {
  margin: 0.5rem 0 1rem 0;
}

.row {
  justify-content: space-between;
}

input {
  margin: 0;
}
</style>
