<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore} from '@/stores/auth.ts'

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.clear();
  router.push('/login');
}
</script>

<template>
  <nav class="nav-row" style="justify-content: space-between">
    <div>Spamurai</div>
    <div class="nav-row menu" v-if="auth.isAuthed">
      <div class="clickable" @click="router.push('/email-details-provided')">
        <span class="material-symbols-outlined"> notifications </span>
      </div>
      <div class="clickable" @click="router.push('/email-details')">
        <span class="material-symbols-outlined"> article </span>
      </div>
      <div class="clickable" @click="router.push('/new-email')">
        <span class="material-symbols-outlined"> forward_to_inbox </span>
      </div>
      <div class="clickable" @click="router.push('/user-settings')">
        <span class="material-symbols-outlined"> settings </span>
      </div>
      <div class="clickable" @click="router.push('/invite-user')">
        <span class="material-symbols-outlined"> person_add </span>
      </div>
      <div @click="logout" class="clickable">
        <span class="material-symbols-outlined"> logout </span>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

.nav-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
