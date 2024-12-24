<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import LogoutDialog from "@/components/LogoutDialog.vue";

const showLogoutDialog = ref(false);

</script>

<template>
  <LogoutDialog :show="showLogoutDialog" @close="showLogoutDialog = false" />
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login"><i class='bx bx-user-circle'></i></RouterLink>
        <RouterLink to="/search"><i class='bx bx-search-alt'></i></RouterLink>
        <RouterLink to="/edit"><i class='bx bx-edit' ></i></RouterLink>
        <i class='bx bxs-lock' @click="showLogoutDialog = true"></i>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

.bxs-lock {
  margin-top: 2vh;
}

header {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 6vh;
  line-height: 6vh;
}

.wrapper {
  width: 50vh;
}

nav {
  display: flex;
  justify-content: space-around;
}

</style>
