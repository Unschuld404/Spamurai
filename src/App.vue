<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"><i class='bx bx-user-circle'></i></RouterLink>
        <RouterLink to="/search"><i class='bx bx-search-alt'></i></RouterLink>
        <RouterLink to="/edit"><i class='bx bx-edit' ></i></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
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
