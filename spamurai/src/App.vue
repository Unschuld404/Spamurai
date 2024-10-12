<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/search">Suche</RouterLink>
        <RouterLink to="/edit">Bearbeiten</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  background-color: var(--accent-color);
  width: 100vw;
  height: 5vh;
  line-height: 5vh;
}

.wrapper {
  width: 50vh;
}

nav {
  display: flex;
  justify-content: space-around;
}
</style>
