<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import LogoutDialog from "@/components/LogoutDialog.vue";
import ChangePasswordDialog from "@/components/ChangePasswordDialog.vue";

const showLogoutDialog = ref(false);
const showChangePasswordDialog = ref(false);

</script>

<template>
  <LogoutDialog :show="showLogoutDialog" @close="showLogoutDialog = false" />
  <ChangePasswordDialog :show="showChangePasswordDialog" @close="showChangePasswordDialog = false" />
  <nav class="shadow">
    <i class='bx bxs-cog navi'  @click="showChangePasswordDialog = true"></i>
    <i class='bx bxs-lock navi' @click="showLogoutDialog = true"></i>
  </nav>
  <RouterView />
</template>

<style scoped>

nav {
  display: flex;
  justify-content: space-around;
  height: 8dvh;
  width: 100vw;
  position: absolute;
  bottom: 0;
  z-index: 100;
}

navi {
  color: #67778c;
}

</style>
