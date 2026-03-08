<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import GlowingBackButton from '@/components/GlowingBackButton.vue'
import GlowingButtonBox from '@/components/GlowingButtonBox.vue'
import { getUser } from '@/api/user.api.ts'
import type { User } from '@/types/user.type.ts'

const router = useRouter()
const editUserMode = ref(false)
const editPasswordMode = ref(false)
const editEmailMode = ref(false)
const user = ref<User | null>(null)

function toggleEditPasswordMode() {
  editPasswordMode.value = !editPasswordMode.value
}

onMounted(async() => {
  try {
    user.value = await getUser()
  } catch (error) {}
})
</script>

<template>
  <div class="container">
    <div class="column">
      <h3>Benutzer-Name: {{ user?.name }}</h3>
      <div class="column gap">
        <p>{{ user?.email }}</p>
        <input type="text" placeholder="neuer Benutzername" v-if="editUserMode" />

        <GlowingButtonBox
          name="Passwort ändern"
          @click="toggleEditPasswordMode"
          v-if="!editUserMode && !editPasswordMode && !editEmailMode"
        />
        <input type="password" placeholder="altes Passwort" v-if="editPasswordMode" />
        <input type="password" placeholder="neues Passwort" v-if="editPasswordMode" />
        <input type="password" placeholder="neues Passwort" v-if="editPasswordMode" />
        <div class="row" v-if="editPasswordMode">
          <GlowingBackButton icon="close" @click="toggleEditPasswordMode" class="btn-small" />
          <GlowingButtonBox icon="check" @click="toggleEditPasswordMode" class="btn-small" />
        </div>
      </div>
    </div>
    <GlowingBackButton @click="router.push('/')" icon="arrow_left_alt" class="btn-small" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column {
  align-items: center;
}

.row {
  justify-content: space-between;
  width: 100%;
}

input {
  margin: 0;
}
</style>
