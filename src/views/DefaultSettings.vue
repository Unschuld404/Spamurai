<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlowingBackButton from '@/components/GlowingBackButton.vue'

const router = useRouter()
</script>

<template>
  <div class="container">
    <div class="column gap">
      <h3>Standards</h3>
      <div class="row">
        <h3>Host:</h3>
        <select name="host" id="host">
          <option value="Unschuld">Unschuld</option>
          <option value="Blackserver">Blackserver</option>
        </select>
      </div>
      <div class="row">
        <h3>Domain:</h3>
        <select name="domain" id="domain">
          <option value="unschuld.org">@unschuld.org</option>
          <option value="lisawichmann.de">@lisawichmann.de</option>
          <option value="blackserver.de">@blackserver.de</option>
        </select>
      </div>
      <div class="row">
        <h3>Prefix:</h3>
        <select name="prefix" id="prefix">
          <option value="">Keins</option>
          <option value="lu">lu</option>
          <option value="dj">dj</option>
        </select>
      </div>
    </div>
    <GlowingBackButton icon="arrow_left_alt" class="btn-small" @click="router.push('/')" />
  </div>
</template>

<style scoped>
.column {
  align-items: center;
}

.row {
  width: 90vw;
  justify-content: space-between;
  align-items: center;
}
</style>
